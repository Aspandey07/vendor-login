"use client"

import { useState, Suspense } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { resetPassword } from "@/lib/actions"
import { toast } from "sonner"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Loader2 } from "lucide-react"

function ResetPasswordForm() {
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get("token")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!token) {
      return toast.error("Invalid or missing reset token.")
    }
    
    if (newPassword !== confirmPassword) {
      return toast.error("Passwords do not match")
    }
    
    if (newPassword.length < 6) {
      return toast.error("Password must be at least 6 characters")
    }

    setIsLoading(true)
    const res = await resetPassword(token, newPassword)
    setIsLoading(false)

    if (res.success) {
      toast.success("Password reset successfully. You can now login.")
      router.push("/login")
    } else {
      toast.error(res.error || "Failed to reset password.")
    }
  }

  if (!token) {
    return (
      <CardContent>
        <div className="text-center text-destructive py-4">
          Invalid or missing reset token. Please request a new link.
        </div>
        <Link href="/forgot-password" className="w-full mt-4 block">
          <Button className="w-full">Request Reset Link</Button>
        </Link>
      </CardContent>
    )
  }

  return (
    <CardContent>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="new-password">New Password</Label>
          <Input 
            id="new-password" 
            type="password" 
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            disabled={isLoading}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirm-password">Confirm Password</Label>
          <Input 
            id="confirm-password" 
            type="password" 
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={isLoading}
            required
          />
        </div>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Reset Password
        </Button>
      </form>
    </CardContent>
  )
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg border-border/50 animate-in fade-in zoom-in-95 duration-500">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold tracking-tight text-center">Create New Password</CardTitle>
          <CardDescription className="text-center">
            Please enter your new password below.
          </CardDescription>
        </CardHeader>
        <Suspense fallback={<CardContent><div className="flex justify-center py-4"><Loader2 className="animate-spin text-muted-foreground" /></div></CardContent>}>
          <ResetPasswordForm />
        </Suspense>
      </Card>
    </div>
  )
}
