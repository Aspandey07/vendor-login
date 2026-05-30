"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { StatusChart } from "@/components/dashboard/status-chart"
import { MonthlyChart } from "@/components/dashboard/monthly-chart"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { AiInsights } from "@/components/dashboard/ai-insights"
import { Inbox, Calendar, Users, DollarSign, Sparkles, ArrowRight } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { motion, Variants } from "framer-motion"

const container: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
}

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
}

interface DashboardStats {
  totalInquiries: number;
  upcomingEvents: number;
  activeCustomers: number;
  projectedRevenue: number;
  hasRealData: boolean;
}

export function DashboardContent({ stats }: { stats: DashboardStats }) {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-8 pb-8">
      {/* Dynamic Featured Banner */}
      <motion.div variants={item} className="relative w-full overflow-hidden rounded-2xl shadow-xl border border-border/40 group">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/event-card.png" 
            alt="Featured Event" 
            fill 
            className="object-cover group-hover:scale-105 transition-transform duration-1000 opacity-90"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent dark:from-background dark:via-background/90" />
          <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-blue-500/20 to-transparent mix-blend-overlay" />
        </div>
        
        <div className="relative z-10 p-6 md:p-10 flex flex-col items-start max-w-2xl">
          <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary backdrop-blur-md mb-4 shadow-sm">
            <Sparkles className="mr-1.5 h-4 w-4" />
            <span>Welcome back, Premium Vendor</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 drop-shadow-sm">
            Ready to make your next event <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">unforgettable?</span>
          </h1>
          <p className="text-muted-foreground text-lg mb-8 max-w-lg">
            You have {stats.upcomingEvents} upcoming bookings this month and your projected revenue is looking fantastic. Keep up the momentum!
          </p>
          <div className="flex gap-4">
            <Link href="/calendar" className={cn(buttonVariants({ variant: "default" }), "rounded-full shadow-lg hover:shadow-primary/25 transition-all")}>
              View Calendar <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link href="/quotes" className={cn(buttonVariants({ variant: "outline" }), "rounded-full backdrop-blur-md bg-background/50")}>
              New Quote
            </Link>
          </div>
        </div>
      </motion.div>

      <motion.div variants={item} className="flex flex-col gap-1 mt-2">
        <h2 className="text-2xl font-bold tracking-tight">At a glance</h2>
        <p className="text-muted-foreground text-sm">
          {stats.hasRealData ? "Live data from your database." : "Here's what's happening with your bookings today (Mock Data)."}
        </p>
      </motion.div>

      <motion.div variants={item} className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-border/50 shadow-sm transition-all hover:shadow-md hover:border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Inquiries</CardTitle>
            <div className="p-2 bg-blue-500/10 rounded-full">
              <Inbox className="h-4 w-4 text-blue-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.totalInquiries}</div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center">
              <span className="text-emerald-500 font-medium mr-1">+12%</span> from last month
            </p>
          </CardContent>
        </Card>
        
        <Card className="border-border/50 shadow-sm transition-all hover:shadow-md hover:border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Upcoming Events</CardTitle>
            <div className="p-2 bg-emerald-500/10 rounded-full">
              <Calendar className="h-4 w-4 text-emerald-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.upcomingEvents}</div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center">
              <span className="text-emerald-500 font-medium mr-1">+4</span> in the next 7 days
            </p>
          </CardContent>
        </Card>

        <Card className="border-border/50 shadow-sm transition-all hover:shadow-md hover:border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Customers</CardTitle>
            <div className="p-2 bg-purple-500/10 rounded-full">
              <Users className="h-4 w-4 text-purple-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.activeCustomers}</div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center">
              <span className="text-emerald-500 font-medium mr-1">+7%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card className="border-border/50 shadow-sm transition-all hover:shadow-md hover:border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Projected Revenue</CardTitle>
            <div className="p-2 bg-amber-500/10 rounded-full">
              <DollarSign className="h-4 w-4 text-amber-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">${stats.projectedRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center">
              <span className="text-emerald-500 font-medium mr-1">+2.5%</span> from last month
            </p>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={item} className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <div className="lg:col-span-4 flex flex-col gap-6">
          <AiInsights />
          <Card className="border-border/50 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle>Inquiry Status Distribution</CardTitle>
              <CardDescription>A breakdown of your current leads by their pipeline status.</CardDescription>
            </CardHeader>
            <CardContent className="pt-4 min-w-0 w-full overflow-hidden">
              <StatusChart />
            </CardContent>
          </Card>
        </div>

        <Card className="lg:col-span-4 border-border/50 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle>Monthly Inquiries</CardTitle>
            <CardDescription>Inquiries received over the last 6 months.</CardDescription>
          </CardHeader>
          <CardContent className="pt-4 min-w-0 w-full overflow-hidden">
            <MonthlyChart />
          </CardContent>
        </Card>
        
        <Card className="lg:col-span-3 border-border/50 shadow-sm flex flex-col">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest inquiries and status updates.</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 min-w-0 w-full overflow-x-auto">
            <RecentActivity />
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
