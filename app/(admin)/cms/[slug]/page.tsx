"use client"

import { useEffect, useState, useCallback, use } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Loader2, Save, Trash2 } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { CmsEditorPage } from "@/components/admin/cms-editor-page"

interface PageData {
  id: string
  title: string
  slug: string
  content: string | null
  metaTitle: string | null
  metaDescription: string | null
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED"
  orderIndex: number
  createdAt: string
  updatedAt: string
}

function MetaFields({
  metaTitle,
  setMetaTitle,
  metaDescription,
  setMetaDescription,
  status,
  setStatus,
}: {
  metaTitle: string
  setMetaTitle: (v: string) => void
  metaDescription: string
  setMetaDescription: (v: string) => void
  status: string
  setStatus: (v: string) => void
}) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="meta-title">Meta Title</Label>
        <Input
          id="meta-title"
          placeholder="SEO title"
          value={metaTitle}
          onChange={(e) => setMetaTitle(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="meta-description">Meta Description</Label>
        <Textarea
          id="meta-description"
          placeholder="SEO description"
          value={metaDescription}
          onChange={(e) => setMetaDescription(e.target.value)}
          rows={4}
        />
      </div>
      <div className="space-y-2">
        <Label>Status</Label>
        <Select value={status} onValueChange={(v) => v && setStatus(v)}>
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="DRAFT">Draft</SelectItem>
            <SelectItem value="PUBLISHED">Published</SelectItem>
            <SelectItem value="ARCHIVED">Archived</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

export default function CmsPageEditor({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = use(params)
  const router = useRouter()

  const [page, setPage] = useState<PageData | null>(null)
  const [loading, setLoading] = useState(true)
  const [title, setTitle] = useState("")
  const [metaTitle, setMetaTitle] = useState("")
  const [metaDescription, setMetaDescription] = useState("")
  const [status, setStatus] = useState("DRAFT")
  const [saving, setSaving] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const fetchPage = useCallback(async () => {
    try {
      const res = await fetch(`/api/cms/pages/${slug}`)
      const data = await res.json()
      if (data.success && data.data) {
        const p = data.data as PageData
        setPage(p)
        setTitle(p.title)
        setMetaTitle(p.metaTitle ?? "")
        setMetaDescription(p.metaDescription ?? "")
        setStatus(p.status)
      } else {
        toast.error("Page not found")
        router.push("/cms")
      }
    } catch {
      toast.error("Failed to load page")
    } finally {
      setLoading(false)
    }
  }, [slug, router])

  useEffect(() => {
    fetchPage()
  }, [fetchPage])

  const handleSave = async () => {
    if (!title.trim()) {
      toast.error("Title is required")
      return
    }
    setSaving(true)
    try {
      const res = await fetch(`/api/cms/pages/${slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          metaTitle: metaTitle || undefined,
          metaDescription: metaDescription || undefined,
          status,
        }),
      })
      const data = await res.json()
      if (data.success) {
        toast.success("Page saved")
      } else {
        toast.error(data.error || "Failed to save")
      }
    } catch {
      toast.error("Failed to save page")
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    setDeleting(true)
    try {
      const res = await fetch(`/api/cms/pages/${slug}`, {
        method: "DELETE",
      })
      const data = await res.json()
      if (data.success) {
        toast.success("Page deleted")
        router.push("/cms")
      } else {
        toast.error(data.error || "Failed to delete")
      }
    } catch {
      toast.error("Failed to delete page")
    } finally {
      setDeleting(false)
      setDeleteOpen(false)
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
          <div className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-64 w-full" />
          </div>
          <div className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      </div>
    )
  }

  if (!page) return null

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon-sm" render={<Link href="/cms" />}>
            <ArrowLeft className="size-4" />
          </Button>
          <h2 className="text-2xl font-bold tracking-tight">Edit Page</h2>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="destructive"
            size="sm"
            onClick={() => setDeleteOpen(true)}
          >
            <Trash2 className="size-4" />
            Delete
          </Button>
          <Button size="sm" onClick={handleSave} disabled={saving}>
            {saving ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Save className="size-4" />
            )}
            Save
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="page-title">Page Title</Label>
          <Input
            id="page-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Page title"
          />
        </div>
      </div>

      {/* Desktop: sidebar layout */}
      <div className="hidden gap-6 lg:grid lg:grid-cols-[1fr_320px]">
        <CmsEditorPage
          slug={slug}
          title=""
          initialContent={page.content ?? ""}
        />
        <Card>
          <CardHeader>
            <CardTitle>Page Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <MetaFields
              metaTitle={metaTitle}
              setMetaTitle={setMetaTitle}
              metaDescription={metaDescription}
              setMetaDescription={setMetaDescription}
              status={status}
              setStatus={setStatus}
            />
          </CardContent>
        </Card>
      </div>

      {/* Mobile: stacked layout */}
      <div className="space-y-6 lg:hidden">
        <CmsEditorPage
          slug={slug}
          title=""
          initialContent={page.content ?? ""}
        />
        <Card>
          <CardHeader>
            <CardTitle>Page Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <MetaFields
              metaTitle={metaTitle}
              setMetaTitle={setMetaTitle}
              metaDescription={metaDescription}
              setMetaDescription={setMetaDescription}
              status={status}
              setStatus={setStatus}
            />
          </CardContent>
        </Card>
      </div>

      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Page</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this page? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteOpen(false)}>
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
