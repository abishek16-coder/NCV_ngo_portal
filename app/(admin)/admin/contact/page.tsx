"use client"

import { useEffect, useState, useCallback } from "react"
import { format } from "date-fns"
import { MessageSquare, Mail, Trash2, Eye, EyeOff } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table"
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
} from "@/components/ui/dialog"

interface Message {
  id: string; name: string; email: string; phone: string | null
  subject: string | null; message: string; isRead: boolean; createdAt: string
}

export default function AdminContactPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<string>("all")
  const [detailTarget, setDetailTarget] = useState<Message | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<Message | null>(null)
  const unreadCount = messages.filter((m) => !m.isRead).length

  const fetchMessages = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({ limit: "50" })
      if (filter !== "all") params.set("isRead", filter)
      const res = await fetch(`/api/contact?${params}`)
      const data = await res.json()
      if (data.success) setMessages(data.data)
    } catch { toast.error("Failed to load") }
    finally { setLoading(false) }
  }, [filter])

  useEffect(() => { fetchMessages() }, [fetchMessages])

  const markRead = async (id: string) => {
    try {
      await fetch(`/api/contact/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ isRead: true }) })
      setMessages((prev) => prev.map((m) => m.id === id ? { ...m, isRead: true } : m))
    } catch {}
  }

  const handleDelete = async () => {
    if (!deleteTarget) return
    try {
      const res = await fetch(`/api/contact/${deleteTarget.id}`, { method: "DELETE" })
      const data = await res.json()
      if (data.success) { toast.success("Deleted"); setDeleteTarget(null); fetchMessages() }
    } catch { toast.error("Failed") }
  }

  const openDetail = (m: Message) => {
    setDetailTarget(m)
    if (!m.isRead) markRead(m.id)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Contact Messages</h2>
        <p className="text-sm text-muted-foreground">Messages from the contact form</p>
      </div>

      <div className="flex items-center gap-3">
        {[
          { value: "all", label: "All" },
          { value: "false", label: `Unread (${unreadCount})` },
          { value: "true", label: "Read" },
        ].map((f) => (
          <Button key={f.value} variant={filter === f.value ? "default" : "outline"} size="sm" onClick={() => setFilter(f.value)}>
            {f.label}
          </Button>
        ))}
      </div>

      {loading ? (
        <Card><CardContent className="space-y-3 py-6">{Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-12 w-full" />)}</CardContent></Card>
      ) : messages.length === 0 ? (
        <Card><CardContent className="flex flex-col items-center justify-center py-12">
          <MessageSquare className="mb-4 size-12 text-muted-foreground/50" />
          <p className="font-medium">No messages</p>
        </CardContent></Card>
      ) : (
        <Card><CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-8" />
                <TableHead>From</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {messages.map((m) => (
                <TableRow key={m.id} className={!m.isRead ? "bg-blue-50/50 dark:bg-blue-950/10" : ""}>
                  <TableCell>{!m.isRead && <span className="size-2 rounded-full bg-blue-500 inline-block" />}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium text-sm">{m.name}</p>
                      <p className="text-xs text-muted-foreground">{m.email}</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm max-w-[200px] truncate">{m.subject || m.message.slice(0, 60)}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{format(new Date(m.createdAt), "MMM d, yyyy")}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="icon-sm" onClick={() => openDetail(m)}><Eye className="size-4" /></Button>
                      <Button variant="ghost" size="icon-sm" onClick={() => setDeleteTarget(m)}><Trash2 className="size-4 text-destructive" /></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent></Card>
      )}

      <Dialog open={!!detailTarget} onOpenChange={(open) => { if (!open) setDetailTarget(null) }}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>{detailTarget?.subject || "Message"}</DialogTitle></DialogHeader>
          {detailTarget && (
            <div className="space-y-4 py-2">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-full bg-slate-100 text-sm font-bold text-slate-600">
                  {detailTarget.name[0]}
                </div>
                <div>
                  <p className="font-medium text-sm">{detailTarget.name}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1"><Mail className="size-3" /> {detailTarget.email}</p>
                  {detailTarget.phone && <p className="text-xs text-muted-foreground">{detailTarget.phone}</p>}
                </div>
              </div>
              <div className="rounded-lg border bg-slate-50 p-4">
                <p className="text-sm whitespace-pre-wrap">{detailTarget.message}</p>
              </div>
              <p className="text-xs text-muted-foreground">{format(new Date(detailTarget.createdAt), "MMMM d, yyyy 'at' h:mm a")}</p>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setDetailTarget(null)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!deleteTarget} onOpenChange={(open) => { if (!open) setDeleteTarget(null) }}>
        <DialogContent>
          <DialogHeader><DialogTitle>Delete Message</DialogTitle><DialogDescription>Are you sure? This cannot be undone.</DialogDescription></DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteTarget(null)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDelete}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
