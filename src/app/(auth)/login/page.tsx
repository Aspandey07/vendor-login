import { LoginForm } from "@/components/forms/login-form"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Login | VendorBook",
  description: "Login to your vendor dashboard",
}

export default function LoginPage() {
  return <LoginForm />
}
