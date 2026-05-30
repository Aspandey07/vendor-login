"use server"

import { prisma } from "@/lib/prisma"
import { startOfMonth, subMonths, endOfMonth, startOfWeek, addDays } from "date-fns"
import { compare, hash } from "bcryptjs"

const DEMO_VENDOR_ID = "60d5f9b5b3c5a5b5c5d5e5f5" 

export async function getDashboardStats() {
  try {
    const totalInquiries = await prisma.inquiry.count()
    
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

    const confirmedInquiries = await prisma.inquiry.findMany({
      where: { status: "Confirmed" },
      select: { customerEmail: true }
    })
    const activeCustomers = new Set(confirmedInquiries.map(i => i.customerEmail)).size

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

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const dataMap: Record<string, number> = {}
    
    for (let i = 5; i >= 0; i--) {
      const d = subMonths(new Date(), i)
      const monthName = months[d.getMonth()]
      dataMap[monthName] = 0
    }

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

export async function deleteUser(id: string) {
  try {
    await prisma.user.delete({
      where: { id }
    })
    return { success: true }
  } catch (error) {
    console.error("Error deleting user:", error)
    return { success: false }
  }
}

export async function updateUserRole(id: string, role: string) {
  try {
    await prisma.user.update({
      where: { id },
      data: { role }
    })
    return { success: true }
  } catch (error) {
    console.error("Error updating user role:", error)
    return { success: false }
  }
}

export async function getVendorProfile(userId: string) {
  try {
    let vendor = await prisma.vendor.findUnique({ where: { userId } })
    if (!vendor) {
      vendor = await prisma.vendor.create({
        data: {
          name: "My Event Business",
          category: "venue",
          location: "New York, NY",
          email: "contact@example.com",
          phone: "+1 212-555-0199",
          userId: userId
        }
      })
    }
    return vendor
  } catch (error) {
    console.error("Error getting vendor profile:", error)
    return null
  }
}

export async function updateVendorProfile(userId: string, data: any) {
  try {
    await prisma.vendor.update({
      where: { userId },
      data: {
        name: data.name,
        category: data.category,
        location: data.location,
        email: data.email,
        phone: data.phone
      }
    })
    return { success: true }
  } catch (error) {
    console.error("Error updating vendor profile:", error)
    return { success: false }
  }
}

export async function updateVendorSettings(userId: string, data: any) {
  try {
    const vendor = await prisma.vendor.findUnique({ where: { userId } })
    const socialLinks = vendor?.socialLinks ? (typeof vendor.socialLinks === 'string' ? JSON.parse(vendor.socialLinks) : vendor.socialLinks) : {}
    
    await prisma.vendor.update({
      where: { userId },
      data: {
        name: data.name,
        socialLinks: {
          ...socialLinks,
          website: data.website,
          notifyNewInquiry: data.notifyNewInquiry,
          notifyBooking: data.notifyBooking
        }
      }
    })
    return { success: true }
  } catch (error) {
    console.error("Error updating vendor settings:", error)
    return { success: false }
  }
}

export async function updateVendorPassword(userId: string, currentPass: string, newPass: string) {
  try {
    
    const user = await prisma.user.findUnique({ where: { id: userId } })
    if (!user) return { success: false, error: "User not found" }
    
    const isMatch = await compare(currentPass, user.password)
    if (!isMatch) return { success: false, error: "Incorrect current password" }
    
    const hashedPassword = await hash(newPass, 10)
    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword }
    })
    return { success: true }
  } catch (error) {
    console.error("Error updating password:", error)
    return { success: false, error: error instanceof Error ? error.message : String(error) }
  }
}

import { sendEmail } from "./email";

export async function requestPasswordReset(email: string) {
  try {
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      // Return success even if not found for security reasons
      return { success: true }
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6 digit OTP
    const expires = new Date(Date.now() + 15 * 60 * 1000) // 15 mins

    // Save token
    await prisma.passwordResetToken.upsert({
      where: { email },
      update: { otp, expires },
      create: { email, otp, expires }
    })

    const emailSent = await sendEmail({
      to: email,
      subject: "Password Reset OTP - VendorBook",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>Password Reset Request</h2>
          <p>We received a request to reset your password. Here is your One-Time Password (OTP):</p>
          <h1 style="letter-spacing: 5px; color: #4F46E5;">${otp}</h1>
          <p>This OTP is valid for 15 minutes. If you did not request this, please ignore this email.</p>
        </div>
      `
    });

    console.log(`\n============================\n`)
    console.log(`[PASSWORD RESET OTP GENERATED]`)
    console.log(`Email to: ${email}`)
    console.log(`OTP: ${otp}`)
    console.log(`Email Sent Status: ${emailSent}`)
    console.log(`\n============================\n`)

    return { success: true }
  } catch (error) {
    console.error("Error requesting password reset:", error)
    return { success: false }
  }
}

export async function verifyOTP(email: string, otp: string) {
  try {
    const resetToken = await prisma.passwordResetToken.findUnique({ where: { email } })
    if (!resetToken || resetToken.otp !== otp || resetToken.expires < new Date()) {
      return { success: false, error: "Invalid or expired OTP" }
    }
    return { success: true }
  } catch (error) {
    console.error("Error verifying OTP:", error)
    return { success: false, error: "Internal server error" }
  }
}

export async function resetPasswordWithOTP(email: string, otp: string, newPass: string) {
  try {
    const resetToken = await prisma.passwordResetToken.findUnique({ where: { email } })
    if (!resetToken || resetToken.otp !== otp || resetToken.expires < new Date()) {
      return { success: false, error: "Invalid or expired OTP" }
    }

    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) return { success: false, error: "User not found" }

    const hashedPassword = await hash(newPass, 10)
    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword }
    })

    // Delete the token
    await prisma.passwordResetToken.delete({ where: { id: resetToken.id } })

    return { success: true }
  } catch (error) {
    console.error("Error resetting password:", error)
    return { success: false, error: "Internal server error" }
  }
}
