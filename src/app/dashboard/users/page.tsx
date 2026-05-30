import { prisma } from "@/lib/prisma"
import { UsersTable } from "@/components/dashboard/users-table"

export const metadata = {
  title: "Registered Users | VendorBook Admin",
}

export default async function UsersPage() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" }
  })

  // Exclude password hashes before passing to client component
  const safeUsers = users.map(user => ({
    id: user.id,
    name: user.name || "N/A",
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
  }))

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Registered Users</h1>
          <p className="text-muted-foreground mt-1">
            View and manage all registered users and customers on the platform.
          </p>
        </div>
      </div>
      
      <UsersTable initialUsers={safeUsers} />
    </div>
  )
}
