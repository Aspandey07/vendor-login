import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { inquiryText } = await req.json()
    
    // In a real app, this would use @google/genai or OpenAI
    // Mock response for the dashboard
    
    const insights = {
      score: "High",
      summary: "Customer is looking for a wedding reception venue for 150-200 guests with an outdoor garden area.",
      priority: "High - Follow up within 24 hours. Wedding season is approaching and outdoor spaces book fast.",
      responseSuggestion: "Hi Alice, congratulations on your upcoming wedding! We have availability on August 15th for our outdoor garden area which perfectly accommodates 150-200 guests. Our starting package for this size is around $4,500, fitting your budget. Would you like to schedule a tour?"
    }

    return NextResponse.json({ success: true, insights })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to generate insights" }, { status: 500 })
  }
}
