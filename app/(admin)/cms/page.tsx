"use client"

import { useEffect, useState, useCallback, useRef } from "react"
import { useRouter } from "next/navigation"
import { format } from "date-fns"
import { Plus, Pencil, Trash2, FileText } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface CmsPage {
  id: string
  title: string
  slug: string
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED"
  updatedAt: string
  createdAt: string
  _count: { versions: number }
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
}

function StatusBadge({ status }: { status: CmsPage["status"] }) {
  const variantMap: Record<CmsPage["status"], "secondary" | "default" | "outline"> = {
    DRAFT: "secondary",
    PUBLISHED: "default",
    ARCHIVED: "outline",
  }

  return (
    <Badge
      variant={variantMap[status]}
      className={
        status === "PUBLISHED"
          ? "bg-green-500/10 text-green-700 border-green-500/20 dark:text-green-400"
          : undefined
      }
    >
      {status}
    </Badge>
  )
}

export default function CmsPagesPage() {
  const router = useRouter()
  const [pages, setPages] = useState<CmsPage[]>([])
  const [loading, setLoading] = useState(true)
  const [createOpen, setCreateOpen] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<CmsPage | null>(null)
  const [newTitle, setNewTitle] = useState("")
  const [newSlug, setNewSlug] = useState("")
  const [creating, setCreating] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const slugEdited = useRef(false)

  const fetchPages = useCallback(async () => {
    try {
      const res = await fetch("/api/cms/pages")
      const data = await res.json()
      if (data.success) {
        setPages(data.data)
      }
    } catch {
      toast.error("Failed to load pages")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchPages()
  }, [fetchPages])

  const handleTitleChange = (value: string) => {
    setNewTitle(value)
    if (!slugEdited.current) {
      setNewSlug(slugify(value))
    }
  }

  const handleSlugChange = (value: string) => {
    slugEdited.current = true
    setNewSlug(value)
  }

  const resetCreateForm = () => {
    setNewTitle("")
    setNewSlug("")
    slugEdited.current = false
  }

  const handleCreate = async () => {
    if (!newTitle.trim() || !newSlug.trim()) {
      toast.error("Title and slug are required")
      return
    }
    setCreating(true)
    try {
      const res = await fetch("/api/cms/pages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newTitle, slug: newSlug }),
      })
      const data = await res.json()
      if (data.success) {
        toast.success("Page created successfully")
        setCreateOpen(false)
        resetCreateForm()
        fetchPages()
      } else {
        toast.error(data.error || "Failed to create page")
      }
    } catch {
      toast.error("Failed to create page")
    } finally {
      setCreating(false)
    }
  }

  const handleDelete = async () => {
    if (!deleteTarget) return
    setDeleting(true)
    try {
      const res = await fetch(`/api/cms/pages/${deleteTarget.slug}`, {
        method: "DELETE",
      })
      const data = await res.json()
      if (data.success) {
        toast.success("Page deleted")
        setDeleteTarget(null)
        fetchPages()
      } else {
        toast.error(data.error || "Failed to delete page")
      }
    } catch {
      toast.error("Failed to delete page")
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Pages</h2>
          <p className="text-sm text-muted-foreground">
            Manage your CMS pages
          </p>
        </div>
        <Dialog
          open={createOpen}
          onOpenChange={(open) => {
            setCreateOpen(open)
            if (!open) resetCreateForm()
          }}
        >
          <DialogTrigger render={<Button />}>
            <Plus className="size-4" />
            Create New Page
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Page</DialogTitle>
              <DialogDescription>
                Add a new page to your CMS.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-2">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="Page title"
                  value={newTitle}
                  onChange={(e) => handleTitleChange(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="slug">Slug</Label>
                <Input
                  id="slug"
                  placeholder="page-slug"
                  value={newSlug}
                  onChange={(e) => handleSlugChange(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setCreateOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreate} disabled={creating}>
                {creating ? "Creating..." : "Create Page"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <Card>
          <CardContent>
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          </CardContent>
        </Card>
      ) : pages.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <FileText className="mb-4 size-12 text-muted-foreground/50" />
            <p className="text-lg font-medium">No pages yet</p>
            <p className="mb-4 text-sm text-muted-foreground">
              Create your first page to get started.
            </p>
            <Button onClick={() => setCreateOpen(true)}>
              <Plus className="size-4" />
              Create Page
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Slug</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pages.map((page) => (
                  <TableRow key={page.id}>
                    <TableCell className="font-medium">
                      {page.title}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {page.slug}
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={page.status} />
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {format(new Date(page.updatedAt), "MMM d, yyyy")}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => router.push(`./cms/${page.slug}`)}
                        >
                          <Pencil className="size-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => setDeleteTarget(page)}
                        >
                          <Trash2 className="size-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      <Dialog
        open={!!deleteTarget}
        onOpenChange={(open) => {
          if (!open) setDeleteTarget(null)
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Page</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete &quot;{deleteTarget?.title}&quot;?
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteTarget(null)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={deleting}
            >
              {deleting ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
