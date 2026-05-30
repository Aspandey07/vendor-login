import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Building2, TrendingUp, AlertCircle } from "lucide-react"

export default function AdminDashboardPage() {
  return (
    <div className="flex flex-col gap-8 pb-8">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight">Admin Overview</h1>
        <p className="text-slate-400 text-sm">Platform-wide analytics and vendor management.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-slate-900 border-slate-800 text-slate-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Total Vendors</CardTitle>
            <div className="p-2 bg-emerald-500/10 rounded-full">
              <Building2 className="h-4 w-4 text-emerald-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">412</div>
            <p className="text-xs text-emerald-400 mt-1 font-medium">
              +12 this week
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800 text-slate-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Total Platform Inquiries</CardTitle>
            <div className="p-2 bg-blue-500/10 rounded-full">
              <Users className="h-4 w-4 text-blue-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">8,245</div>
            <p className="text-xs text-emerald-400 mt-1 font-medium">
              +345 this week
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800 text-slate-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Platform GMV</CardTitle>
            <div className="p-2 bg-purple-500/10 rounded-full">
              <TrendingUp className="h-4 w-4 text-purple-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">$1.2M</div>
            <p className="text-xs text-emerald-400 mt-1 font-medium">
              +15% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800 text-slate-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Pending Approvals</CardTitle>
            <div className="p-2 bg-amber-500/10 rounded-full">
              <AlertCircle className="h-4 w-4 text-amber-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">7</div>
            <p className="text-xs text-slate-400 mt-1">
              Vendors awaiting verification
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-slate-900 border-slate-800 text-slate-50 flex-1">
        <CardHeader>
          <CardTitle>Top Performing Vendors</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-lg bg-slate-950 border border-slate-800">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-slate-800 flex items-center justify-center font-bold">
                    V{i}
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-slate-200">Premium Event Solutions {i}</p>
                    <p className="text-xs text-slate-500">142 Inquiries • 85% Conversion</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-emerald-400">${(i * 12000).toLocaleString()}</p>
                  <p className="text-xs text-slate-500">Revenue Generated</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
