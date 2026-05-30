import Link from "next/link"
import { Calendar } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-zinc-50 dark:bg-zinc-950">
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-lg">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="font-bold text-2xl tracking-tight flex items-center gap-2">
            <div className="bg-gradient-to-tr from-blue-600 to-purple-600 text-white p-1.5 rounded-xl shadow-md">
              <Calendar className="w-5 h-5" />
            </div>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-purple-700">VendorBook</span>
          </Link>
          <nav className="hidden md:flex gap-6 items-center">
            <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-foreground">Home</Link>
            <Link href="/about" className="text-sm font-medium text-muted-foreground hover:text-foreground">About</Link>
            <Link href="/contact" className="text-sm font-medium text-muted-foreground hover:text-foreground">Contact</Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login" className={cn(buttonVariants({ variant: "outline" }), "rounded-full")}>
              Vendor Login
            </Link>
          </div>
        </div>
      </header>
      
      <main className="flex-1">
        {children}
      </main>
      
      <footer className="border-t bg-background py-12">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            <span className="font-bold">VendorBook</span>
          </div>
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} VendorBook. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
