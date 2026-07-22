"use client"

import { useEffect, useState, useCallback, useRef } from "react"
import { format } from "date-fns"
import { Plus, Pencil, Trash2, Calendar, Users, Eye, Mail, Phone, MapPin } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Skeleton } from "@/components/ui/skeleton"
import { Textarea } from "@/components/ui/textarea"
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table"
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"

interface Event {
  id: string
  title: string
  slug: string
  description: string
  eventDate: string
  venue: string | null
  city: string | null
  status: "UPCOMING" | "ONGOING" | "COMPLETED" | "CANCELLED"
  maxAttendees: number | null
  isFeatured: boolean
  createdAt: string
  _count: { registrations: number }
}

interface Registration {
  id: string; firstName: string; lastName: string; email: string
  phone: string | null; city: string | null; organization: string | null
  status: string; notes: string | null; createdAt: string
}

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
}

function StatusBadge({ status }: { status: Event["status"] }) {
  const colors: Record<Event["status"], string> = {
    UPCOMING: "bg-amber-500/10 text-amber-700 border-amber-500/20 dark:text-amber-400",
    ONGOING: "bg-green-500/10 text-green-700 border-green-500/20 dark:text-green-400",
    COMPLETED: "bg-blue-500/10 text-blue-700 border-blue-500/20 dark:text-blue-400",
    CANCELLED: "bg-red-500/10 text-red-700 border-red-500/20 dark:text-red-400",
  }
  return <Badge variant="outline" className={colors[status]}>{status}</Badge>
}

