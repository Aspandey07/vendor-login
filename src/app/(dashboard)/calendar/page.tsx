"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ChevronLeft, ChevronRight, Plus } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { toast } from "sonner"

export default function CalendarPage() {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  
  const [currentDate, setCurrentDate] = useState(new Date())
  const [events, setEvents] = useState([
    { id: 1, date: new Date(new Date().getFullYear(), new Date().getMonth(), 15), title: "Johnson Wedding", type: "Confirmed" },
    { id: 2, date: new Date(new Date().getFullYear(), new Date().getMonth(), 5), title: "Prince Anniversary", type: "Meeting" },
    { id: 3, date: new Date(), title: "Smith Party", type: "Follow-up" }
  ])
  
  const [isAddEventOpen, setIsAddEventOpen] = useState(false)
  const [newEventTitle, setNewEventTitle] = useState("")
  const [newEventDate, setNewEventDate] = useState("")
  const [newEventType, setNewEventType] = useState("Meeting")

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  // Navigation functions
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1))
  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1))

  // Calendar logic
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const firstDayOfMonth = new Date(year, month, 1).getDay()
  
  const emptyDays = Array.from({ length: firstDayOfMonth }, (_, i) => i)
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)
  
  const handleAddEvent = () => {
    if (!newEventTitle || !newEventDate) {
      toast.error("Please fill all fields")
      return
    }
    
    const [y, m, d] = newEventDate.split("-").map(Number)
    const newEvent = {
      id: Date.now(),
      date: new Date(y, m - 1, d),
      title: newEventTitle,
      type: newEventType
    }
    
    setEvents([...events, newEvent])
    setIsAddEventOpen(false)
    setNewEventTitle("")
    setNewEventDate("")
    toast.success("Event added successfully!")
  }

  const openAddEvent = (day?: number) => {
    if (day) {
      // Format date as YYYY-MM-DD for input
      const formattedDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
      setNewEventDate(formattedDate)
    } else {
      setNewEventDate("")
    }
    setIsAddEventOpen(true)
  }

  const upcomingEvents = [...events]
    .filter(e => e.date >= new Date(new Date().setHours(0,0,0,0))) // Only future or today
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .slice(0, 5)

  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Calendar</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage your event schedule, meetings, and deadlines.</p>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-2">
          <div className="flex items-center border border-border/50 rounded-md bg-background shadow-sm w-full sm:w-auto">
            <Button variant="ghost" size="icon" onClick={prevMonth} className="h-9 w-9 rounded-none rounded-l-md"><ChevronLeft className="h-4 w-4" /></Button>
            <span className="text-sm font-semibold px-4 min-w-[150px] text-center">
              {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </span>
            <Button variant="ghost" size="icon" onClick={nextMonth} className="h-9 w-9 rounded-none rounded-r-md"><ChevronRight className="h-4 w-4" /></Button>
          </div>
          
          <Dialog open={isAddEventOpen} onOpenChange={setIsAddEventOpen}>
            <DialogTrigger render={<Button className="shadow-md w-full sm:w-auto" onClick={() => openAddEvent()} />}>
              <Plus className="mr-2 h-4 w-4" /> Add Event
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Event</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label>Event Title</Label>
                  <Input value={newEventTitle} onChange={(e) => setNewEventTitle(e.target.value)} placeholder="e.g., Client Meeting" />
                </div>
                <div className="space-y-2">
                  <Label>Date</Label>
                  <Input type="date" value={newEventDate} onChange={(e) => setNewEventDate(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Type</Label>
                  <select 
                    className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    value={newEventType} 
                    onChange={(e) => setNewEventType(e.target.value)}
                  >
                    <option value="Meeting">Meeting</option>
                    <option value="Confirmed">Confirmed Booking</option>
                    <option value="Follow-up">Follow-up</option>
                  </select>
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleAddEvent}>Save Event</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <Card className="border-border/50 shadow-sm overflow-hidden">
            <div className="grid grid-cols-7 border-b border-border/50 bg-muted/30">
              {daysOfWeek.map(day => (
                <div key={day} className="py-3 text-center text-xs font-semibold text-muted-foreground uppercase tracking-wider border-r border-border/50 last:border-r-0">
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 auto-rows-[120px] bg-card">
              {emptyDays.map((_, i) => (
                <div key={`empty-${i}`} className="border-r border-b border-border/30 p-2 text-muted-foreground/30 text-sm font-medium bg-muted/10 pointer-events-none">
                </div>
              ))}
              {days.map(day => {
                const dayEvents = events.filter(e => e.date.getDate() === day && e.date.getMonth() === month && e.date.getFullYear() === year)
                const isToday = new Date().getDate() === day && new Date().getMonth() === month && new Date().getFullYear() === year
                
                return (
                  <div 
                    key={`day-${day}`} 
                    onClick={() => openAddEvent(day)}
                    className={`border-r border-b border-border/30 p-2 hover:bg-muted/10 transition-colors cursor-pointer group flex flex-col gap-1 relative ${isToday ? 'bg-primary/5' : ''}`}
                  >
                    <span className={`text-sm font-medium inline-flex h-6 w-6 items-center justify-center rounded-full ${isToday ? 'bg-primary text-primary-foreground shadow-sm' : 'text-foreground group-hover:text-primary'}`}>
                      {day}
                    </span>
                    <div className="flex flex-col gap-1 mt-1 overflow-y-auto max-h-[80px] no-scrollbar">
                      {dayEvents.map(event => (
                        <div key={event.id} className={`text-[10px] font-semibold px-1.5 py-1 rounded-sm truncate ${event.type === 'Confirmed' ? 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20' : event.type === 'Meeting' ? 'bg-blue-500/10 text-blue-600 border border-blue-500/20' : 'bg-amber-500/10 text-amber-600 border border-amber-500/20'}`}>
                          {event.title}
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}
              {/* Fill remaining cells */}
              {Array.from({ length: (7 - ((emptyDays.length + days.length) % 7)) % 7 }).map((_, i) => (
                <div key={`fill-${i}`} className="border-r border-b border-border/30 p-2 text-muted-foreground/30 text-sm font-medium bg-muted/10 pointer-events-none">
                </div>
              ))}
            </div>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card className="border-border/50 shadow-sm">
            <CardHeader>
              <CardTitle>Upcoming</CardTitle>
              <CardDescription>Your scheduled events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingEvents.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-4">No upcoming events.</p>
                ) : (
                  upcomingEvents.map(event => (
                    <div key={event.id} className="flex items-start gap-3">
                      <div className={`h-10 w-10 rounded-lg flex flex-col items-center justify-center shrink-0 border ${event.type === 'Confirmed' ? 'bg-emerald-500/10 border-emerald-500/20' : event.type === 'Meeting' ? 'bg-blue-500/10 border-blue-500/20' : 'bg-amber-500/10 border-amber-500/20'}`}>
                        <span className={`text-[10px] font-bold uppercase leading-none ${event.type === 'Confirmed' ? 'text-emerald-500' : event.type === 'Meeting' ? 'text-blue-500' : 'text-amber-500'}`}>
                          {event.date.toLocaleDateString('en-US', { month: 'short' })}
                        </span>
                        <span className={`text-sm font-bold leading-none mt-1 ${event.type === 'Confirmed' ? 'text-emerald-600' : event.type === 'Meeting' ? 'text-blue-600' : 'text-amber-600'}`}>
                          {event.date.getDate()}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold">{event.title}</span>
                        <span className="text-xs text-muted-foreground">{event.type}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
