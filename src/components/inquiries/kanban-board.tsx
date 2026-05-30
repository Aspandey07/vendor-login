"use client"

import React, { useState } from "react"
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Mail, Calendar, DollarSign, GripVertical } from "lucide-react"

import { updateInquiryStatus } from "@/lib/actions"
import { toast } from "sonner"

const columns = ["New", "Contacted", "Confirmed", "Rejected"]

export function KanbanBoard({ initialInquiries }: { initialInquiries: any[] }) {
  const [data, setData] = useState(() => {
    const grouped = {
      "New": [],
      "Contacted": [],
      "Confirmed": [],
      "Rejected": []
    } as Record<string, any[]>
    
    initialInquiries.forEach(inq => {
      const status = grouped[inq.status] ? inq.status : "New"
      grouped[status].push({
        id: inq.id,
        name: inq.customerName,
        event: inq.eventType,
        date: new Date(inq.eventDate).toLocaleDateString(),
        amount: inq.budget ? `$${inq.budget}` : 'N/A'
      })
    })
    return grouped
  })

  const onDragEnd = async (result: DropResult) => {
    if (!result.destination) return

    const { source, destination } = result
    
    if (source.droppableId !== destination.droppableId) {
      const sourceCol = [...data[source.droppableId as keyof typeof data]]
      const destCol = [...data[destination.droppableId as keyof typeof data]]
      const [removed] = sourceCol.splice(source.index, 1)
      destCol.splice(destination.index, 0, removed)

      // Optimistic update
      setData({
        ...data,
        [source.droppableId]: sourceCol,
        [destination.droppableId]: destCol
      })
      
      // Server update
      const res = await updateInquiryStatus(removed.id, destination.droppableId)
      if (!res.success) {
        toast.error("Failed to update status")
      }

    } else {
      const col = [...data[source.droppableId as keyof typeof data]]
      const [removed] = col.splice(source.index, 1)
      col.splice(destination.index, 0, removed)

      setData({
        ...data,
        [source.droppableId]: col
      })
    }
  }

  return (
    <div className="flex h-full gap-4 overflow-x-auto pb-4 pt-2">
      <DragDropContext onDragEnd={onDragEnd}>
        {columns.map((columnId) => (
          <div key={columnId} className="flex flex-col min-w-[300px] max-w-[300px] bg-muted/30 rounded-xl p-3 border border-border/50">
            <div className="flex items-center justify-between mb-4 px-1">
              <h3 className="font-semibold">{columnId}</h3>
              <Badge variant="secondary">{data[columnId as keyof typeof data].length}</Badge>
            </div>
            
            <Droppable droppableId={columnId}>
              {(provided, snapshot) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className={`flex-1 flex flex-col gap-3 min-h-[150px] transition-colors rounded-lg ${snapshot.isDraggingOver ? 'bg-muted/50' : ''}`}
                >
                  {data[columnId as keyof typeof data].map((item, index) => (
                    <Draggable key={item.id} draggableId={item.id} index={index}>
                      {(provided, snapshot) => (
                        <Card
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          className={`border-border/50 shadow-sm hover:shadow-md transition-shadow group ${snapshot.isDragging ? 'shadow-lg rotate-2 scale-105 z-50 ring-2 ring-primary/20' : ''}`}
                        >
                          <CardContent className="p-4 flex gap-3">
                            <div 
                              {...provided.dragHandleProps} 
                              className="mt-1 cursor-grab active:cursor-grabbing text-muted-foreground/50 hover:text-foreground transition-colors"
                            >
                              <GripVertical className="h-5 w-5" />
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between items-start mb-1">
                                <h4 className="font-semibold text-sm line-clamp-1">{item.name}</h4>
                                <span className="text-xs text-muted-foreground">{item.id}</span>
                              </div>
                              <p className="text-xs font-medium mb-3 text-indigo-600 dark:text-indigo-400">{item.event}</p>
                              
                              <div className="flex items-center justify-between text-xs text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <Calendar className="h-3 w-3" />
                                  <span>{new Date(item.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
                                </div>
                                <div className="flex items-center gap-1 font-medium text-emerald-600 dark:text-emerald-400">
                                  <DollarSign className="h-3 w-3" />
                                  <span>{item.amount.replace('$', '')}</span>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </DragDropContext>
    </div>
  )
}
