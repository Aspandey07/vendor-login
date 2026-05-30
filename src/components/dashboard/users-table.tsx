
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
import { Search, MoreHorizontal, ShieldAlert, ShieldCheck, Trash } from "lucide-react"
import { format } from "date-fns"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { toast } from "sonner"
import { deleteUser, updateUserRole } from "@/lib/actions"

type UserData = {
  id: string
  name: string
  email: string
  role: string
  createdAt: Date
}

export function UsersTable({ initialUsers }: { initialUsers: UserData[] }) {
  const [search, setSearch] = useState("")
  const [users, setUsers] = useState(initialUsers)

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase()) ||
    user.role.toLowerCase().includes(search.toLowerCase())
  )

  const handleDelete = async (id: string, email: string) => {
    if(email === "admin@vendor.com") {
        toast.error("Cannot delete the primary admin account")
        return;
    }
    
    if(!confirm("Are you sure you want to delete this user?")) return;
    
    setUsers(users.filter(u => u.id !== id))
    const res = await deleteUser(id)
    if(res.success) toast.success("User deleted successfully")
    else toast.error("Failed to delete user")
  }
  
  const handleRoleChange = async (id: string, newRole: string, email: string) => {
    if(email === "admin@vendor.com") {
        toast.error("Cannot change the primary admin account role")
        return;
    }
    
    setUsers(users.map(u => u.id === id ? { ...u, role: newRole } : u))
    const res = await updateUserRole(id, newRole)
    if(res.success) toast.success(`User role updated to ${newRole}`)
    else toast.error("Failed to update user role")
  }

  return (
    <Card className="shadow-md border-border/50 min-w-0 w-full overflow-hidden">
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
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-32 text-center text-muted-foreground">
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
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger render={
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      } />
                      <DropdownMenuContent align="end" className="w-[160px]">
                        {user.role === "USER" ? (
                            <DropdownMenuItem className="cursor-pointer" onClick={() => handleRoleChange(user.id, "ADMIN", user.email)}>
                                <ShieldCheck className="mr-2 h-4 w-4 text-emerald-500" /> Make Admin
                            </DropdownMenuItem>
                        ) : (
                            <DropdownMenuItem className="cursor-pointer" onClick={() => handleRoleChange(user.id, "USER", user.email)}>
                                <ShieldAlert className="mr-2 h-4 w-4 text-orange-500" /> Revoke Admin
                            </DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10" onClick={() => handleDelete(user.id, user.email)}>
                          <Trash className="mr-2 h-4 w-4" /> Delete User
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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

