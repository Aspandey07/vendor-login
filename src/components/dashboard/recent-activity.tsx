"use client"

import { useEffect, useState } from "react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { getRecentActivity } from "@/lib/actions"
import { format } from "date-fns"

const getStatusColor = (status: string) => {
  switch (status) {
    case "New": return "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20"
    case "Contacted": return "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20"
    case "Confirmed": return "bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20"
    case "Rejected": return "bg-red-500/10 text-red-500 hover:bg-red-500/20"
    default: return "bg-gray-500/10 text-gray-500"
  }
}

export function RecentActivity() {
  const [activities, setActivities] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      const data = await getRecentActivity()
      setActivities(data)
      setLoading(false)
    }
    loadData()
  }, [])

  if (loading) {
    return <div className="text-sm text-muted-foreground p-4">Loading recent activity...</div>
  }

  if (activities.length === 0) {
    return (
      <div className="text-sm text-muted-foreground p-4 text-center">
        No recent activity found.
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {activities.map((inquiry) => (
        <div key={inquiry.id} className="flex items-center gap-4 transition-all hover:bg-muted/50 p-2 -mx-2 rounded-lg cursor-pointer">
          <Avatar className="h-10 w-10 border border-border">
            <AvatarFallback className="bg-primary/5 text-primary text-xs">
              {inquiry.customerName?.split(' ').map((n: string) => n[0]).join('') || '?'}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col flex-1 gap-1">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold leading-none">{inquiry.customerName}</p>
              <span className="text-xs text-muted-foreground font-medium">
                {format(new Date(inquiry.updatedAt), "MMM d, h:mm a")}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground truncate max-w-[150px] sm:max-w-[200px]">
                {inquiry.eventType}
              </p>
              <Badge variant="secondary" className={`text-[10px] font-semibold px-2 py-0 ${getStatusColor(inquiry.status)}`}>
                {inquiry.status}
              </Badge>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
