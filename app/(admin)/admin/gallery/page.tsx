"use client"

import { useEffect, useState, useCallback } from "react"
import { Plus, Trash2, Image, Star, Video } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"

interface Photo { id: string; url: string; alt: string | null; caption: string | null; album: string | null; isFeatured: boolean }
interface VideoItem { id: string; title: string; url: string; description: string | null; platform: string; isFeatured: boolean }

export default function AdminGalleryPage() {
  const [photos, setPhotos] = useState<Photo[]>([])
  const [videos, setVideos] = useState<VideoItem[]>([])
  const [albums, setAlbums] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [photoOpen, setPhotoOpen] = useState(false)
  const [videoOpen, setVideoOpen] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<{ type: "photo" | "video"; id: string } | null>(null)
  const [photoForm, setPhotoForm] = useState({ url: "", alt: "", caption: "", album: "", isFeatured: false })
  const [videoForm, setVideoForm] = useState({ title: "", url: "", description: "", isFeatured: false })
  const [saving, setSaving] = useState(false)

  const fetchData = useCallback(async () => {
    try {
      const [photoRes, videoRes] = await Promise.all([
        fetch("/api/gallery/photos?limit=100"),
        fetch("/api/gallery/videos"),
      ])
      const photoData = await photoRes.json()
      const videoData = await videoRes.json()
      if (photoData.success) { setPhotos(photoData.data); setAlbums(photoData.albums || []) }
      if (videoData.success) setVideos(videoData.data)
    } catch { toast.error("Failed to load gallery") }
    finally { setLoading(false) }
  }, [])

  useEffect(() => { fetchData() }, [fetchData])

  const handleSavePhoto = async () => {
    if (!photoForm.url.trim()) { toast.error("URL is required"); return }
    setSaving(true)
    try {
      const res = await fetch("/api/gallery/photos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(photoForm),
      })
      const data = await res.json()
      if (data.success) { toast.success("Photo added"); setPhotoOpen(false); setPhotoForm({ url: "", alt: "", caption: "", album: "", isFeatured: false }); fetchData() }
      else { toast.error(data.error) }
    } catch { toast.error("Failed to save") }
    finally { setSaving(false) }
  }

  const handleSaveVideo = async () => {
    if (!videoForm.title.trim() || !videoForm.url.trim()) { toast.error("Title and URL required"); return }
    setSaving(true)
    try {
      const res = await fetch("/api/gallery/videos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(videoForm),
      })
      const data = await res.json()
      if (data.success) { toast.success("Video added"); setVideoOpen(false); setVideoForm({ title: "", url: "", description: "", isFeatured: false }); fetchData() }
      else { toast.error(data.error) }
    } catch { toast.error("Failed to save") }
    finally { setSaving(false) }
  }

  const handleDelete = async () => {
    if (!deleteTarget) return
    try {
      const url = deleteTarget.type === "photo" ? `/api/gallery/photos/${deleteTarget.id}` : `/api/gallery/videos/${deleteTarget.id}`
      const res = await fetch(url, { method: "DELETE" })
      const data = await res.json()
      if (data.success) { toast.success("Deleted"); setDeleteTarget(null); fetchData() }
      else { toast.error(data.error) }
    } catch { toast.error("Failed to delete") }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Gallery</h2>
        <p className="text-sm text-muted-foreground">Manage photos and videos</p>
      </div>

      <Tabs defaultValue="photos">
        <TabsList>
          <TabsTrigger value="photos"><Image className="size-4 mr-1.5" /> Photos ({photos.length})</TabsTrigger>
          <TabsTrigger value="videos"><Video className="size-4 mr-1.5" /> Videos ({videos.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="photos" className="space-y-4">
          <div className="flex justify-end">
            <Dialog open={photoOpen} onOpenChange={(open) => { setPhotoOpen(open); if (!open) setPhotoForm({ url: "", alt: "", caption: "", album: "", isFeatured: false }) }}>
              <DialogTrigger render={<Button onClick={() => setPhotoOpen(true)} />}>
                <Plus className="size-4" /> Add Photo
              </DialogTrigger>
              <DialogContent>
                <DialogHeader><DialogTitle>Add Photo</DialogTitle></DialogHeader>
                <div className="grid gap-4 py-2">
                  <div className="space-y-2"><Label>Image URL</Label><Input value={photoForm.url} onChange={(e) => setPhotoForm({ ...photoForm, url: e.target.value })} placeholder="https://..." /></div>
                  <div className="space-y-2"><Label>Alt Text</Label><Input value={photoForm.alt} onChange={(e) => setPhotoForm({ ...photoForm, alt: e.target.value })} /></div>
                  <div className="space-y-2"><Label>Caption</Label><Input value={photoForm.caption} onChange={(e) => setPhotoForm({ ...photoForm, caption: e.target.value })} /></div>
                  <div className="space-y-2"><Label>Album</Label><Input value={photoForm.album} onChange={(e) => setPhotoForm({ ...photoForm, album: e.target.value })} placeholder="e.g. Community Events" /></div>
                  <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={photoForm.isFeatured} onChange={(e) => setPhotoForm({ ...photoForm, isFeatured: e.target.checked })} className="size-4 rounded" /><span className="text-sm font-medium">Featured</span></label>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setPhotoOpen(false)}>Cancel</Button>
                  <Button onClick={handleSavePhoto} disabled={saving}>{saving ? "Saving..." : "Save"}</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">{Array.from({ length: 8 }).map((_, i) => <Skeleton key={i} className="aspect-square rounded-xl" />)}</div>
          ) : photos.length === 0 ? (
            <Card><CardContent className="flex flex-col items-center justify-center py-12">
              <Image className="mb-4 size-12 text-muted-foreground/50" />
              <p className="font-medium">No photos yet</p>
              <Button onClick={() => setPhotoOpen(true)} className="mt-3"><Plus className="size-4" /> Add Photo</Button>
            </CardContent></Card>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {photos.map((p) => (
                <div key={p.id} className="group relative aspect-square overflow-hidden rounded-xl border bg-slate-100">
                  <img src={p.url} alt={p.alt || ""} className="size-full object-cover" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="flex gap-2">
                      {p.isFeatured && <Star className="size-4 text-amber-400 fill-amber-400" />}
                      <Button size="icon-sm" variant="destructive" onClick={() => setDeleteTarget({ type: "photo", id: p.id })}>
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                  </div>
                  {(p.alt || p.album) && (
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                      <p className="text-xs text-white truncate">{p.alt || p.album}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="videos" className="space-y-4">
          <div className="flex justify-end">
            <Dialog open={videoOpen} onOpenChange={(open) => { setVideoOpen(open); if (!open) setVideoForm({ title: "", url: "", description: "", isFeatured: false }) }}>
              <DialogTrigger render={<Button onClick={() => setVideoOpen(true)} />}>
                <Plus className="size-4" /> Add Video
              </DialogTrigger>
              <DialogContent>
                <DialogHeader><DialogTitle>Add Video</DialogTitle></DialogHeader>
                <div className="grid gap-4 py-2">
                  <div className="space-y-2"><Label>Title</Label><Input value={videoForm.title} onChange={(e) => setVideoForm({ ...videoForm, title: e.target.value })} /></div>
                  <div className="space-y-2"><Label>Video URL</Label><Input value={videoForm.url} onChange={(e) => setVideoForm({ ...videoForm, url: e.target.value })} placeholder="https://youtube.com/..." /></div>
                  <div className="space-y-2"><Label>Description</Label><Textarea value={videoForm.description} onChange={(e) => setVideoForm({ ...videoForm, description: e.target.value })} rows={2} /></div>
                  <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={videoForm.isFeatured} onChange={(e) => setVideoForm({ ...videoForm, isFeatured: e.target.checked })} className="size-4 rounded" /><span className="text-sm font-medium">Featured</span></label>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setVideoOpen(false)}>Cancel</Button>
                  <Button onClick={handleSaveVideo} disabled={saving}>{saving ? "Saving..." : "Save"}</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {videos.length === 0 ? (
            <Card><CardContent className="flex flex-col items-center justify-center py-12">
              <Video className="mb-4 size-12 text-muted-foreground/50" />
              <p className="font-medium">No videos yet</p>
            </CardContent></Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {videos.map((v) => (
                <Card key={v.id} className="overflow-hidden">
                  <div className="aspect-video bg-slate-100 flex items-center justify-center">
                    <Video className="size-10 text-muted-foreground/30" />
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium text-sm">{v.title}</p>
                        <p className="text-xs text-muted-foreground mt-1">{v.platform}</p>
                      </div>
                      <Button size="icon-sm" variant="ghost" onClick={() => setDeleteTarget({ type: "video", id: v.id })}>
                        <Trash2 className="size-4 text-destructive" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      <Dialog open={!!deleteTarget} onOpenChange={(open) => { if (!open) setDeleteTarget(null) }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Item</DialogTitle>
            <DialogDescription>Are you sure? This cannot be undone.</DialogDescription>
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
