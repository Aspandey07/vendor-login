"use client"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Bell } from "lucide-react"
import { CommandMenu } from "@/components/layout/command-menu"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuGroup,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { signOut } from "next-auth/react"
import Link from "next/link"

export function TopNav() {
  return (
    <header className="flex h-16 shrink-0 items-center gap-4 border-b bg-background/80 px-4 md:px-6 sticky top-0 z-30 backdrop-blur-lg">
      <SidebarTrigger className="-ml-1 text-muted-foreground hover:text-foreground transition-colors" />
      
      <div className="flex-1 flex items-center justify-between">
        <div className="w-full max-w-md hidden sm:flex items-center space-x-2">
          <CommandMenu />
        </div>
        
        <div className="flex items-center gap-4 ml-auto">
          <Button variant="outline" size="sm" className="hidden sm:flex">
            <Link href="/">View Website</Link>
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full relative text-muted-foreground hover:text-foreground">
            <Bell className="h-5 w-5" />
            <span className="absolute top-2 right-2.5 h-2 w-2 rounded-full bg-destructive border-2 border-background"></span>
            <span className="sr-only">Notifications</span>
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger render={<Button variant="ghost" className="relative h-8 w-8 rounded-full" />}>
              <Avatar className="h-9 w-9">
                <AvatarImage src="https://api.dicebear.com/7.x/notionists/svg?seed=vendor" alt="Vendor" />
                <AvatarFallback className="bg-primary/10 text-primary font-semibold">VN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 shadow-xl border-border/50" align="end">
              <DropdownMenuGroup>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">Vendor Account</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      contact@vendor.com
                    </p>
                  </div>
                </DropdownMenuLabel>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem render={<Link href="/dashboard/profile" className="w-full cursor-pointer" />}>
                Profile Settings
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">Billing</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => signOut()} className="cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10">
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
