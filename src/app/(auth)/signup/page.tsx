import { SignupForm } from "@/components/forms/signup-form"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sign Up | VendorBook",
  description: "Create your user account",
}

export default function SignupPage() {
  return <SignupForm />
}
