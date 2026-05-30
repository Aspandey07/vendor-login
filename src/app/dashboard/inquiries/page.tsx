import { InquiriesDataTable } from "@/components/inquiries/data-table"
import { KanbanBoard } from "@/components/inquiries/kanban-board"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Filter, Plus, List, LayoutGrid } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function InquiriesPage() {
  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Inquiries</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage and track your event booking inquiries.</p>
        </div>
        <Button className="w-full sm:w-auto shadow-md">
          <Plus className="mr-2 h-4 w-4" /> Create Inquiry
        </Button>
      </div>

      <Tabs defaultValue="list" className="w-full">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
          <div className="relative w-full max-w-sm group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
            <Input type="search" placeholder="Search inquiries..." className="w-full pl-10 bg-background/50 backdrop-blur-sm border-border/50 focus-visible:ring-1 focus-visible:ring-primary shadow-sm h-10 transition-all" />
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <TabsList className="bg-background/50 backdrop-blur-sm border border-border/50 shadow-sm">
              <TabsTrigger value="list" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"><List className="h-4 w-4 mr-2" /> List</TabsTrigger>
              <TabsTrigger value="kanban" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"><LayoutGrid className="h-4 w-4 mr-2" /> Kanban</TabsTrigger>
            </TabsList>
            <Button variant="outline" className="w-full sm:w-auto bg-background/50 backdrop-blur-sm border-border/50">
              <Filter className="mr-2 h-4 w-4" /> Filter
            </Button>
          </div>
        </div>

        <TabsContent value="list" className="mt-0 border-none p-0 outline-none">
          <InquiriesDataTable />
        </TabsContent>
        <TabsContent value="kanban" className="mt-0 border-none p-0 outline-none h-[calc(100vh-280px)] min-h-[500px]">
          <KanbanBoard />
        </TabsContent>
      </Tabs>
    </div>
  )
}
