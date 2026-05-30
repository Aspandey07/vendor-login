import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { z } from "zod"

const inquirySchema = z.object({
  customerName: z.string().min(2, "Name is required"),
  customerEmail: z.string().email("Invalid email address"),
  customerPhone: z.string().min(10, "Phone number is required"),
  eventType: z.string().min(2, "Event type is required"),
  eventDate: z.string().or(z.date()),
  guestCount: z.coerce.number().min(1).optional(),
  budget: z.coerce.number().min(0).optional(),
  eventLocation: z.string().optional(),
  message: z.string().min(10, "Please provide more details"),
  vendorId: z.string().min(1, "Please select a vendor")
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const validatedData = inquirySchema.parse(body)

    const inquiry = await prisma.inquiry.create({
      data: {
        customerName: validatedData.customerName,
        customerEmail: validatedData.customerEmail,
        customerPhone: validatedData.customerPhone,
        eventType: validatedData.eventType,
        eventDate: new Date(validatedData.eventDate),
        guestCount: validatedData.guestCount,
        budget: validatedData.budget,
        eventLocation: validatedData.eventLocation,
        message: validatedData.message,
        vendorId: validatedData.vendorId,
        status: "New"
      }
    })

    return NextResponse.json({ success: true, id: inquiry.id }, { status: 201 })
  } catch (error) {
    console.error("Public inquiry error:", error)
    if (error instanceof z.ZodError) {
      const zodError = error as any
      return NextResponse.json({ error: zodError.errors[0].message }, { status: 400 })
    }
    return NextResponse.json({ error: "Failed to submit inquiry" }, { status: 500 })
  }
}
