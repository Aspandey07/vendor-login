import { InquiryForm } from "@/components/public/inquiry-form"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Users, Clock, ShieldCheck, Star, PartyPopper, Briefcase, GlassWater, Music } from "lucide-react"
import Link from "next/link"
import { prisma } from "@/lib/prisma"

async function getFeaturedVendors() {
  try {
    return await prisma.vendor.findMany({
      take: 3,
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
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative w-full py-20 md:py-32 overflow-hidden bg-gradient-to-br from-indigo-950 via-slate-900 to-black text-white">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069&auto=format&fit=crop')] opacity-20 bg-cover bg-center mix-blend-overlay"></div>
        <div className="container relative z-10 px-4 md:px-6 mx-auto text-center flex flex-col items-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 max-w-4xl drop-shadow-lg">
            Book the Perfect Vendor for Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Unforgettable Event</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl font-medium">
            Discover, compare, and book top-rated vendors for weddings, corporate events, and private parties all in one place.
          </p>
          <div className="flex gap-4">
            <Link href="#inquiry">
              <Button size="lg" className="h-14 px-8 text-lg rounded-full font-bold shadow-xl hover:scale-105 transition-transform bg-white text-slate-900 hover:bg-slate-100">
                Submit Inquiry
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-zinc-50 dark:bg-zinc-950">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Events We Cater To</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">From intimate gatherings to massive corporate galas, our vendors have you covered.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: PartyPopper, title: "Wedding Events", desc: "Make your special day truly magical with our premium wedding vendors." },
              { icon: Briefcase, title: "Corporate Events", desc: "Professional setups for conferences, seminars, and team building." },
              { icon: Calendar, title: "Birthday Parties", desc: "Fun and engaging setups for birthdays of all ages." },
              { icon: GlassWater, title: "Anniversary Celebrations", desc: "Romantic and elegant settings for your milestones." },
              { icon: Star, title: "Gala Dinners", desc: "Luxurious arrangements for high-end dining experiences." },
              { icon: Music, title: "Private Events", desc: "Customized planning for your exclusive private gatherings." },
            ].map((service, i) => (
              <Card key={i} className="group hover:shadow-xl transition-all duration-300 border-border/50 hover:border-primary/50 overflow-hidden bg-background">
                <CardContent className="p-8 flex flex-col items-center text-center">
                  <div className="p-4 bg-primary/10 rounded-full mb-6 group-hover:scale-110 transition-transform duration-300">
                    <service.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                  <p className="text-muted-foreground">{service.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-background border-y border-border/40">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="flex flex-col items-center">
              <ShieldCheck className="w-12 h-12 text-blue-500 mb-4" />
              <h3 className="font-bold text-xl mb-2">Trusted Vendors</h3>
              <p className="text-muted-foreground text-sm">Vetted professionals with verified reviews.</p>
            </div>
            <div className="flex flex-col items-center">
              <Clock className="w-12 h-12 text-emerald-500 mb-4" />
              <h3 className="font-bold text-xl mb-2">Fast Response</h3>
              <p className="text-muted-foreground text-sm">Get quotes and answers within hours, not days.</p>
            </div>
            <div className="flex flex-col items-center">
              <Star className="w-12 h-12 text-amber-500 mb-4" />
              <h3 className="font-bold text-xl mb-2">Easy Booking</h3>
              <p className="text-muted-foreground text-sm">Streamlined process from inquiry to confirmation.</p>
            </div>
            <div className="flex flex-col items-center">
              <Users className="w-12 h-12 text-purple-500 mb-4" />
              <h3 className="font-bold text-xl mb-2">Pro Management</h3>
              <p className="text-muted-foreground text-sm">Dedicated support for your event success.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Vendors */}
      <section className="py-20 bg-zinc-50 dark:bg-zinc-950">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Vendors</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Work with the best in the industry.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {vendors.length > 0 ? vendors.map((vendor) => (
              <Card key={vendor.id} className="border-border/50 hover:shadow-lg transition-all">
                <div className="h-32 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-t-xl"></div>
                <CardContent className="pt-0 relative">
                  <div className="w-20 h-20 bg-background border-4 border-background rounded-full absolute -top-10 left-6 flex items-center justify-center shadow-md">
                    <span className="font-bold text-2xl text-primary">{vendor.name.charAt(0)}</span>
                  </div>
                  <div className="pt-14 pb-4">
                    <h3 className="text-xl font-bold">{vendor.name}</h3>
                    <p className="text-sm text-primary font-medium mb-2">{vendor.category}</p>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      📍 {vendor.location}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )) : (
              <div className="col-span-3 text-center text-muted-foreground py-10">
                No vendors listed yet.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Inquiry Form Section */}
      <section id="inquiry" className="py-24 bg-background">
        <div className="container px-4 md:px-6 mx-auto">
          <InquiryForm />
        </div>
      </section>
    </div>
  )
}
