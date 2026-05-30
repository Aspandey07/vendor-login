"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "sonner"
import { updateVendorSettings, updateVendorPassword } from "@/lib/actions"
import { useRouter } from "next/navigation"

export default function SettingsClient({ initialData, userId }: { initialData?: any, userId: string }) {
  const router = useRouter()
  
  const socialLinks = initialData?.socialLinks || {}
  
  const [companyName, setCompanyName] = useState(initialData?.name || "Premium Events LLC")
  const [website, setWebsite] = useState(socialLinks.website || "https://premiumevents.example.com")
  
  const [notifyNewInquiry, setNotifyNewInquiry] = useState(socialLinks.notifyNewInquiry !== false)
  const [notifyBooking, setNotifyBooking] = useState(socialLinks.notifyBooking !== false)
  
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")

  const handleSaveGeneral = async () => {
    const res = await updateVendorSettings(userId, {
      name: companyName,
      website: website,
      notifyNewInquiry,
      notifyBooking
    })
    
    if (res.success) {
      toast.success("Business information updated successfully!")
      router.refresh()
    } else {
      toast.error("Failed to update information.")
    }
  }
  
  const handleUpdatePassword = async () => {
    if (!currentPassword || !newPassword) {
      toast.error("Please enter both current and new passwords")
      return
    }
    const res = await updateVendorPassword(userId, currentPassword, newPassword)
    if (res.success) {
      toast.success("Password updated successfully!")
      setCurrentPassword("")
      setNewPassword("")
    } else {
      toast.error(res.error || "Failed to update password")
    }
  }

  const handleNotificationToggle = async (type: "newInquiry" | "booking", value: boolean) => {
    if (type === "newInquiry") setNotifyNewInquiry(value)
    if (type === "booking") setNotifyBooking(value)
    
    const res = await updateVendorSettings(userId, {
      name: companyName,
      website: website,
      notifyNewInquiry: type === "newInquiry" ? value : notifyNewInquiry,
      notifyBooking: type === "booking" ? value : notifyBooking
    })
    
    if (res.success) {
      toast.success("Notification preferences updated")
    } else {
      toast.error("Failed to update preferences")
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences.
        </p>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>
        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Business Information</CardTitle>
              <CardDescription>
                Update your business details that appear on invoices and quotes.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <Label htmlFor="company">Company Name</Label>
                <Input id="company" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
              </div>
              <div className="space-y-1">
                <Label htmlFor="website">Website</Label>
                <Input id="website" value={website} onChange={(e) => setWebsite(e.target.value)} />
              </div>
              <Button onClick={handleSaveGeneral}>Save changes</Button>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Choose what you want to be notified about.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="new-inquiry" className="flex flex-col space-y-1">
                  <span>New Inquiries</span>
                  <span className="font-normal text-sm text-muted-foreground">Receive emails when a new inquiry is submitted.</span>
                </Label>
                <Switch id="new-inquiry" checked={notifyNewInquiry} onCheckedChange={(c) => handleNotificationToggle("newInquiry", c)} />
              </div>
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="booking-confirm" className="flex flex-col space-y-1">
                  <span>Booking Confirmations</span>
                  <span className="font-normal text-sm text-muted-foreground">Receive emails when an event is confirmed.</span>
                </Label>
                <Switch id="booking-confirm" checked={notifyBooking} onCheckedChange={(c) => handleNotificationToggle("booking", c)} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Manage your password and security options.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="current-password" type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
              </div>
              <div className="space-y-1">
                <Label htmlFor="new-password">New Password</Label>
                <Input id="new-password" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
              </div>
              <Button variant="outline" onClick={handleUpdatePassword}>Update password</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
