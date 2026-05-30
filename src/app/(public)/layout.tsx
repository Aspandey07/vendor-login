import Link from "next/link"
import { Calendar, Mail, Phone, MapPin, Search, ShoppingBag } from "lucide-react"
import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 font-sans">
      {/* Promotional Top Bar */}
      <div className="w-full bg-indigo-600 text-white text-xs md:text-sm py-2 px-4 text-center font-medium tracking-wide">
        🎉 Special Offer: Get 20% off all premium wedding bookings this month! <Link href="/#inquiry" className="underline font-bold ml-1 hover:text-indigo-200">Book Now</Link>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl shadow-sm">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <Link href="/" className="font-extrabold text-2xl tracking-tight flex items-center gap-2.5 group">
            <div className="bg-indigo-600 text-white p-2 rounded-xl shadow-lg group-hover:scale-105 group-hover:bg-indigo-700 transition-all">
              <Calendar className="w-5 h-5" />
            </div>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 to-violet-700 dark:from-indigo-400 dark:to-violet-400 text-2xl">
              VendorBook
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-8 items-center">
            <Link href="/" className="text-sm font-bold text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Home</Link>
            <div className="relative group cursor-pointer">
              <span className="text-sm font-bold text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-1">
                Categories
              </span>
              {/* Simple dropdown mock */}
              <div className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-slate-900 shadow-xl rounded-xl border border-slate-100 dark:border-slate-800 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all flex flex-col p-2">
                <Link href="#" className="p-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg">Weddings</Link>
                <Link href="#" className="p-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg">Corporate</Link>
                <Link href="#" className="p-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg">Parties</Link>
              </div>
            </div>
            <Link href="/about" className="text-sm font-bold text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">About</Link>
            <Link href="/contact" className="text-sm font-bold text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Contact</Link>
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center mr-2 text-slate-500 hover:text-indigo-600 cursor-pointer transition-colors">
              <Search className="w-5 h-5" />
            </div>
            <div className="hidden sm:flex items-center mr-2 text-slate-500 hover:text-indigo-600 cursor-pointer transition-colors relative">
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute -top-1.5 -right-1.5 bg-indigo-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">0</span>
            </div>
            <Link href="/login" className={cn(buttonVariants({ variant: "outline" }), "rounded-full font-semibold border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800")}>
              Login
            </Link>
            <Link href="/login" className={cn(buttonVariants({ variant: "default" }), "rounded-full font-bold bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-200 dark:shadow-none hidden sm:inline-flex")}>
              Vendor Signup
            </Link>
          </div>
        </div>
      </header>
      
      <main className="flex-1 w-full">
        {children}
      </main>
      
      {/* Mega Footer */}
      <footer className="bg-slate-900 text-slate-300 pt-20 pb-10 border-t-4 border-indigo-600">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            
            {/* Brand Column */}
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <div className="bg-indigo-500 text-white p-2 rounded-lg">
                  <Calendar className="w-6 h-6" />
                </div>
                <span className="text-2xl font-extrabold text-white">VendorBook</span>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">
                The world's leading premium marketplace for discovering, comparing, and booking elite event professionals.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-indigo-500 hover:text-white transition-colors text-xs font-bold">FB</a>
                <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-indigo-500 hover:text-white transition-colors text-xs font-bold">TW</a>
                <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-indigo-500 hover:text-white transition-colors text-xs font-bold">IG</a>
                <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-indigo-500 hover:text-white transition-colors text-xs font-bold">IN</a>
              </div>
            </div>

            {/* Customers Links */}
            <div>
              <h3 className="text-white font-bold text-lg mb-6 relative inline-block">
                For Customers
                <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-indigo-500 rounded-full"></span>
              </h3>
              <ul className="space-y-4 text-sm">
                <li><Link href="#" className="hover:text-white hover:translate-x-1 inline-block transition-transform">Browse Categories</Link></li>
                <li><Link href="#" className="hover:text-white hover:translate-x-1 inline-block transition-transform">Top Rated Vendors</Link></li>
                <li><Link href="#" className="hover:text-white hover:translate-x-1 inline-block transition-transform">How It Works</Link></li>
                <li><Link href="#" className="hover:text-white hover:translate-x-1 inline-block transition-transform">Trust & Safety</Link></li>
                <li><Link href="#" className="hover:text-white hover:translate-x-1 inline-block transition-transform">Customer FAQs</Link></li>
              </ul>
            </div>

            {/* Vendors Links */}
            <div>
              <h3 className="text-white font-bold text-lg mb-6 relative inline-block">
                For Vendors
                <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-indigo-500 rounded-full"></span>
              </h3>
              <ul className="space-y-4 text-sm">
                <li><Link href="/login" className="hover:text-white hover:translate-x-1 inline-block transition-transform">Join as a Vendor</Link></li>
                <li><Link href="#" className="hover:text-white hover:translate-x-1 inline-block transition-transform">Pricing Plans</Link></li>
                <li><Link href="/login" className="hover:text-white hover:translate-x-1 inline-block transition-transform">Vendor Login</Link></li>
                <li><Link href="#" className="hover:text-white hover:translate-x-1 inline-block transition-transform">Success Stories</Link></li>
                <li><Link href="#" className="hover:text-white hover:translate-x-1 inline-block transition-transform">Vendor Resources</Link></li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="text-white font-bold text-lg mb-6 relative inline-block">
                Stay Updated
                <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-indigo-500 rounded-full"></span>
              </h3>
              <p className="text-sm text-slate-400 mb-4">Subscribe to our newsletter for exclusive event planning tips and vendor discounts.</p>
              <form className="flex flex-col gap-3">
                <Input type="email" placeholder="Enter your email address" className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 focus-visible:ring-indigo-500 h-12" />
                <Button className="w-full bg-indigo-600 hover:bg-indigo-700 h-12 font-bold">Subscribe</Button>
              </form>
              <div className="mt-6 space-y-2 text-sm text-slate-400">
                <p className="flex items-center gap-2"><Phone className="w-4 h-4 text-indigo-400" /> +1 (800) 123-4567</p>
                <p className="flex items-center gap-2"><Mail className="w-4 h-4 text-indigo-400" /> hello@vendorbook.com</p>
                <p className="flex items-center gap-2"><MapPin className="w-4 h-4 text-indigo-400" /> 123 Event Street, NY 10001</p>
              </div>
            </div>

          </div>
          
          <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-slate-500">
              © {new Date().getFullYear()} VendorBook Marketplace. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-slate-500">
              <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
              <Link href="#" className="hover:text-white transition-colors">Cookie Settings</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
