"use server"

import { prisma } from "@/lib/prisma"
import { startOfMonth, subMonths, endOfMonth, startOfWeek, addDays } from "date-fns"

// Temporary hardcoded vendor ID for demo until Auth is fully wired
const DEMO_VENDOR_ID = "60d5f9b5b3c5a5b5c5d5e5f5" 

export async function getDashboardStats() {
  try {
    // Attempt to get stats from DB
    const totalInquiries = await prisma.inquiry.count()
    
    // Upcoming events in next 7 days
    const now = new Date()
    const nextWeek = addDays(now, 7)
    const upcomingEvents = await prisma.inquiry.count({
      where: {
        eventDate: {
          gte: now,
          lte: nextWeek
        },
        status: "Confirmed"
      }
    })

    // Active customers (unique customers with confirmed inquiries)
    const confirmedInquiries = await prisma.inquiry.findMany({
      where: { status: "Confirmed" },
      select: { customerEmail: true }
    })
    const activeCustomers = new Set(confirmedInquiries.map(i => i.customerEmail)).size

    // Projected Revenue (Sum of budget/amount from Confirmed inquiries and Quotes)
    const confirmedQuotes = await prisma.quote.aggregate({
      _sum: { amount: true }
    })
    
    const projectedRevenue = confirmedQuotes._sum.amount || 0

    return {
      totalInquiries: totalInquiries,
      upcomingEvents: upcomingEvents,
      activeCustomers: activeCustomers,
      projectedRevenue: projectedRevenue,
      hasRealData: true
    }
  } catch (error) {
    console.error("Error fetching dashboard stats:", error)
    throw new Error("Failed to connect to the database. Please check your DATABASE_URL.")
  }
}

export async function getRecentActivity() {
  try {
    const recent = await prisma.inquiry.findMany({
      orderBy: { updatedAt: 'desc' },
      take: 5,
      select: {
        id: true,
        customerName: true,
        customerEmail: true,
        status: true,
        eventType: true,
        updatedAt: true
      }
    })
    return recent
  } catch (error) {
    console.error("Error fetching recent activity:", error)
    return []
  }
}

export async function getStatusChartData() {
  try {
    const statuses = await prisma.inquiry.groupBy({
      by: ['status'],
      _count: {
        id: true,
      },
    })
    
    if (statuses.length === 0) return null

    return statuses.map(s => ({
      name: s.status,
      value: s._count.id
    }))
  } catch (error) {
    console.error("Error fetching status data:", error)
    return null
  }
}

export async function getMonthlyChartData() {
  try {
    // Get inquiries for the last 6 months
    const sixMonthsAgo = startOfMonth(subMonths(new Date(), 5))
    
    const inquiries = await prisma.inquiry.findMany({
      where: {
        createdAt: {
          gte: sixMonthsAgo
        }
      },
      select: {
        createdAt: true
      }
    })

    if (inquiries.length === 0) return null

    // Group by month
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const dataMap: Record<string, number> = {}
    
    // Initialize last 6 months with 0
    for (let i = 5; i >= 0; i--) {
      const d = subMonths(new Date(), i)
      const monthName = months[d.getMonth()]
      dataMap[monthName] = 0
    }

    // Populate actual counts
    inquiries.forEach(inq => {
      const m = months[inq.createdAt.getMonth()]
      if (dataMap[m] !== undefined) {
        dataMap[m]++
      }
    })

    return Object.entries(dataMap).map(([name, total]) => ({ name, total }))
  } catch (error) {
    console.error("Error fetching monthly data:", error)
    return null
  }
}

export async function getAllInquiries() {
  try {
    const inquiries = await prisma.inquiry.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return inquiries
  } catch (error) {
    console.error("Error fetching all inquiries:", error)
    return []
  }
}

export async function updateInquiryStatus(id: string, status: string) {
  try {
    await prisma.inquiry.update({
      where: { id },
      data: { status }
    })
    return { success: true }
  } catch (error) {
    console.error("Error updating inquiry status:", error)
    return { success: false }
  }
}
