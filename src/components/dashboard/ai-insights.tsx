"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Sparkles, TrendingUp, AlertCircle, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export function AiInsights() {
  const insights = [
    {
      id: 1,
      type: "opportunity",
      icon: TrendingUp,
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10",
      title: "High Value Inquiry Detected",
      description: "A new inquiry for a 'Corporate Gala' matches your ideal high-budget profile. Responding within 1 hour increases conversion by 40%."
    },
    {
      id: 2,
      type: "warning",
      icon: AlertCircle,
      color: "text-amber-500",
      bgColor: "bg-amber-500/10",
      title: "Follow-up Reminder",
      description: "You have 3 'Contacted' inquiries that have been waiting for over 48 hours for a response. Send a quick check-in email."
    }
  ]

  return (
    <Card className="border-border/50 shadow-sm overflow-hidden relative group">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-transparent pointer-events-none" />
      <CardHeader className="pb-3 flex flex-row items-center justify-between">
        <div>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Sparkles className="h-5 w-5 text-indigo-500" />
            AI Smart Insights
          </CardTitle>
          <CardDescription>Automated analysis of your booking pipeline</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {insights.map((insight, index) => (
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.2 }}
            key={insight.id} 
            className="flex items-start gap-4 p-3 rounded-xl hover:bg-muted/50 transition-colors border border-transparent hover:border-border/50"
          >
            <div className={`p-2 rounded-full mt-0.5 ${insight.bgColor}`}>
              <insight.icon className={`h-4 w-4 ${insight.color}`} />
            </div>
            <div className="space-y-1 flex-1">
              <h4 className="text-sm font-semibold">{insight.title}</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">{insight.description}</p>
            </div>
          </motion.div>
        ))}
        
        <Button variant="ghost" className="w-full text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 mt-2 text-sm">
          Generate response drafts <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  )
}
