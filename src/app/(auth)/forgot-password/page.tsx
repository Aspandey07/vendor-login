"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { requestPasswordReset, verifyOTP, resetPasswordWithOTP } from "@/lib/actions"
import { toast } from "sonner"
import Link from "next/link"
import { Loader2, ArrowLeft, Mail, KeyRound, Lock } from "lucide-react"
import { useRouter } from "next/navigation"

export default function ForgotPasswordPage() {
  const router = useRouter()
  const [step, setStep] = useState<"email" | "otp" | "password">("email")
  
  const [email, setEmail] = useState("")
  const [otp, setOtp] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  
  const [isLoading, setIsLoading] = useState(false)

  const handleRequestOTP = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return toast.error("Please enter your email")

    setIsLoading(true)
    const res = await requestPasswordReset(email)
    setIsLoading(false)

    if (res.success) {
      toast.success("OTP sent to your email!")
      setStep("otp")
    } else {
      toast.error("Failed to process request. Please try again.")
    }
  }

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!otp || otp.length !== 6) return toast.error("Please enter a valid 6-digit OTP")

    setIsLoading(true)
    const res = await verifyOTP(email, otp)
    setIsLoading(false)

    if (res.success) {
      toast.success("OTP Verified!")
      setStep("password")
    } else {
      toast.error(res.error || "Invalid OTP. Please try again.")
    }
  }

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    if (newPassword !== confirmPassword) {
      return toast.error("Passwords do not match")
    }
    if (newPassword.length < 6) {
      return toast.error("Password must be at least 6 characters")
    }

    setIsLoading(true)
    const res = await resetPasswordWithOTP(email, otp, newPassword)
    setIsLoading(false)

    if (res.success) {
      toast.success("Password reset successfully!")
      router.push("/login")
    } else {
      toast.error(res.error || "Failed to reset password")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg border-border/50 animate-in fade-in zoom-in-95 duration-500">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold tracking-tight text-center">
            {step === "email" && "Reset Password"}
            {step === "otp" && "Enter OTP"}
            {step === "password" && "Create New Password"}
          </CardTitle>
          <CardDescription className="text-center">
            {step === "email" && "Enter your email to receive a 6-digit OTP"}
            {step === "otp" && `We sent a 6-digit code to ${email}`}
            {step === "password" && "Please enter your new secure password"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          
          {step === "email" && (
            <form onSubmit={handleRequestOTP} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="name@example.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    disabled={isLoading}
                    required
                  />
                </div>
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Send OTP
              </Button>
            </form>
          )}

          {step === "otp" && (
            <form onSubmit={handleVerifyOTP} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="otp">6-Digit OTP</Label>
                <div className="relative">
                  <KeyRound className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  <Input 
                    id="otp" 
                    type="text" 
                    placeholder="123456" 
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="pl-10 tracking-[0.5em] text-center font-bold text-lg"
                    disabled={isLoading}
                    required
                  />
                </div>
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Verify OTP
              </Button>
              <div className="text-center mt-2">
                <button 
                  type="button" 
                  onClick={() => setStep("email")}
                  className="text-sm text-muted-foreground hover:text-primary underline"
                >
                  Change Email
                </button>
              </div>
            </form>
          )}

          {step === "password" && (
            <form onSubmit={handleResetPassword} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  <Input 
                    id="newPassword" 
                    type="password" 
                    placeholder="••••••••" 
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="pl-10"
                    disabled={isLoading}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  <Input 
                    id="confirmPassword" 
                    type="password" 
                    placeholder="••••••••" 
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="pl-10"
                    disabled={isLoading}
                    required
                  />
                </div>
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Reset Password
              </Button>
            </form>
          )}

        </CardContent>
        {step === "email" && (
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
