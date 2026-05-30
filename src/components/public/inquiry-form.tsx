"use client"
import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const formSchema = z.object({
  customerName: z.string().min(2, "Name must be at least 2 characters"),
  customerEmail: z.string().email("Please enter a valid email"),
  customerPhone: z.string().min(10, "Phone number required"),
  eventType: z.string().min(2, "Event type is required"),
  eventDate: z.string().min(1, "Event date is required"),
  guestCount: z.coerce.number().min(1, "Guest count must be at least 1"),
  budget: z.coerce.number().min(0, "Budget must be a positive number"),
  eventLocation: z.string().min(2, "Event location is required"),
  vendorId: z.string().min(1, "Please select a vendor"),
  message: z.string().min(10, "Please provide some details about your event")
})

type FormData = z.infer<typeof formSchema>

interface Vendor {
  id: string
  name: string
  category: string
}

export function InquiryForm() {
  const router = useRouter()
  const [vendors, setVendors] = useState<Vendor[]>([])
  const [loading, setLoading] = useState(true)
  
  const { register, handleSubmit, formState: { errors, isSubmitting }, setValue, watch } = useForm<FormData>({
    resolver: zodResolver(formSchema) as any,
    defaultValues: {
      eventType: "",
      vendorId: "",
    }
  })

  useEffect(() => {
    fetch("/api/public/vendors")
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setVendors(data.data)
        }
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      })
  }, [])

  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetch("/api/public/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      })
      
      const result = await response.json()
      
      if (response.ok) {
        toast.success("Inquiry submitted successfully!")
        router.push("/thank-you")
      } else {
        toast.error(result.error || "Failed to submit inquiry")
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again later.")
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-xl border-border/50">
      <CardHeader className="text-center pb-8">
        <CardTitle className="text-3xl font-bold tracking-tight">Book Your Event</CardTitle>
        <CardDescription className="text-lg">Fill out the form below and we'll get back to you shortly.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="customerName">Full Name</Label>
              <Input id="customerName" placeholder="John Doe" {...register("customerName")} />
              {errors.customerName && <p className="text-sm text-destructive">{errors.customerName.message}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="customerEmail">Email Address</Label>
              <Input id="customerEmail" type="email" placeholder="john@example.com" {...register("customerEmail")} />
              {errors.customerEmail && <p className="text-sm text-destructive">{errors.customerEmail.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="customerPhone">Phone Number</Label>
              <Input id="customerPhone" placeholder="+1 (555) 000-0000" {...register("customerPhone")} />
              {errors.customerPhone && <p className="text-sm text-destructive">{errors.customerPhone.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="vendorId" className="font-semibold">Select Vendor</Label>
              <Select onValueChange={(val) => { if (val) setValue("vendorId", val as string) }} disabled={loading}>
                <SelectTrigger className="h-12 rounded-xl">
                  <SelectValue placeholder={loading ? "Loading vendors..." : "✨ Choose your preferred vendor"} />
                </SelectTrigger>
                <SelectContent className="rounded-xl shadow-xl">
                  {vendors.map(vendor => (
                    <SelectItem key={vendor.id} value={vendor.id} className="cursor-pointer">
                      {vendor.name} ({vendor.category})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.vendorId && <p className="text-sm text-destructive">{errors.vendorId.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="eventType">Event Type</Label>
              <Select onValueChange={(val) => { if (val) setValue("eventType", val as string) }}>
                <SelectTrigger>
                  <SelectValue placeholder="Select event type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Wedding">Wedding</SelectItem>
                  <SelectItem value="Corporate">Corporate Event</SelectItem>
                  <SelectItem value="Birthday">Birthday Party</SelectItem>
                  <SelectItem value="Anniversary">Anniversary</SelectItem>
                  <SelectItem value="Gala">Gala Dinner</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
              {errors.eventType && <p className="text-sm text-destructive">{errors.eventType.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="eventDate">Event Date</Label>
              <Input id="eventDate" type="date" {...register("eventDate")} />
              {errors.eventDate && <p className="text-sm text-destructive">{errors.eventDate.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="guestCount">Estimated Guests</Label>
              <Input id="guestCount" type="number" min="1" placeholder="100" {...register("guestCount")} />
              {errors.guestCount && <p className="text-sm text-destructive">{errors.guestCount.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="budget">Estimated Budget ($)</Label>
              <Input id="budget" type="number" min="0" placeholder="5000" {...register("budget")} />
              {errors.budget && <p className="text-sm text-destructive">{errors.budget.message}</p>}
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="eventLocation">Event Location (Venue or City)</Label>
            <Input id="eventLocation" placeholder="Grand Hotel, New York" {...register("eventLocation")} />
            {errors.eventLocation && <p className="text-sm text-destructive">{errors.eventLocation.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Additional Requirements</Label>
            <Textarea 
              id="message" 
              placeholder="Tell us more about your vision, specific requirements, or questions..."
              className="min-h-[120px]"
              {...register("message")} 
            />
            {errors.message && <p className="text-sm text-destructive">{errors.message.message}</p>}
          </div>

          <Button type="submit" className="w-full text-lg h-12" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Inquiry"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
