"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { requestPasswordReset } from "@/lib/actions"
import { toast } from "sonner"
import Link from "next/link"
import { Loader2, ArrowLeft } from "lucide-react"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return toast.error("Please enter your email")

    setIsLoading(true)
    const res = await requestPasswordReset(email)
    setIsLoading(false)

    if (res.success) {
      setSubmitted(true)
    } else {
      toast.error("Failed to process request. Please try again.")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg border-border/50 animate-in fade-in zoom-in-95 duration-500">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold tracking-tight text-center">Reset Password</CardTitle>
          <CardDescription className="text-center">
            {submitted 
              ? "Check your email for a reset link" 
              : "Enter your email to receive a password reset link"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {submitted ? (
            <div className="flex flex-col space-y-4">
              <div className="bg-muted/30 p-4 rounded-md text-sm text-center text-muted-foreground border">
                If an account exists for {email}, you will receive a reset link shortly. (Check server console for dummy link).
              </div>
              <Link href="/login" className="w-full block">
                <Button variant="outline" className="w-full">
                  Return to Login
                </Button>
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="name@example.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Send Reset Link
              </Button>
            </form>
          )}
        </CardContent>
        {!submitted && (
          <CardFooter className="flex justify-center border-t p-4 bg-muted/20">
            <Link href="/login" className="text-sm text-primary hover:underline flex items-center">
              <ArrowLeft className="mr-1 h-3 w-3" /> Back to Login
            </Link>
          </CardFooter>
        )}
      </Card>
    </div>
  )
}
