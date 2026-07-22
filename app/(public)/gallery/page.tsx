"use client"

import { useEffect, useState } from "react"
import { Image, Video, X } from "lucide-react"
import { TrustBackground } from "@/components/public/trust-background"

interface Photo {
  id: string; url: string; alt: string | null; caption: string | null; album: string | null
}
interface VideoItem {
  id: string; title: string; url: string; platform: string; isFeatured: boolean
}

export default function GalleryPage() {
  const [photos, setPhotos] = useState<Photo[]>([])
  const [videos, setVideos] = useState<VideoItem[]>([])
  const [albums, setAlbums] = useState<string[]>([])
  const [activeAlbum, setActiveAlbum] = useState<string>("all")
  const [activeTab, setActiveTab] = useState<"photos" | "videos">("photos")
  const [loading, setLoading] = useState(true)
  const [lightbox, setLightbox] = useState<Photo | null>(null)

  useEffect(() => {
    Promise.all([
      fetch("/api/gallery/photos?limit=100").then((r) => r.json()),
      fetch("/api/gallery/videos").then((r) => r.json()),
    ])
      .then(([photoData, videoData]) => {
        if (photoData.success) { setPhotos(photoData.data); setAlbums(photoData.albums || []) }
        if (videoData.success) setVideos(videoData.data)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const filteredPhotos = activeAlbum === "all" ? photos : photos.filter((p) => p.album === activeAlbum)

  return (
    <div>
      <TrustBackground />
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0f3d33] via-[#1B8271] to-[#0a5e4e] py-20 sm:py-28">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "40px 40px" }} />
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white/90 border border-white/10">
            <Image className="size-4" />
            Gallery
          </div>
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl" style={{ fontFamily: "var(--font-display)" }}>
            Moments of Impact
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-white/80">
            A visual journey through our yoga sessions, community events, and transformative programs.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {/* Tabs */}
          <div className="flex items-center gap-1 rounded-xl bg-slate-100 p-1 w-fit mb-8">
            <button onClick={() => setActiveTab("photos")} className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all ${activeTab === "photos" ? "bg-white text-[#1B8271] shadow-sm" : "text-slate-500 hover:text-slate-700"}`}>
              <Image className="size-4" /> Photos ({photos.length})
            </button>
            <button onClick={() => setActiveTab("videos")} className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all ${activeTab === "videos" ? "bg-white text-[#1B8271] shadow-sm" : "text-slate-500 hover:text-slate-700"}`}>
              <Video className="size-4" /> Videos ({videos.length})
            </button>
          </div>

          {activeTab === "photos" && (
            <>
              {/* Album filter */}
              {albums.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-8">
                  <button onClick={() => setActiveAlbum("all")} className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${activeAlbum === "all" ? "bg-[#1B8271] text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>
                    All
                  </button>
                  {albums.map((a) => (
                    <button key={a} onClick={() => setActiveAlbum(a!)} className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${activeAlbum === a ? "bg-[#1B8271] text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>
                      {a}
                    </button>
                  ))}
                </div>
              )}

              {loading ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div key={i} className="aspect-square rounded-xl bg-slate-100 animate-pulse" />
                  ))}
                </div>
              ) : filteredPhotos.length === 0 ? (
                <div className="text-center py-20">
                  <Image className="mx-auto size-16 text-slate-300" />
                  <p className="mt-4 text-slate-500">No photos to display</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {filteredPhotos.map((photo) => (
                    <button key={photo.id} onClick={() => setLightbox(photo)} className="group relative aspect-square overflow-hidden rounded-xl bg-slate-100 cursor-pointer">
                      <img src={photo.url} alt={photo.alt || ""} className="size-full object-cover transition-transform duration-300 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                        <p className="absolute bottom-3 left-3 right-3 text-xs text-white font-medium truncate">{photo.alt || photo.caption || ""}</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </>
          )}

          {activeTab === "videos" && (
            <>
              {videos.length === 0 ? (
                <div className="text-center py-20">
                  <Video className="mx-auto size-16 text-slate-300" />
                  <p className="mt-4 text-slate-500">No videos yet</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {videos.map((v) => (
                    <div key={v.id} className="rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                      <div className="aspect-video bg-slate-100 flex items-center justify-center">
                        <Video className="size-12 text-slate-300" />
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-sm text-[#071C35]">{v.title}</h3>
                        <p className="mt-1 text-xs text-slate-400 capitalize">{v.platform}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4" onClick={() => setLightbox(null)}>
          <button onClick={() => setLightbox(null)} className="absolute top-4 right-4 size-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors">
            <X className="size-5" />
          </button>
          <img src={lightbox.url} alt={lightbox.alt || ""} className="max-h-[85vh] max-w-full rounded-xl object-contain" onClick={(e) => e.stopPropagation()} />
          {(lightbox.alt || lightbox.caption) && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-lg bg-black/60 px-4 py-2 text-sm text-white backdrop-blur-sm">
              {lightbox.alt || lightbox.caption}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
