import Image from "next/image"

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background">
      {/* Dynamic Background Image */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/login-bg.png" 
          alt="Background" 
          fill 
          className="object-cover object-center opacity-60 dark:opacity-30"
          priority
        />
        <div className="absolute inset-0 bg-background/50 backdrop-blur-[60px]" />
        
        {/* Additional vibrant blobs for dynamic feel */}
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-500/20 blur-[120px] animate-pulse" />
        <div className="absolute top-[60%] -right-[10%] w-[40%] h-[50%] rounded-full bg-purple-500/20 blur-[100px] animate-pulse" style={{ animationDelay: "2s" }} />
      </div>
      
      <div className="relative z-10 w-full p-4 flex justify-center">
        {children}
      </div>
    </div>
  )
}
