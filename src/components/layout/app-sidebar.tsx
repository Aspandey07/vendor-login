"use client"
import { Calendar, Home, Inbox, Settings, Users, FileText } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarHeader
} from "@/components/ui/sidebar"
import Link from "next/link"
import { usePathname } from "next/navigation"

const items = [
  { title: "Dashboard", url: "/dashboard", icon: Home },
  { title: "Inquiries", url: "/dashboard/inquiries", icon: Inbox },
  { title: "Calendar", url: "/dashboard/calendar", icon: Calendar },
  { title: "Quotes", url: "/dashboard/quotes", icon: FileText },
  { title: "My Profile", url: "/dashboard/profile", icon: Users },
  { title: "Settings", url: "/dashboard/settings", icon: Settings },
]

export function AppSidebar() {
  const pathname = usePathname()
  return (
    <Sidebar variant="inset" collapsible="icon">
      <SidebarHeader className="flex items-center justify-center py-6">
        <div className="font-bold text-2xl tracking-tight flex items-center gap-2">
          <div className="bg-gradient-to-tr from-blue-600 to-purple-600 text-white p-2 rounded-xl shadow-md">
             <Calendar className="w-5 h-5" />
          </div>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-purple-700">VendorBook</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Overview</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    render={<Link href={item.url} className="transition-all duration-200" />} 
                    isActive={pathname === item.url} 
                    tooltip={item.title}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium text-sm">{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="p-4 text-xs text-muted-foreground/60 text-center font-medium">
          © 2026 VendorBook
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
