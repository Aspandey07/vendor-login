import { auth } from "@/lib/auth"
import { getVendorProfile } from "@/lib/actions"
import { redirect } from "next/navigation"
import SettingsClient from "./settings-client"

export default async function SettingsPage() {
  const session = await auth()
  if (!session?.user?.id) redirect("/login")
  
  const vendor = await getVendorProfile(session.user.id)
  
  return <SettingsClient initialData={vendor} userId={session.user.id} />
}
