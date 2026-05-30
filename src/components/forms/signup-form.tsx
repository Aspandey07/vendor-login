"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { UserPlus, Loader2 } from "lucide-react"
import Link from "next/link"

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

export function SignupForm() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", password: "" },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      })
      
      const data = await res.json()

      if (!res.ok) {
        toast.error(data.error || "Failed to sign up")
      } else {
        toast.success("Account created successfully! Please log in.")
        router.push("/login")
      }
    } catch (error) {
      toast.error("Something went wrong.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md shadow-2xl border-border/40 backdrop-blur-sm bg-card/95 animate-in zoom-in-95 duration-500">
      <CardHeader className="space-y-2 text-center pb-6">
        <div className="mx-auto bg-primary/10 text-primary p-3 rounded-2xl w-fit mb-2 ring-1 ring-primary/20">
          <UserPlus className="w-6 h-6" />
        </div>
        <CardTitle className="text-2xl font-bold tracking-tight">Create an Account</CardTitle>
        <CardDescription className="text-sm">
          Join VendorBook to explore and book top event professionals.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" className="bg-muted/50" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="you@example.com" className="bg-muted/50" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" className="bg-muted/50" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full mt-2 font-medium" disabled={isLoading}>
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Sign Up"}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-center border-t p-4 mt-2">
        <p className="text-sm text-muted-foreground">
          Already have an account? <Link href="/login" className="text-primary hover:underline font-medium">Log in</Link>
        </p>
      </CardFooter>
    </Card>
  )
}
