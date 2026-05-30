import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Calendar, DollarSign, Mail, MapPin, MessageSquare, Phone, Users } from "lucide-react"
import Link from "next/link"
import { AIInsightsCard } from "@/components/inquiries/ai-insights-card"

export default async function InquiryDetailPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  return (
    <div className="flex flex-col gap-6 max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <Link href="/inquiries" className="inline-flex items-center justify-center rounded-lg border border-border bg-background hover:bg-muted hover:text-foreground h-10 w-10 shrink-0 shadow-sm">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold tracking-tight">Inquiry {params.id}</h1>
            <Badge className="bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 px-3 py-1 text-xs font-semibold">New</Badge>
          </div>
          <p className="text-muted-foreground text-sm mt-1">Received on May 24, 2026 at 10:45 AM</p>
        </div>
        <div className="sm:ml-auto flex items-center gap-2 w-full sm:w-auto">
          <Button variant="outline" className="w-full sm:w-auto text-destructive hover:bg-destructive/10 hover:text-destructive border-border/50">Decline</Button>
          <Button className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white shadow-md">Approve & Contact</Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2 border-border/50 shadow-sm overflow-hidden">
          <CardHeader className="bg-muted/20 border-b border-border/50">
            <CardTitle>Event Details</CardTitle>
            <CardDescription>Information about the requested event</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            <div className="grid grid-cols-2 gap-y-6 gap-x-4">
              <div className="space-y-1.5 p-3 bg-muted/20 rounded-lg border border-border/30">
                <span className="text-sm font-semibold text-muted-foreground flex items-center gap-2"><Calendar className="h-4 w-4 text-primary" /> Event Date</span>
                <p className="font-medium text-lg">August 15, 2026</p>
              </div>
              <div className="space-y-1.5 p-3 bg-muted/20 rounded-lg border border-border/30">
                <span className="text-sm font-semibold text-muted-foreground flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" /> Event Type</span>
                <p className="font-medium text-lg">Wedding Reception</p>
              </div>
              <div className="space-y-1.5 p-3 bg-muted/20 rounded-lg border border-border/30">
                <span className="text-sm font-semibold text-muted-foreground flex items-center gap-2"><Users className="h-4 w-4 text-primary" /> Guest Count</span>
                <p className="font-medium text-lg">150 - 200</p>
              </div>
              <div className="space-y-1.5 p-3 bg-muted/20 rounded-lg border border-border/30">
                <span className="text-sm font-semibold text-muted-foreground flex items-center gap-2"><DollarSign className="h-4 w-4 text-primary" /> Budget</span>
                <p className="font-medium text-lg text-emerald-500">$5,000</p>
              </div>
            </div>
            
            <Separator className="bg-border/50" />
            
            <div className="space-y-3">
              <span className="text-sm font-semibold text-muted-foreground flex items-center gap-2"><MessageSquare className="h-4 w-4 text-primary" /> Customer Message</span>
              <div className="p-5 rounded-xl bg-primary/5 border border-primary/10 text-sm leading-relaxed relative">
                <div className="absolute top-0 left-0 w-1 h-full bg-primary rounded-l-xl"></div>
                "Hello, we are looking for a venue for our wedding reception next August. We are expecting around 150-200 guests and would like to know your availability and packages. We particularly love your outdoor garden area. Looking forward to hearing from you!"
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <AIInsightsCard inquiryText="Hello, we are looking for a venue for our wedding reception next August. We are expecting around 150-200 guests and would like to know your availability and packages. We particularly love your outdoor garden area. Looking forward to hearing from you!" />
          
          <Card className="border-border/50 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle>Customer Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg ring-2 ring-primary/20 ring-offset-2 ring-offset-background">
                  AJ
                </div>
                <div>
                  <p className="text-base font-semibold">Alice Johnson</p>
                  <Badge variant="outline" className="text-[10px] mt-0.5 text-blue-500 border-blue-500/30 bg-blue-500/5">New Customer</Badge>
                </div>
              </div>
              <Separator className="bg-border/50" />
              <div className="space-y-4 pt-1">
                <div className="flex items-center gap-3 text-sm">
                  <div className="p-2 bg-muted rounded-full">
                    <Mail className="h-4 w-4 text-foreground" />
                  </div>
                  <a href="mailto:alice@example.com" className="hover:underline font-medium">alice@example.com</a>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="p-2 bg-muted rounded-full">
                    <Phone className="h-4 w-4 text-foreground" />
                  </div>
                  <a href="tel:+1234567890" className="hover:underline font-medium">+1 (234) 567-890</a>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-border/50 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle>Status History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 relative before:absolute before:inset-0 before:ml-[11px] before:h-full before:w-[2px] before:bg-border/50">
                <div className="relative flex items-center gap-4">
                  <div className="flex items-center justify-center w-6 h-6 rounded-full border-[3px] border-background bg-blue-500 shadow shrink-0 z-10">
                  </div>
                  <div className="flex-1 p-3 rounded-lg border border-border/50 shadow-sm bg-muted/20">
                    <div className="flex items-center justify-between space-x-2 mb-1">
                      <div className="font-semibold text-sm">Inquiry Received</div>
                      <time className="text-xs font-medium text-muted-foreground">May 24</time>
                    </div>
                    <div className="text-muted-foreground text-xs">System logged new inquiry.</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
