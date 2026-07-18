"use client"

import { useEffect, useState, useCallback } from "react"
import { format } from "date-fns"
import {
  Plus,
  CheckCircle2,
  XCircle,
  Trash2,
  Star,
  Quote,
} from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
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

interface Testimonial {
  id: string
  authorName: string
  authorRole: string | null
  authorPhotoUrl: string | null
  content: string
  rating: number | null
  status: "PENDING" | "APPROVED" | "REJECTED"
  orderIndex: number
  createdAt: string
  updatedAt: string
}

function StatusBadge({ status }: { status: Testimonial["status"] }) {
  const config: Record<
    Testimonial["status"],
    { variant: "secondary" | "default" | "outline"; label: string }
  > = {
    PENDING: { variant: "secondary", label: "Pending" },
    APPROVED: { variant: "default", label: "Approved" },
    REJECTED: { variant: "outline", label: "Rejected" },
  }

  const { variant, label } = config[status]

  return (
    <Badge
      variant={variant}
      className={
        status === "APPROVED"
          ? "bg-green-500/10 text-green-700 border-green-500/20 dark:text-green-400"
          : status === "REJECTED"
            ? "text-red-600 dark:text-red-400"
            : undefined
      }
    >
      {label}
    </Badge>
  )
}

function RatingStars({ rating }: { rating: number | null }) {
  if (!rating) return <span className="text-muted-foreground">-</span>
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`size-3.5 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground/30"}`}
        />
      ))}
    </div>
  )
}

export default function CmsTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [createOpen, setCreateOpen] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<Testimonial | null>(null)
  const [creating, setCreating] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [updatingId, setUpdatingId] = useState<string | null>(null)

  const [formAuthor, setFormAuthor] = useState("")
  const [formRole, setFormRole] = useState("")
  const [formContent, setFormContent] = useState("")
  const [formRating, setFormRating] = useState("")

  const fetchTestimonials = useCallback(async () => {
    try {
      const res = await fetch("/api/cms/testimonials")
      const data = await res.json()
      if (data.success) {
        setTestimonials(data.data)
      }
    } catch {
      toast.error("Failed to load testimonials")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchTestimonials()
  }, [fetchTestimonials])

  const resetForm = () => {
    setFormAuthor("")
    setFormRole("")
    setFormContent("")
    setFormRating("")
  }

  const handleCreate = async () => {
    if (!formAuthor.trim() || !formContent.trim()) {
      toast.error("Author name and content are required")
      return
    }
    setCreating(true)
    try {
      const res = await fetch("/api/cms/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          authorName: formAuthor,
          authorRole: formRole || undefined,
          content: formContent,
          rating: formRating ? parseInt(formRating) : undefined,
        }),
      })
      const data = await res.json()
      if (data.success) {
        toast.success("Testimonial created")
        setCreateOpen(false)
        resetForm()
        fetchTestimonials()
      } else {
        toast.error(data.error || "Failed to create testimonial")
      }
    } catch {
      toast.error("Failed to create testimonial")
    } finally {
      setCreating(false)
    }
  }

  const updateStatus = async (id: string, status: string) => {
    setUpdatingId(id)
    try {
      const res = await fetch(`/api/cms/testimonials/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      })
      const data = await res.json()
      if (data.success) {
        toast.success(`Testimonial ${status.toLowerCase()}`)
        fetchTestimonials()
      } else {
        toast.error(data.error || "Failed to update")
      }
    } catch {
      toast.error("Failed to update testimonial")
    } finally {
      setUpdatingId(null)
    }
  }

  const handleDelete = async () => {
    if (!deleteTarget) return
    setDeleting(true)
    try {
      const res = await fetch(`/api/cms/testimonials/${deleteTarget.id}`, {
        method: "DELETE",
      })
      const data = await res.json()
      if (data.success) {
        toast.success("Testimonial deleted")
        setDeleteTarget(null)
        fetchTestimonials()
      } else {
        toast.error(data.error || "Failed to delete")
      }
    } catch {
      toast.error("Failed to delete testimonial")
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Testimonials</h2>
          <p className="text-sm text-muted-foreground">
            Manage client testimonials and reviews
          </p>
        </div>
        <Dialog
          open={createOpen}
          onOpenChange={(open) => {
            setCreateOpen(open)
            if (!open) resetForm()
          }}
        >
          <DialogTrigger render={<Button />}>
            <Plus className="size-4" />
            Add Testimonial
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add Testimonial</DialogTitle>
              <DialogDescription>
                Create a new testimonial entry.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-2">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="author-name">Author Name *</Label>
                  <Input
                    id="author-name"
                    placeholder="John Doe"
                    value={formAuthor}
                    onChange={(e) => setFormAuthor(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="author-role">Role</Label>
                  <Input
                    id="author-role"
                    placeholder="CEO, Company"
                    value={formRole}
                    onChange={(e) => setFormRole(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="content">Content *</Label>
                <Textarea
                  id="content"
                  placeholder="What they said..."
                  value={formContent}
                  onChange={(e) => setFormContent(e.target.value)}
                  rows={4}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="rating">Rating (1-5)</Label>
                <Input
                  id="rating"
                  type="number"
                  min={1}
                  max={5}
                  placeholder="5"
                  value={formRating}
                  onChange={(e) => setFormRating(e.target.value)}
                  className="w-24"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setCreateOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreate} disabled={creating}>
                {creating ? "Creating..." : "Create"}
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
      ) : testimonials.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Quote className="mb-4 size-12 text-muted-foreground/50" />
            <p className="text-lg font-medium">No testimonials yet</p>
            <p className="mb-4 text-sm text-muted-foreground">
              Add your first testimonial to get started.
            </p>
            <Button onClick={() => setCreateOpen(true)}>
              <Plus className="size-4" />
              Add Testimonial
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Author</TableHead>
                  <TableHead>Content</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {testimonials.map((t) => (
                  <TableRow key={t.id}>
                    <TableCell>
                      <div className="font-medium">{t.authorName}</div>
                      {t.authorRole && (
                        <div className="text-xs text-muted-foreground">
                          {t.authorRole}
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="max-w-[250px]">
                      <p className="truncate text-muted-foreground">
                        {t.content}
                      </p>
                    </TableCell>
                    <TableCell>
                      <RatingStars rating={t.rating} />
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={t.status} />
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {format(new Date(t.createdAt), "MMM d, yyyy")}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        {t.status !== "APPROVED" && (
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            disabled={updatingId === t.id}
                            onClick={() => updateStatus(t.id, "APPROVED")}
                            title="Approve"
                          >
                            <CheckCircle2 className="size-4 text-green-600" />
                          </Button>
                        )}
                        {t.status !== "REJECTED" && (
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            disabled={updatingId === t.id}
                            onClick={() => updateStatus(t.id, "REJECTED")}
                            title="Reject"
                          >
                            <XCircle className="size-4 text-destructive" />
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => setDeleteTarget(t)}
                          title="Delete"
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
            <DialogTitle>Delete Testimonial</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the testimonial by &quot;
              {deleteTarget?.authorName}&quot;? This action cannot be undone.
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
