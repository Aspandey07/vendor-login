"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { generatePDF } from "@/lib/pdf-generator"
import { Download, Plus, FileText, Send, Trash2, ArrowLeft } from "lucide-react"
import { toast } from "sonner"

interface LineItem {
  id: string
  description: string
  qty: number
  price: number
}

export default function QuotesPage() {
  const [isEditing, setIsEditing] = useState(false)
  const [clientName, setClientName] = useState("Alice Johnson")
  const [clientEmail, setClientEmail] = useState("alice@example.com")
  const [eventDate, setEventDate] = useState("Aug 15, 2026")
  
  const [items, setItems] = useState<LineItem[]>([
    { id: "1", description: "Outdoor Garden Venue Rental (Full Day)", qty: 1, price: 3500 },
    { id: "2", description: "Standard Catering Package (Per Person)", qty: 150, price: 45 },
    { id: "3", description: "Audio/Visual Basic Setup", qty: 1, price: 500 }
  ])

  const subtotal = items.reduce((acc, item) => acc + (item.qty * item.price), 0)
  const tax = subtotal * 0.08
  const total = subtotal + tax

  const handleDownload = () => {
    generatePDF("quote-preview", "vendor-quote.pdf")
  }

  const addItem = () => {
    const newItem = { id: Date.now().toString(), description: "New Item", qty: 1, price: 0 }
    setItems([...items, newItem])
  }

  const updateItem = (id: string, field: keyof LineItem, value: string | number) => {
    setItems(items.map(item => item.id === id ? { ...item, [field]: value } : item))
  }

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id))
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount)
  }

  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-6xl mx-auto pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Quotes</h1>
          <p className="text-muted-foreground text-sm mt-1">Generate and manage service quotations.</p>
        </div>
        {!isEditing && (
          <Button className="w-full sm:w-auto shadow-md" onClick={() => setIsEditing(true)}>
            <Plus className="mr-2 h-4 w-4" /> New Quote
          </Button>
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          {!isEditing ? (
            <Card className="border-border/50 shadow-sm">
              <CardHeader>
                <CardTitle>Recent Quotes</CardTitle>
                <CardDescription>Quotes you have recently generated.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-lg border border-border/50 bg-muted/20">
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-primary/10 rounded-full text-primary">
                          <FileText className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-semibold text-sm">Quote #Q-2026-0{i}</p>
                          <p className="text-xs text-muted-foreground">Alice Johnson • $4,500.00</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="h-8 shadow-sm">View</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-indigo-100 shadow-md">
              <CardHeader className="bg-muted/30 pb-4 border-b">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" onClick={() => setIsEditing(false)} className="-ml-2 h-8 w-8">
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                  <div>
                    <CardTitle>Quote Editor</CardTitle>
                    <CardDescription>Edit details to update the live preview.</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6 pt-6 max-h-[600px] overflow-y-auto">
                <div className="space-y-4">
                  <h3 className="font-semibold text-sm">Client Details</h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Client Name</Label>
                      <Input value={clientName} onChange={(e) => setClientName(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label>Email</Label>
                      <Input value={clientEmail} onChange={(e) => setClientEmail(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label>Event Date</Label>
                      <Input value={eventDate} onChange={(e) => setEventDate(e.target.value)} />
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-sm">Line Items</h3>
                    <Button variant="outline" size="sm" onClick={addItem}>
                      <Plus className="h-3 w-3 mr-1" /> Add Item
                    </Button>
                  </div>
                  
                  <div className="space-y-3">
                    {items.map((item) => (
                      <div key={item.id} className="flex gap-2 items-start bg-muted/20 p-3 rounded-lg border">
                        <div className="flex-1 space-y-2">
                          <Input 
                            value={item.description} 
                            onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                            placeholder="Description"
                            className="h-8 text-sm"
                          />
                          <div className="flex gap-2">
                            <Input 
                              type="number" 
                              value={item.qty} 
                              onChange={(e) => updateItem(item.id, 'qty', parseInt(e.target.value) || 0)}
                              placeholder="Qty"
                              className="h-8 text-sm w-20"
                            />
                            <Input 
                              type="number" 
                              value={item.price} 
                              onChange={(e) => updateItem(item.id, 'price', parseFloat(e.target.value) || 0)}
                              placeholder="Price"
                              className="h-8 text-sm flex-1"
                            />
                          </div>
                        </div>
                        <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10" onClick={() => removeItem(item.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="bg-muted/30 border-t py-4">
                <Button className="w-full" onClick={() => toast.success("Quote saved successfully!")}>
                  Save Quote
                </Button>
              </CardFooter>
            </Card>
          )}
        </div>

        <div>
          <Card className="border-border/50 shadow-md h-full flex flex-col relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 flex gap-2 z-10">
              <Button size="sm" variant="outline" className="bg-background/80 backdrop-blur-sm" onClick={handleDownload}>
                <Download className="mr-2 h-4 w-4" /> PDF
              </Button>
              <Button size="sm" className="shadow-sm" onClick={() => toast.success("Quote sent to client!")}>
                <Send className="mr-2 h-4 w-4" /> Send
              </Button>
            </div>
            <CardHeader className="bg-muted/30 pb-10">
              <CardTitle>Quote Preview</CardTitle>
            </CardHeader>
            <CardContent className="p-0 flex-1 bg-muted/10">
              <div className="p-8 h-full">
                {/* ID quote-preview is used by html-to-image */}
                <div id="quote-preview" className="bg-white text-black p-8 shadow-sm border rounded-sm min-h-[500px]">
                  <div className="flex justify-between items-start mb-8">
                    <div>
                      <h2 className="text-2xl font-bold tracking-tighter text-slate-900">VENDORBOOK</h2>
                      <p className="text-slate-500 text-sm mt-1">Premium Events</p>
                    </div>
                    <div className="text-right">
                      <h3 className="text-xl font-bold text-slate-800">QUOTATION</h3>
                      <p className="text-sm font-medium text-slate-500 mt-1">#Q-{new Date().getFullYear()}-{Math.floor(Math.random() * 100).toString().padStart(2, '0')}</p>
                      <p className="text-sm text-slate-500">Date: {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric'})}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 text-sm">
                    <div>
                      <h4 className="font-bold text-slate-800 mb-2 border-b pb-1">From:</h4>
                      <p className="text-slate-600">Vendor Account<br/>contact@vendor.com<br/>+1 (555) 123-4567</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 mb-2 border-b pb-1">To:</h4>
                      <p className="text-slate-600">
                        {clientName || "Client Name"}<br/>
                        {clientEmail || "client@email.com"}<br/>
                        Event Date: {eventDate || "TBD"}
                      </p>
                    </div>
                  </div>

                  <div className="w-full overflow-x-auto mb-8">
                    <table className="w-full text-sm text-left">
                    <thead>
                      <tr className="border-b-2 border-slate-200">
                        <th className="pb-3 text-slate-800">Description</th>
                        <th className="pb-3 text-slate-800 text-right">Qty</th>
                        <th className="pb-3 text-slate-800 text-right">Price</th>
                        <th className="pb-3 text-slate-800 text-right">Total</th>
                      </tr>
                    </thead>
                    <tbody className="text-slate-600 border-b border-slate-200">
                      {items.map((item) => (
                        <tr key={item.id} className="border-b border-slate-100">
                          <td className="py-4 pr-2">{item.description || "-"}</td>
                          <td className="py-4 text-right">{item.qty}</td>
                          <td className="py-4 text-right">{formatCurrency(item.price)}</td>
                          <td className="py-4 text-right font-medium text-slate-800">{formatCurrency(item.qty * item.price)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  </div>

                  <div className="flex justify-end text-sm">
                    <div className="w-64 space-y-3">
                      <div className="flex justify-between text-slate-600">
                        <span>Subtotal:</span>
                        <span>{formatCurrency(subtotal)}</span>
                      </div>
                      <div className="flex justify-between text-slate-600">
                        <span>Tax (8%):</span>
                        <span>{formatCurrency(tax)}</span>
                      </div>
                      <Separator className="bg-slate-200" />
                      <div className="flex justify-between text-base font-bold text-slate-900">
                        <span>Total:</span>
                        <span>{formatCurrency(total)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-16 text-xs text-center text-slate-400">
                    <p>Thank you for your business. Quote is valid for 30 days.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
