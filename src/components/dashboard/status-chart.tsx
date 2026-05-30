"use client"

import { useEffect, useState } from "react"
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip, Legend } from "recharts"
import { getStatusChartData } from "@/lib/actions"

const COLORS = {
  New: "#3b82f6",       // Blue
  Contacted: "#eab308", // Yellow
  Confirmed: "#10b981", // Emerald
  Rejected: "#ef4444"   // Red
}

export function StatusChart() {
  const [data, setData] = useState<{name: string, value: number}[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      const dbData = await getStatusChartData()
      if (dbData && dbData.length > 0) {
        setData(dbData)
      } else {
        // Fallback to mock if db is empty
        setData([
          { name: "New", value: 45 },
          { name: "Contacted", value: 35 },
          { name: "Confirmed", value: 30 },
          { name: "Rejected", value: 18 },
        ])
      }
      setLoading(false)
    }
    loadData()
  }, [])

  if (loading) {
    return <div className="h-[300px] flex items-center justify-center text-muted-foreground">Loading chart...</div>
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          paddingAngle={5}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[entry.name as keyof typeof COLORS] || "#8884d8"} />
          ))}
        </Pie>
        <Tooltip 
          contentStyle={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)', borderRadius: '8px' }}
          itemStyle={{ color: 'var(--foreground)' }}
        />
        <Legend verticalAlign="bottom" height={36} />
      </PieChart>
    </ResponsiveContainer>
  )
}
