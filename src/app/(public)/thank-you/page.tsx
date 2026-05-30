import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"

export default function ThankYouPage() {
  return (
    <div className="container mx-auto px-4 py-32 flex flex-col items-center text-center">
      <CheckCircle className="w-24 h-24 text-emerald-500 mb-8" />
      <h1 className="text-4xl md:text-5xl font-bold mb-6">Inquiry Submitted!</h1>
      <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
        Thank you for choosing VendorBook. Your inquiry has been successfully sent to the vendor. 
        They will review your request and get back to you shortly.
      </p>
      <Link href="/">
        <Button size="lg" className="h-12 px-8">Return to Home</Button>
      </Link>
    </div>
  )
}