export default function AdminEventsPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [createOpen, setCreateOpen] = useState(false)
  const [editTarget, setEditTarget] = useState<Event | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<Event | null>(null)
  const [registrationsTarget, setRegistrationsTarget] = useState<Event | null>(null)
  const [registrations, setRegistrations] = useState<Registration[]>([])
  const [regLoading, setRegLoading] = useState(false)
  const [form, setForm] = useState({ title: "", slug: "", description: "", eventDate: "", venue: "", city: "", maxAttendees: "", status: "UPCOMING" as Event["status"], isFeatured: false })
  const [coverFile, setCoverFile] = useState<File | null>(null)
  const [coverPreview, setCoverPreview] = useState<string | null>(null)
  const slugEdited = useRef(false)
  const [saving, setSaving] = useState(false)

  const fetchEvents = useCallback(async () => {
    try {
      const res = await fetch("/api/events?limit=100")
      const data = await res.json()
      if (data.success) setEvents(data.data)
    } catch { toast.error("Failed to load events") }
    finally { setLoading(false) }
  }, [])

  useEffect(() => { fetchEvents() }, [fetchEvents])

  const openRegistrations = async (e: Event) => {
    setRegistrationsTarget(e)
    setRegLoading(true)
    try {
      const res = await fetch(`/api/events/${e.slug}/registrations`)
      const data = await res.json()
      if (data.success) setRegistrations(data.data)
    } catch { toast.error("Failed to load registrations") }
    finally { setRegLoading(false) }
  }

  const resetForm = () => {
    setForm({ title: "", slug: "", description: "", eventDate: "", venue: "", city: "", maxAttendees: "", status: "UPCOMING", isFeatured: false })
    slugEdited.current = false
    setCoverFile(null)
    setCoverPreview(null)
  }

  const handleSave = async () => {
    if (!form.title.trim() || !form.slug.trim() || !form.description.trim() || !form.eventDate) {
      toast.error("Title, slug, description, and date are required")
      return
    }
    setSaving(true)
    try {
      let coverImageUrl: string | undefined
      if (coverFile) {
        const fd = new FormData()
        fd.append("file", coverFile)
        const uploadRes = await fetch("/api/upload", { method: "POST", body: fd })
        const uploadData = await uploadRes.json()
        if (!uploadData.success) { toast.error(uploadData.error || "Upload failed"); setSaving(false); return }
        coverImageUrl = uploadData.data.url
      }
      const payload = {
        ...form,
        maxAttendees: form.maxAttendees ? parseInt(form.maxAttendees) : undefined,
        ...(coverImageUrl && { coverImageUrl }),
      }
      const url = editTarget ? `/api/events/${editTarget.slug}` : "/api/events"
      const res = await fetch(url, {
        method: editTarget ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (data.success) {
        toast.success(editTarget ? "Event updated" : "Event created")
        setCreateOpen(false)
        setEditTarget(null)
        resetForm()
        fetchEvents()
      } else { toast.error(data.error || "Failed to save") }
    } catch { toast.error("Failed to save event") }
    finally { setSaving(false) }
  }

  const handleDelete = async () => {
    if (!deleteTarget) return
    try {
      const res = await fetch(`/api/events/${deleteTarget.slug}`, { method: "DELETE" })
      const data = await res.json()
      if (data.success) { toast.success("Event deleted"); setDeleteTarget(null); fetchEvents() }
      else { toast.error(data.error) }
    } catch { toast.error("Failed to delete") }
  }

  const openEdit = (e: Event) => {
    setForm({
      title: e.title, slug: e.slug, description: e.description,
      eventDate: e.eventDate.split("T")[0], venue: e.venue || "", city: e.city || "",
      maxAttendees: e.maxAttendees?.toString() || "", status: e.status, isFeatured: e.isFeatured,
    })
    slugEdited.current = true
    setEditTarget(e)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Events</h2>
          <p className="text-sm text-muted-foreground">Manage events and workshops</p>
        </div>
        <Dialog open={createOpen || !!editTarget} onOpenChange={(open) => { if (!open) { setCreateOpen(false); setEditTarget(null); resetForm() } }}>
          <DialogTrigger render={<Button onClick={() => { resetForm(); setCreateOpen(true) }} />}>
            <Plus className="size-4" /> New Event
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editTarget ? "Edit Event" : "Create Event"}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-2 max-h-[60vh] overflow-y-auto pr-2">
              <div className="space-y-2">
                <Label>Title</Label>
                <Input value={form.title} onChange={(e) => {
                  const v = e.target.value
                  setForm(f => ({ ...f, title: v, slug: slugEdited.current ? f.slug : slugify(v) }))
                }} />
              </div>
              <div className="space-y-2">
                <Label>Slug</Label>
                <Input value={form.slug} onChange={(e) => { slugEdited.current = true; setForm({ ...form, slug: e.target.value }) }} />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} />
              </div>
              <div className="space-y-2">
                <Label>Cover Image</Label>
                <input
                  type="file"
                  accept="image/*"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm file:mr-3 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground"
                  onChange={(e) => {
                    const f = e.target.files?.[0] || null
                    setCoverFile(f)
                    if (f) setCoverPreview(URL.createObjectURL(f))
                    else setCoverPreview(null)
                  }}
                />
                {coverPreview && (
                  <div className="relative mt-2">
                    <img src={coverPreview} alt="Cover preview" className="h-32 w-full rounded-lg object-cover" />
                    <button type="button" onClick={() => { setCoverFile(null); setCoverPreview(null) }} className="absolute top-2 right-2 size-6 rounded-full bg-black/50 text-white flex items-center justify-center text-xs">&times;</button>
                  </div>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Event Date</Label>
                  <Input type="date" value={form.eventDate} onChange={(e) => setForm({ ...form, eventDate: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>Max Attendees</Label>
                  <Input type="number" value={form.maxAttendees} onChange={(e) => setForm({ ...form, maxAttendees: e.target.value })} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Venue</Label>
                  <Input value={form.venue} onChange={(e) => setForm({ ...form, venue: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>City</Label>
                  <Input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select value={form.status} onValueChange={(v) => { if (v) setForm({ ...form, status: v as Event["status"] }) }}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="UPCOMING">Upcoming</SelectItem>
                      <SelectItem value="ONGOING">Ongoing</SelectItem>
                      <SelectItem value="COMPLETED">Completed</SelectItem>
                      <SelectItem value="CANCELLED">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-end pb-1">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={form.isFeatured} onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })} className="size-4 rounded" />
                    <span className="text-sm font-medium">Featured</span>
                  </label>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => { setCreateOpen(false); setEditTarget(null) }}>Cancel</Button>
              <Button onClick={handleSave} disabled={saving}>{saving ? "Saving..." : "Save"}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <Card><CardContent className="space-y-3 py-6">{Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-12 w-full" />)}</CardContent></Card>
      ) : events.length === 0 ? (
        <Card><CardContent className="flex flex-col items-center justify-center py-12">
          <Calendar className="mb-4 size-12 text-muted-foreground/50" />
          <p className="text-lg font-medium">No events yet</p>
          <Button onClick={() => setCreateOpen(true)}><Plus className="size-4" /> Create Event</Button>
        </CardContent></Card>
      ) : (
        <Card><CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Event</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Registrations</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {events.map((e) => (
                <TableRow key={e.id}>
                  <TableCell className="font-medium">{e.title}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{format(new Date(e.eventDate), "MMM d, yyyy")}</TableCell>
                  <TableCell><StatusBadge status={e.status} /></TableCell>
                  <TableCell className="text-sm text-muted-foreground">{e.city || e.venue || "—"}</TableCell>
                  <TableCell>
                    <button onClick={() => openRegistrations(e)} className="flex items-center gap-1.5 text-sm text-[#1B8271] hover:underline cursor-pointer">
                      <Users className="size-3.5" />
                      {e._count.registrations}{e.maxAttendees ? `/${e.maxAttendees}` : ""}
                    </button>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="icon-sm" onClick={() => openEdit(e)}><Pencil className="size-4" /></Button>
                      <Button variant="ghost" size="icon-sm" onClick={() => setDeleteTarget(e)}><Trash2 className="size-4 text-destructive" /></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent></Card>
      )}

      <Dialog open={!!deleteTarget} onOpenChange={(open) => { if (!open) setDeleteTarget(null) }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Event</DialogTitle>
            <DialogDescription>Are you sure you want to delete &quot;{deleteTarget?.title}&quot;?</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteTarget(null)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDelete}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!registrationsTarget} onOpenChange={(open) => { if (!open) { setRegistrationsTarget(null); setRegistrations([]) } }}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Registrations — {registrationsTarget?.title}</DialogTitle>
            <DialogDescription>View all registrations for this event</DialogDescription>
          </DialogHeader>
          <div className="max-h-[60vh] overflow-y-auto">
            {regLoading ? (
              <div className="space-y-3 py-4">{Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-10 w-full" />)}</div>
            ) : registrations.length === 0 ? (
              <div className="py-8 text-center text-sm text-muted-foreground">No registrations yet</div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>City</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {registrations.map((r) => (
                    <TableRow key={r.id}>
                      <TableCell className="font-medium">{r.firstName} {r.lastName}</TableCell>
                      <TableCell className="text-sm"><span className="flex items-center gap-1"><Mail className="size-3 text-muted-foreground" />{r.email}</span></TableCell>
                      <TableCell className="text-sm">{r.phone ? <span className="flex items-center gap-1"><Phone className="size-3 text-muted-foreground" />{r.phone}</span> : "—"}</TableCell>
                      <TableCell className="text-sm">{r.city ? <span className="flex items-center gap-1"><MapPin className="size-3 text-muted-foreground" />{r.city}</span> : "—"}</TableCell>
                      <TableCell><Badge variant="outline" className={r.status === "CONFIRMED" ? "bg-green-500/10 text-green-700" : r.status === "CANCELLED" ? "bg-red-500/10 text-red-700" : "bg-amber-500/10 text-amber-700"}>{r.status}</Badge></TableCell>
                      <TableCell className="text-xs text-muted-foreground">{format(new Date(r.createdAt), "MMM d, yyyy")}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => { setRegistrationsTarget(null); setRegistrations([]) }}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
