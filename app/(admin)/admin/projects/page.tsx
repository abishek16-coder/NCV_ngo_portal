"use client"

import { useEffect, useState, useCallback, useRef } from "react"
import { format } from "date-fns"
import { Plus, Pencil, Trash2, FolderOpen, Star } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table"
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"

interface Project {
  id: string
  title: string
  slug: string
  description: string
  shortDescription: string | null
  status: "ACTIVE" | "COMPLETED" | "UPCOMING" | "ON_HOLD"
  targetAmount: number | null
  raisedAmount: number | null
  location: string | null
  isFeatured: boolean
  createdAt: string
  _count: { images: number }
}

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
}

function StatusBadge({ status }: { status: Project["status"] }) {
  const colors: Record<Project["status"], string> = {
    ACTIVE: "bg-green-500/10 text-green-700 border-green-500/20 dark:text-green-400",
    COMPLETED: "bg-blue-500/10 text-blue-700 border-blue-500/20 dark:text-blue-400",
    UPCOMING: "bg-amber-500/10 text-amber-700 border-amber-500/20 dark:text-amber-400",
    ON_HOLD: "bg-slate-500/10 text-slate-700 border-slate-500/20 dark:text-slate-400",
  }
  return <Badge variant="outline" className={colors[status]}>{status.replace("_", " ")}</Badge>
}

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [createOpen, setCreateOpen] = useState(false)
  const [editTarget, setEditTarget] = useState<Project | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<Project | null>(null)
  const [form, setForm] = useState({ title: "", slug: "", description: "", shortDescription: "", location: "", targetAmount: "", status: "ACTIVE" as Project["status"], isFeatured: false })
  const slugEdited = useRef(false)
  const [saving, setSaving] = useState(false)

  const fetchProjects = useCallback(async () => {
    try {
      const res = await fetch("/api/projects?limit=100")
      const data = await res.json()
      if (data.success) setProjects(data.data)
    } catch { toast.error("Failed to load projects") }
    finally { setLoading(false) }
  }, [])

  useEffect(() => { fetchProjects() }, [fetchProjects])

  const resetForm = () => {
    setForm({ title: "", slug: "", description: "", shortDescription: "", location: "", targetAmount: "", status: "ACTIVE", isFeatured: false })
    slugEdited.current = false
  }

  const handleSave = async () => {
    if (!form.title.trim() || !form.slug.trim() || !form.description.trim()) {
      toast.error("Title, slug, and description are required")
      return
    }
    setSaving(true)
    try {
      const payload = {
        ...form,
        targetAmount: form.targetAmount ? parseFloat(form.targetAmount) : undefined,
      }
      const url = editTarget ? `/api/projects/${editTarget.slug}` : "/api/projects"
      const res = await fetch(url, {
        method: editTarget ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (data.success) {
        toast.success(editTarget ? "Project updated" : "Project created")
        setCreateOpen(false)
        setEditTarget(null)
        resetForm()
        fetchProjects()
      } else {
        toast.error(data.error || "Failed to save")
      }
    } catch { toast.error("Failed to save project") }
    finally { setSaving(false) }
  }

  const handleDelete = async () => {
    if (!deleteTarget) return
    try {
      const res = await fetch(`/api/projects/${deleteTarget.slug}`, { method: "DELETE" })
      const data = await res.json()
      if (data.success) {
        toast.success("Project deleted")
        setDeleteTarget(null)
        fetchProjects()
      } else { toast.error(data.error) }
    } catch { toast.error("Failed to delete") }
  }

  const openEdit = (p: Project) => {
    setForm({
      title: p.title, slug: p.slug, description: p.description,
      shortDescription: p.shortDescription || "", location: p.location || "",
      targetAmount: p.targetAmount?.toString() || "", status: p.status, isFeatured: p.isFeatured,
    })
    slugEdited.current = true
    setEditTarget(p)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Projects</h2>
          <p className="text-sm text-muted-foreground">Manage NGO projects and programs</p>
        </div>
        <Dialog open={createOpen || !!editTarget} onOpenChange={(open) => { if (!open) { setCreateOpen(false); setEditTarget(null); resetForm() } }}>
          <DialogTrigger render={<Button onClick={() => { resetForm(); setCreateOpen(true) }} />}>
            <Plus className="size-4" /> New Project
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editTarget ? "Edit Project" : "Create Project"}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-2 max-h-[60vh] overflow-y-auto pr-2">
              <div className="space-y-2">
                <Label>Title</Label>
                <Input value={form.title} onChange={(e) => {
                  setForm({ ...form, title: e.target.value })
                  if (!slugEdited.current) setForm(f => ({ ...f, title: e.target.value, slug: slugify(e.target.value) }))
                }} />
              </div>
              <div className="space-y-2">
                <Label>Slug</Label>
                <Input value={form.slug} onChange={(e) => { slugEdited.current = true; setForm({ ...form, slug: e.target.value }) }} />
              </div>
              <div className="space-y-2">
                <Label>Short Description</Label>
                <Input value={form.shortDescription} onChange={(e) => setForm({ ...form, shortDescription: e.target.value })} placeholder="Brief one-liner" />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={4} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Location</Label>
                  <Input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>Target Amount (₹)</Label>
                  <Input type="number" value={form.targetAmount} onChange={(e) => setForm({ ...form, targetAmount: e.target.value })} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select value={form.status} onValueChange={(v) => { if (v) setForm({ ...form, status: v as Project["status"] }) }}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ACTIVE">Active</SelectItem>
                      <SelectItem value="COMPLETED">Completed</SelectItem>
                      <SelectItem value="UPCOMING">Upcoming</SelectItem>
                      <SelectItem value="ON_HOLD">On Hold</SelectItem>
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
      ) : projects.length === 0 ? (
        <Card><CardContent className="flex flex-col items-center justify-center py-12">
          <FolderOpen className="mb-4 size-12 text-muted-foreground/50" />
          <p className="text-lg font-medium">No projects yet</p>
          <p className="mb-4 text-sm text-muted-foreground">Create your first project to get started.</p>
          <Button onClick={() => setCreateOpen(true)}><Plus className="size-4" /> Create Project</Button>
        </CardContent></Card>
      ) : (
        <Card><CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Project</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Updated</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map((p) => (
                <TableRow key={p.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      {p.isFeatured && <Star className="size-4 text-amber-500 fill-amber-500" />}
                      <div>
                        <p className="font-medium">{p.title}</p>
                        <p className="text-xs text-muted-foreground">/{p.slug}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell><StatusBadge status={p.status} /></TableCell>
                  <TableCell>
                    {p.targetAmount ? (
                      <div className="w-32">
                        <div className="flex justify-between text-xs mb-1">
                          <span>₹{((p.raisedAmount || 0) / 1000).toFixed(0)}K</span>
                          <span>₹{(p.targetAmount / 1000).toFixed(0)}K</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden">
                          <div className="h-full rounded-full bg-green-500" style={{ width: `${Math.min(((p.raisedAmount || 0) / p.targetAmount) * 100, 100)}%` }} />
                        </div>
                      </div>
                    ) : <span className="text-xs text-muted-foreground">No target set</span>}
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">{p.location || "—"}</TableCell>
                  <TableCell className="text-muted-foreground text-sm">{format(new Date(p.createdAt), "MMM d, yyyy")}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="icon-sm" onClick={() => openEdit(p)}><Pencil className="size-4" /></Button>
                      <Button variant="ghost" size="icon-sm" onClick={() => setDeleteTarget(p)}><Trash2 className="size-4 text-destructive" /></Button>
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
            <DialogTitle>Delete Project</DialogTitle>
            <DialogDescription>Are you sure you want to delete &quot;{deleteTarget?.title}&quot;? This cannot be undone.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteTarget(null)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDelete}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
