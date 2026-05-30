"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Sparkles, Loader2, ThumbsUp, ThumbsDown, MessageSquareQuote } from "lucide-react"
import { Separator } from "@/components/ui/separator"

export function AIInsightsCard({ inquiryText }: { inquiryText: string }) {
  const [loading, setLoading] = useState(false)
  const [insights, setInsights] = useState<any>(null)

  const generateInsights = async () => {
    setLoading(true)
    // Simulate AI API call
    setTimeout(() => {
      setInsights({
        score: "High",
        summary: "Customer is looking for a wedding reception venue for 150-200 guests with an outdoor garden area.",
        priority: "High - Follow up within 24 hours. Wedding season is approaching and outdoor spaces book fast.",
        responseSuggestion: "Hi Alice, congratulations on your upcoming wedding! We have availability on August 15th for our outdoor garden area which perfectly accommodates 150-200 guests. Our starting package for this size is around $4,500, fitting your budget. Would you like to schedule a tour?"
      })
      setLoading(false)
    }, 1500)
  }

  return (
    <Card className="border-primary/20 shadow-sm overflow-hidden bg-primary/5">
      <CardHeader className="pb-3 flex flex-row items-start justify-between">
        <div>
          <CardTitle className="flex items-center gap-2 text-primary">
            <Sparkles className="h-5 w-5" /> AI Insights
          </CardTitle>
          <CardDescription className="text-primary/70">Generated analysis of this inquiry</CardDescription>
        </div>
        {insights && (
          <Badge className={insights.score === "High" ? "bg-emerald-500 hover:bg-emerald-600" : "bg-yellow-500"}>
            {insights.score} Priority Lead
          </Badge>
        )}
      </CardHeader>
      <CardContent>
        {!insights && !loading && (
          <div className="flex flex-col items-center justify-center p-6 text-center space-y-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <div className="space-y-1">
              <p className="font-medium text-primary">Generate AI Analysis</p>
              <p className="text-xs text-primary/70 max-w-[250px]">Analyze customer requirements, score this lead, and generate a tailored response.</p>
            </div>
            <Button onClick={generateInsights} className="bg-primary text-primary-foreground hover:bg-primary/90 mt-2 shadow-sm">
              Generate Insights
            </Button>
          </div>
        )}

        {loading && (
          <div className="flex flex-col items-center justify-center p-8 space-y-4 text-primary">
            <Loader2 className="h-8 w-8 animate-spin" />
            <p className="text-sm font-medium animate-pulse">Analyzing inquiry data...</p>
          </div>
        )}

        {insights && !loading && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="space-y-2">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-primary/70">Quick Summary</h4>
              <p className="text-sm font-medium">{insights.summary}</p>
            </div>
            
            <Separator className="bg-primary/10" />
            
            <div className="space-y-2">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-primary/70">Recommended Action</h4>
              <p className="text-sm font-medium text-emerald-600">{insights.priority}</p>
            </div>
            
            <Separator className="bg-primary/10" />
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-primary/70">Suggested Response</h4>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" className="h-6 w-6 text-primary/70 hover:text-primary hover:bg-primary/10">
                    <ThumbsUp className="h-3 w-3" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-6 w-6 text-primary/70 hover:text-destructive hover:bg-destructive/10">
                    <ThumbsDown className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              <div className="p-3 bg-background/50 rounded-lg border border-primary/20 text-sm relative">
                <MessageSquareQuote className="absolute top-3 right-3 h-4 w-4 text-primary/30" />
                <p className="pr-6 leading-relaxed">{insights.responseSuggestion}</p>
              </div>
              <Button size="sm" variant="outline" className="w-full mt-2 border-primary/30 text-primary hover:bg-primary/10">
                Copy to Reply
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
