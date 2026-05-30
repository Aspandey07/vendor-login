"use client"
import { useState } from "react"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { format } from "date-fns"
import { Badge } from "@/components/ui/badge"

type UserData = {
  id: string
  name: string
  email: string
  role: string
  createdAt: Date
}

export function UsersTable({ initialUsers }: { initialUsers: UserData[] }) {
  const [search, setSearch] = useState("")

  const filteredUsers = initialUsers.filter(user => 
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase()) ||
    user.role.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <Card className="shadow-md border-border/50">
      <CardContent className="p-0">
        <div className="p-4 border-b border-border/50 flex items-center gap-2">
          <Search className="w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Search users by name, email, or role..." 
            className="max-w-sm border-none shadow-none focus-visible:ring-0 px-0 h-8 bg-transparent"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Table>
          <TableHeader className="bg-muted/30">
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Joined Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="h-32 text-center text-muted-foreground">
                  No users found.
                </TableCell>
              </TableRow>
            ) : (
              filteredUsers.map((user) => (
                <TableRow key={user.id} className="group transition-colors hover:bg-muted/20">
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge variant={user.role === "ADMIN" ? "default" : "outline"} className="capitalize">
                      {user.role.toLowerCase()}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">
                    {format(new Date(user.createdAt), "MMM d, yyyy")}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
