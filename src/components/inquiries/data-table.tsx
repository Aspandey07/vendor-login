"use client"

import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Eye, Mail, CheckCircle, XCircle } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"

const initialInquiries = [
  { id: "INQ-001", name: "Alice Johnson", email: "alice@example.com", event: "Wedding", date: "2026-08-15", status: "New", amount: "$5,000" },
  { id: "INQ-002", name: "Bob Smith", email: "bob@example.com", event: "Corporate Party", date: "2026-07-20", status: "Confirmed", amount: "$2,500" },
  { id: "INQ-003", name: "Charlie Davis", email: "charlie@example.com", event: "Birthday", date: "2026-06-10", status: "Contacted", amount: "$800" },
  { id: "INQ-004", name: "Diana Prince", email: "diana@example.com", event: "Anniversary", date: "2026-09-05", status: "New", amount: "$1,200" },
  { id: "INQ-005", name: "Evan Wright", email: "evan@example.com", event: "Gala Dinner", date: "2026-11-12", status: "Rejected", amount: "$10,000" },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "New": return "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20"
    case "Contacted": return "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20"
    case "Confirmed": return "bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20"
    case "Rejected": return "bg-red-500/10 text-red-500 hover:bg-red-500/20"
    default: return "bg-gray-500/10 text-gray-500"
  }
}

export function InquiriesDataTable() {
  const [inquiries, setInquiries] = useState(initialInquiries)

  const updateStatus = (id: string, newStatus: string) => {
    setInquiries(inquiries.map(inquiry => 
      inquiry.id === id ? { ...inquiry, status: newStatus } : inquiry
    ))
    if (newStatus === "Confirmed") {
      toast.success(`Inquiry ${id} has been confirmed!`)
    } else if (newStatus === "Rejected") {
      toast.error(`Inquiry ${id} has been rejected.`)
    }
  }

  return (
    <div className="rounded-md border border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent bg-muted/30">
            <TableHead className="font-semibold text-foreground">Inquiry ID</TableHead>
            <TableHead className="font-semibold text-foreground">Customer</TableHead>
            <TableHead className="font-semibold text-foreground">Event Type</TableHead>
            <TableHead className="font-semibold text-foreground">Event Date</TableHead>
            <TableHead className="font-semibold text-foreground">Budget</TableHead>
            <TableHead className="font-semibold text-foreground">Status</TableHead>
            <TableHead className="text-right font-semibold text-foreground">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {inquiries.map((inquiry) => (
            <TableRow key={inquiry.id} className="transition-colors hover:bg-muted/50 cursor-default">
              <TableCell className="font-medium">{inquiry.id}</TableCell>
              <TableCell>
                <div className="flex flex-col">
                  <span className="font-medium">{inquiry.name}</span>
                  <span className="text-xs text-muted-foreground">{inquiry.email}</span>
                </div>
              </TableCell>
              <TableCell>{inquiry.event}</TableCell>
              <TableCell>{inquiry.date}</TableCell>
              <TableCell>{inquiry.amount}</TableCell>
              <TableCell>
                <Badge variant="secondary" className={`text-[10px] font-semibold px-2 py-0 ${getStatusColor(inquiry.status)}`}>
                  {inquiry.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger render={<Button variant="ghost" className="h-8 w-8 p-0" />}>
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[180px]">
                    <DropdownMenuItem render={<Link href={`/inquiries/${inquiry.id}`} className="w-full cursor-pointer" />}>
                      <Eye className="mr-2 h-4 w-4 text-primary" /> View details
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer" onClick={() => toast.info(`Email client opened for ${inquiry.email}`)}>
                      <Mail className="mr-2 h-4 w-4 text-blue-500" /> Email Customer
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer" onClick={() => updateStatus(inquiry.id, "Confirmed")}>
                      <CheckCircle className="mr-2 h-4 w-4 text-emerald-500" /> Mark Confirmed
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive" onClick={() => updateStatus(inquiry.id, "Rejected")}>
                      <XCircle className="mr-2 h-4 w-4" /> Reject
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
