import { ProfileForm } from "@/components/forms/profile-form"
import Image from "next/image"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function ProfilePage() {
  return (
    <div className="space-y-6 max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div>
        <h3 className="text-2xl font-bold tracking-tight">Profile Settings</h3>
        <p className="text-muted-foreground text-sm">
          Manage your public vendor profile and contact information.
        </p>
      </div>
      <Separator />

      {/* Dynamic Profile Banner */}
      <div className="relative w-full h-48 rounded-xl overflow-hidden shadow-lg border border-border/50 group">
        <Image 
          src="/profile-banner.png" 
          alt="Profile Banner" 
          fill 
          className="object-cover group-hover:scale-105 transition-transform duration-700" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-4 flex items-center space-x-4">
          <div className="w-16 h-16 rounded-full border-2 border-white overflow-hidden bg-background">
             <img src="https://api.dicebear.com/7.x/notionists/svg?seed=vendor" alt="Vendor" width="64" height="64" className="w-full h-full object-cover" />
          </div>
          <div className="text-white">
            <h4 className="font-bold text-xl drop-shadow-md">Premium Vendor</h4>
            <p className="text-sm opacity-90 drop-shadow-md">Professional Event Services</p>
          </div>
        </div>
      </div>
      
      <Card className="border-border/50 shadow-sm mt-8">
        <CardHeader>
          <CardTitle>Public Information</CardTitle>
          <CardDescription>
            This information will be displayed publicly so customers can reach you.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ProfileForm />
        </CardContent>
      </Card>
    </div>
  )
}
