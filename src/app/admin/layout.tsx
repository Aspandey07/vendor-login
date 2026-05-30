import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { TopNav } from "@/components/layout/top-nav"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <SidebarInset className="flex flex-col flex-1 overflow-hidden bg-slate-950 text-slate-50">
        <header className="flex h-16 items-center border-b border-slate-800 bg-slate-900 px-6">
          <div className="font-bold text-xl text-emerald-400">VendorBook Admin</div>
        </header>
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 bg-slate-950">
          <div className="mx-auto max-w-7xl w-full h-full">
            {children}
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
