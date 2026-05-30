import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const vendors = await prisma.vendor.findMany({
      select: {
        id: true,
        name: true,
        category: true,
        location: true,
        logoUrl: true
      },
      take: 10
    })

    return NextResponse.json({ success: true, data: vendors })
  } catch (error) {
    console.error("Failed to fetch vendors:", error)
    return NextResponse.json({ error: "Failed to fetch vendors" }, { status: 500 })
  }
}
