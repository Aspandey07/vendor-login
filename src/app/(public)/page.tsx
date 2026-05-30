import { InquiryForm } from "@/components/public/inquiry-form"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Users, Clock, ShieldCheck, Star, PartyPopper, Briefcase, GlassWater, Music, MapPin, CheckCircle2, ArrowRight } from "lucide-react"
import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { Input } from "@/components/ui/input"

async function getFeaturedVendors() {
  try {
    return await prisma.vendor.findMany({
      take: 6,
      select: {
        id: true,
        name: true,
        category: true,
        location: true,
      }
    })
  } catch (error) {
    return []
  }
}

export default async function HomePage() {
  const vendors = await getFeaturedVendors()

  return (
    <div className="flex flex-col w-full bg-slate-50 dark:bg-slate-950">
      

      <section className="relative w-full pt-32 pb-40 overflow-hidden flex flex-col items-center justify-center min-h-[90vh]">
        <div className="absolute inset-0 bg-slate-900">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2070&auto=format&fit=crop')] opacity-40 bg-cover bg-center mix-blend-overlay scale-105 animate-pulse-slow"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent"></div>
        </div>
        
        <div className="container relative z-10 px-4 md:px-6 mx-auto text-center flex flex-col items-center mt-[-5vh]">
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 max-w-5xl text-white drop-shadow-2xl leading-tight">
            Book the Perfect Vendor for Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">Dream Event</span>
          </h1>
          <p className="text-lg md:text-2xl text-slate-200 mb-12 max-w-3xl font-medium drop-shadow-md">
            The premium marketplace to discover, compare, and book elite professionals for weddings, parties, and corporate events.
          </p>
          

          <div className="w-full max-w-4xl bg-white dark:bg-slate-900 rounded-full p-2.5 shadow-2xl flex flex-col md:flex-row items-center gap-2 border border-slate-200 dark:border-slate-800">
            <div className="flex-1 flex items-center px-4 w-full md:border-r border-slate-200 dark:border-slate-700">
              <PartyPopper className="w-5 h-5 text-indigo-500 mr-3 shrink-0" />
              <Input type="text" placeholder="What are you looking for? (e.g. Photographer)" className="border-0 shadow-none focus-visible:ring-0 bg-transparent text-base" />
            </div>
            <div className="flex-1 flex items-center px-4 w-full md:border-r border-slate-200 dark:border-slate-700 mt-2 md:mt-0">
              <MapPin className="w-5 h-5 text-indigo-500 mr-3 shrink-0" />
              <Input type="text" placeholder="Where? (e.g. New York)" className="border-0 shadow-none focus-visible:ring-0 bg-transparent text-base" />
            </div>
            <div className="flex-1 flex items-center px-4 w-full mt-2 md:mt-0">
              <Calendar className="w-5 h-5 text-indigo-500 mr-3 shrink-0" />
              <Input type="date" className="border-0 shadow-none focus-visible:ring-0 bg-transparent text-base text-slate-500" />
            </div>
            <Link href="#inquiry" className="w-full md:w-auto mt-2 md:mt-0">
              <Button size="lg" className="w-full rounded-full h-14 px-8 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-lg shadow-lg hover:shadow-indigo-500/25 transition-all">
                Search
              </Button>
            </Link>
          </div>
        </div>
      </section>


      <div className="w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 py-6">
        <div className="container mx-auto px-4 flex flex-wrap justify-center gap-8 md:gap-16 opacity-70 grayscale">

          <h3 className="font-bold text-xl text-slate-400 flex items-center gap-2"><div className="w-6 h-6 bg-slate-400 rounded-sm"></div> Forbes</h3>
          <h3 className="font-bold text-xl text-slate-400 flex items-center gap-2"><div className="w-6 h-6 bg-slate-400 rounded-full"></div> Vogue</h3>
          <h3 className="font-bold text-xl text-slate-400 flex items-center gap-2"><div className="w-6 h-6 bg-slate-400 rounded-sm rotate-45"></div> TheKnot</h3>
          <h3 className="font-bold text-xl text-slate-400 flex items-center gap-2"><div className="w-6 h-6 bg-slate-400 rounded-tl-lg rounded-br-lg"></div> WeddingWire</h3>
        </div>
      </div>


      <section className="py-24">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">Shop by Event Type</h2>
              <p className="text-slate-500 dark:text-slate-400 text-lg max-w-2xl">Find specialized professionals tailored perfectly to your specific occasion.</p>
            </div>
            <Button variant="ghost" className="text-indigo-600 font-bold hover:bg-indigo-50 mt-4 md:mt-0">
              View All Categories <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Weddings", image: "https://picsum.photos/seed/weddings/800/800", count: "340+ Vendors" },
              { title: "Corporate Galas", image: "https://picsum.photos/seed/corporate/800/800", count: "120+ Vendors" },
              { title: "Birthday Parties", image: "https://picsum.photos/seed/birthday/800/800", count: "210+ Vendors" },
              { title: "Private Dining", image: "https://picsum.photos/seed/dining/800/800", count: "85+ Vendors" },
            ].map((cat, i) => (
              <Link href="#inquiry" key={i} className="group relative h-80 rounded-[2rem] overflow-hidden shadow-lg cursor-pointer">
                <div className="absolute inset-0 bg-slate-900">
                  <img src={cat.image} alt={cat.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6 w-full">
                  <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-indigo-300 transition-colors">{cat.title}</h3>
                  <p className="text-slate-300 text-sm font-medium">{cat.count}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>


      <section className="py-24 bg-white dark:bg-slate-900">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">Top Rated Vendors</h2>
              <p className="text-slate-500 dark:text-slate-400 text-lg max-w-2xl">Book the most sought-after professionals for your dates before they sell out.</p>
            </div>
            <Button variant="ghost" className="text-indigo-600 font-bold hover:bg-indigo-50 mt-4 md:mt-0">
              Explore All <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {vendors.length > 0 ? vendors.map((vendor, index) => (
              <Card key={vendor.id} className="border border-slate-100 dark:border-slate-800 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300 group overflow-hidden bg-white dark:bg-slate-950 rounded-[2rem]">
                <div className="relative h-56 bg-slate-100 overflow-hidden">

                  <img src={`https://picsum.photos/seed/${vendor.id}/800/600`} alt={vendor.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-indigo-700 uppercase tracking-wider">
                    {vendor.category}
                  </div>
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-1.5 rounded-full text-slate-700 hover:text-red-500 cursor-pointer transition-colors shadow-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-extrabold text-slate-900 dark:text-white line-clamp-1 group-hover:text-indigo-600 transition-colors">{vendor.name}</h3>
                    <div className="flex items-center gap-1 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded font-bold text-sm">
                      <Star className="w-3.5 h-3.5 fill-current" /> 4.9
                    </div>
                  </div>
                  <p className="text-sm text-slate-500 flex items-center gap-1.5 mb-5 font-medium">
                    <MapPin className="w-4 h-4 text-slate-400" /> {vendor.location}
                  </p>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                    <div>
                      <p className="text-xs text-slate-500 font-medium">Starting from</p>
                      <p className="text-lg font-bold text-slate-900 dark:text-white">${Math.floor(Math.random() * 8 + 2) * 100}</p>
                    </div>
                    <Link href="#inquiry">
                      <Button className="bg-slate-900 hover:bg-indigo-600 text-white rounded-full px-6 transition-colors">
                        Book Now
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            )) : (
              <div className="col-span-3 text-center text-slate-500 py-10 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
                <p className="font-medium">No vendors listed yet. Be the first to join!</p>
                <Link href="/login"><Button className="mt-4">Vendor Signup</Button></Link>
              </div>
            )}
          </div>
        </div>
      </section>


      <section className="py-24 overflow-hidden relative">
        <div className="absolute inset-0 bg-indigo-600 skew-y-3 origin-top-left -z-10"></div>
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center mb-16 text-white">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">Loved by Thousands</h2>
            <p className="text-indigo-100 text-lg max-w-2xl mx-auto">Don't just take our word for it. See what our customers have to say.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Sarah Jenkins", role: "Bride", text: "I found my entire wedding team here in one afternoon. The booking process was seamless and the vendors were incredibly professional." },
              { name: "Michael Chen", role: "Corporate Event Planner", text: "VendorBook completely transformed how our company handles annual galas. The quality of caterers and AV teams available is unmatched." },
              { name: "Amanda Rossi", role: "Birthday Host", text: "I wanted something special for my daughter's 16th. Found an amazing decorator and DJ within my budget instantly!" }
            ].map((review, i) => (
              <Card key={i} className="bg-white dark:bg-slate-900 border-none shadow-xl rounded-[2rem] p-2 relative">
                <div className="absolute -top-6 -right-6 text-indigo-100 dark:text-slate-800">
                  <svg width="80" height="80" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M14.017 21L16.417 14.599C16.637 13.986 16.75 13.332 16.75 12.671V3H23V12.671C23 15.696 21.684 18.57 19.387 20.574L18.411 21.411L14.017 21ZM5.01697 21L7.41697 14.599C7.63697 13.986 7.74997 13.332 7.74997 12.671V3H14V12.671C14 15.696 12.684 18.57 10.387 20.574L9.41097 21.411L5.01697 21Z"/></svg>
                </div>
                <CardContent className="p-8 relative z-10">
                  <div className="flex gap-1 mb-6 text-amber-400">
                    <Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" />
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 text-lg mb-8 italic leading-relaxed">"{review.text}"</p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center font-bold text-slate-500">
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white">{review.name}</h4>
                      <p className="text-sm text-slate-500 font-medium">{review.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>


      <section id="inquiry" className="py-24 bg-slate-50 dark:bg-slate-950 relative">
        <div className="container px-4 md:px-6 mx-auto relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">Secure Your Booking</h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">Fill out your details below. We'll connect you with the vendor directly to finalize the details.</p>
          </div>
          <InquiryForm />
        </div>
      </section>
    </div>
  )
}
