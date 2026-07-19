"use client"

import { useEffect, useState, useCallback, useRef } from "react"
import { format } from "date-fns"
import { Plus, Pencil, Trash2, GraduationCap, Users } from "lucide-react"
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

interface Scholarship {
  id: string; title: string; slug: string; description: string
  totalAmount: number | null; totalSlots: number | null; isActive: boolean
  createdAt: string; _count: { students: number }
}

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
}

export default function AdminScholarshipsPage() {
  const [scholarships, setScholarships] = useState<Scholarship[]>([])
  const [loading, setLoading] = useState(true)
  const [createOpen, setCreateOpen] = useState(false)
  const [editTarget, setEditTarget] = useState<Scholarship | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<Scholarship | null>(null)
  const [form, setForm] = useState({ title: "", slug: "", description: "", totalAmount: "", totalSlots: "", isActive: true })
  const slugEdited = useRef(false)
  const [saving, setSaving] = useState(false)

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch("/api/scholarships?limit=100")
      const data = await res.json()
      if (data.success) setScholarships(data.data)
    } catch { toast.error("Failed to load") }
    finally { setLoading(false) }
  }, [])

  useEffect(() => { fetchData() }, [fetchData])

  const resetForm = () => { setForm({ title: "", slug: "", description: "", totalAmount: "", totalSlots: "", isActive: true }); slugEdited.current = false }

  const handleSave = async () => {
    if (!form.title.trim() || !form.slug.trim() || !form.description.trim()) { toast.error("Title, slug, and description required"); return }
    setSaving(true)
    try {
      const payload = {
        ...form,
        totalAmount: form.totalAmount ? parseFloat(form.totalAmount) : undefined,
        totalSlots: form.totalSlots ? parseInt(form.totalSlots) : undefined,
      }
      const url = editTarget ? `/api/scholarships/${editTarget.slug}` : "/api/scholarships"
      const res = await fetch(url, { method: editTarget ? "PUT" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) })
      const data = await res.json()
      if (data.success) { toast.success(editTarget ? "Updated" : "Created"); setCreateOpen(false); setEditTarget(null); resetForm(); fetchData() }
      else { toast.error(data.error) }
    } catch { toast.error("Failed to save") }
    finally { setSaving(false) }
  }

  const handleDelete = async () => {
    if (!deleteTarget) return
    try {
      const res = await fetch(`/api/scholarships/${deleteTarget.slug}`, { method: "DELETE" })
      const data = await res.json()
      if (data.success) { toast.success("Deleted"); setDeleteTarget(null); fetchData() }
    } catch { toast.error("Failed") }
  }

  const openEdit = (s: Scholarship) => {
    setForm({ title: s.title, slug: s.slug, description: s.description, totalAmount: s.totalAmount?.toString() || "", totalSlots: s.totalSlots?.toString() || "", isActive: s.isActive })
    slugEdited.current = true
    setEditTarget(s)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Scholarships</h2>
          <p className="text-sm text-muted-foreground">Manage scholarship programs and applications</p>
        </div>
        <Dialog open={createOpen || !!editTarget} onOpenChange={(open) => { if (!open) { setCreateOpen(false); setEditTarget(null); resetForm() } }}>
          <DialogTrigger render={<Button onClick={() => { resetForm(); setCreateOpen(true) }} />}>
            <Plus className="size-4" /> New Scholarship
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader><DialogTitle>{editTarget ? "Edit" : "Create"} Scholarship</DialogTitle></DialogHeader>
            <div className="grid gap-4 py-2 max-h-[60vh] overflow-y-auto pr-2">
              <div className="space-y-2"><Label>Title</Label><Input value={form.title} onChange={(e) => { const v = e.target.value; setForm(f => ({ ...f, title: v, slug: slugEdited.current ? f.slug : slugify(v) })) }} /></div>
              <div className="space-y-2"><Label>Slug</Label><Input value={form.slug} onChange={(e) => { slugEdited.current = true; setForm({ ...form, slug: e.target.value }) }} /></div>
              <div className="space-y-2"><Label>Description</Label><Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={4} /></div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2"><Label>Total Amount (₹)</Label><Input type="number" value={form.totalAmount} onChange={(e) => setForm({ ...form, totalAmount: e.target.value })} /></div>
                <div className="space-y-2"><Label>Total Slots</Label><Input type="number" value={form.totalSlots} onChange={(e) => setForm({ ...form, totalSlots: e.target.value })} /></div>
              </div>
              <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} className="size-4 rounded" /><span className="text-sm font-medium">Active</span></label>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => { setCreateOpen(false); setEditTarget(null) }}>Cancel</Button>
              <Button onClick={handleSave} disabled={saving}>{saving ? "Saving..." : "Save"}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <Card><CardContent className="space-y-3 py-6">{Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-12 w-full" />)}</CardContent></Card>
      ) : scholarships.length === 0 ? (
        <Card><CardContent className="flex flex-col items-center justify-center py-12">
          <GraduationCap className="mb-4 size-12 text-muted-foreground/50" />
          <p className="font-medium">No scholarships yet</p>
          <Button onClick={() => setCreateOpen(true)} className="mt-3"><Plus className="size-4" /> Create Scholarship</Button>
        </CardContent></Card>
      ) : (
        <Card><CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Scholarship</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Slots</TableHead>
                <TableHead>Applications</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {scholarships.map((s) => (
                <TableRow key={s.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{s.title}</p>
                      <p className="text-xs text-muted-foreground">/{s.slug}</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">{s.totalAmount ? `₹${s.totalAmount.toLocaleString("en-IN")}` : "—"}</TableCell>
                  <TableCell className="text-sm">{s.totalSlots || "—"}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5 text-sm"><Users className="size-3.5 text-muted-foreground" /> {s._count.students}</div>
                  </TableCell>
                  <TableCell><Badge variant={s.isActive ? "default" : "secondary"} className={s.isActive ? "bg-green-500/10 text-green-700 border-green-500/20 dark:text-green-400" : ""}>{s.isActive ? "Active" : "Inactive"}</Badge></TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="icon-sm" onClick={() => openEdit(s)}><Pencil className="size-4" /></Button>
                      <Button variant="ghost" size="icon-sm" onClick={() => setDeleteTarget(s)}><Trash2 className="size-4 text-destructive" /></Button>
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
          <DialogHeader><DialogTitle>Delete Scholarship</DialogTitle><DialogDescription>This will also delete all applications. Continue?</DialogDescription></DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteTarget(null)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDelete}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
