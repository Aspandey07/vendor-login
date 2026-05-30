"use client"

import { useEffect, useState } from "react"
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { getMonthlyChartData } from "@/lib/actions"

export function MonthlyChart() {
  const [data, setData] = useState<{name: string, total: number}[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      const dbData = await getMonthlyChartData()
      if (dbData && dbData.length > 0) {
        setData(dbData)
      } else {
        // Fallback mock data
        setData([
          { name: "Jan", total: 12 },
          { name: "Feb", total: 18 },
          { name: "Mar", total: 24 },
          { name: "Apr", total: 32 },
          { name: "May", total: 48 },
          { name: "Jun", total: 38 },
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
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
        />
        <Tooltip 
          contentStyle={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)', borderRadius: '8px' }}
          itemStyle={{ color: 'var(--foreground)' }}
          cursor={{fill: 'var(--muted)'}}
        />
        <Bar
          dataKey="total"
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          className="fill-primary"
        />
      </BarChart>
    </ResponsiveContainer>
  )
}
