import { getDashboardStats } from "@/lib/actions"
import { DashboardContent } from "@/components/dashboard/dashboard-content"

export default async function DashboardPage() {
  const stats = await getDashboardStats()
  
  return <DashboardContent stats={stats} />
}
