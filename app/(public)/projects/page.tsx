"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { FolderOpen, MapPin, ArrowRight, Target, Sun, Users, Activity } from "lucide-react"

const palette = {
  primary: "#1B8271",
  secondary: "#1B8271",
  heading: "#071C35",
  body: "#475569",
}

interface Project {
  id: string; title: string; slug: string; description: string
  shortDescription: string | null; status: string; coverImageUrl: string | null
  targetAmount: number | null; raisedAmount: number | null
  location: string | null; isFeatured: boolean
}

const statusColors: Record<string, string> = {
  ACTIVE: "bg-green-500/10 text-green-700 border-green-500/20",
  COMPLETED: "bg-blue-500/10 text-blue-700 border-blue-500/20",
  UPCOMING: "bg-amber-500/10 text-amber-700 border-amber-500/20",
  ON_HOLD: "bg-slate-500/10 text-slate-700 border-slate-500/20",
}

const icons = [Sun, Activity, Users, Target]

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/projects?limit=100")
      .then((r) => r.json())
      .then((d) => { if (d.success) setProjects(d.data) })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0f3d33] via-[#1B8271] to-[#0a5e4e] py-20 sm:py-28">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "40px 40px" }} />
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white/90 border border-white/10">
            <FolderOpen className="size-4" />
            Our Programs
          </div>
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl" style={{ fontFamily: "var(--font-display)" }}>
            Programs & Projects
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-white/80">
            Discover our initiatives that promote wellness, education, and community development.
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-80 rounded-2xl bg-slate-100 animate-pulse" />
              ))}
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-20">
              <FolderOpen className="mx-auto size-16 text-slate-300" />
              <p className="mt-4 text-lg font-medium text-slate-600">Projects coming soon</p>
              <p className="mt-2 text-slate-400">We are currently updating our project listings.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, i) => {
                const Icon = icons[i % icons.length]
                const progress = project.targetAmount && project.targetAmount > 0
                  ? Math.min(((project.raisedAmount || 0) / project.targetAmount) * 100, 100)
                  : null

                return (
                  <div key={project.id} className="group rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm hover:shadow-lg transition-all">
                    <div className="h-48 bg-gradient-to-br from-[#1B8271]/10 to-[#186F61]/10 flex items-center justify-center relative">
                      <Icon className="size-16 text-[#1B8271]/20" />
                      {project.isFeatured && (
                        <span className="absolute top-3 right-3 rounded-full bg-[#1B8271] px-2.5 py-1 text-[10px] font-bold text-white uppercase tracking-wide">Featured</span>
                      )}
                      <span className={`absolute top-3 left-3 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide border ${statusColors[project.status] || ""}`}>
                        {project.status.replace("_", " ")}
                      </span>
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-[#071C35] group-hover:text-[#1B8271] transition-colors">{project.title}</h3>
                      <p className="mt-2 text-sm text-[#475569] line-clamp-2">{project.shortDescription || project.description}</p>

                      {project.location && (
                        <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-500">
                          <MapPin className="size-3" /> {project.location}
                        </div>
                      )}

                      {progress !== null && (
                        <div className="mt-4">
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-slate-500">₹{((project.raisedAmount || 0) / 1000).toFixed(0)}K raised</span>
                            <span className="text-slate-500">₹{(project.targetAmount! / 1000).toFixed(0)}K goal</span>
                          </div>
                          <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden">
                            <div className="h-full rounded-full bg-[#1B8271]" style={{ width: `${progress}%` }} />
                          </div>
                        </div>
                      )}

                      <Link href={`/projects/${project.slug}`} className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#1B8271] hover:text-[#186F61] transition-colors">
                        Learn More <ArrowRight className="size-3.5" />
                      </Link>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
