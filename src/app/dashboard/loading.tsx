import { Loader2 } from "lucide-react"

export default function DashboardLoading() {
  return (
    <div className="flex h-[70vh] w-full items-center justify-center">
      <div className="flex flex-col items-center gap-4 text-muted-foreground animate-in fade-in duration-500 delay-150 fill-mode-both">
        <div className="relative flex items-center justify-center">
          <div className="absolute h-12 w-12 rounded-full border-4 border-primary/20"></div>
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
        <p className="text-sm font-medium tracking-tight">Loading dashboard data...</p>
      </div>
    </div>
  )
}
