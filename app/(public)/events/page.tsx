"use client"

import { useEffect, useState } from "react"
import { Calendar, MapPin, Clock, Users, ArrowRight } from "lucide-react"
import { TrustBackground } from "@/components/public/trust-background"

const palette = {
  primary: "#1B8271",
  orange: "#FF6B35",
  heading: "#1B8271",
  body: "#1B8271",
}

interface Event {
  id: string; title: string; slug: string; description: string
  shortDescription: string | null; eventDate: string; venue: string | null
  city: string | null; status: string; maxAttendees: number | null
  _count: { registrations: number }
}

const statusColors: Record<string, string> = {
  UPCOMING: "bg-[#FF6B35]/10 text-[#FF6B35] border border-[#FF6B35]/20",
  ONGOING: "bg-[#1B8271]/10 text-[#1B8271] border border-[#1B8271]/20",
  COMPLETED: "bg-[#1B8271]/10 text-[#1B8271] border border-[#1B8271]/20",
  CANCELLED: "bg-[#1B8271]/10 text-[#1B8271] border border-[#1B8271]/20",
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-IN", { weekday: "short", month: "short", day: "numeric", year: "numeric" })
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/events?limit=100")
      .then((r) => r.json())
      .then((d) => { if (d.success) setEvents(d.data) })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const upcoming = events.filter((e) => e.status === "UPCOMING")
  const past = events.filter((e) => e.status === "COMPLETED")

  return (
    <div>
      <TrustBackground />
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#1B8271] via-[#1B8271] to-[#1B8271] py-20 sm:py-28">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "40px 40px" }} />
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white/90 border border-white/10">
            <Calendar className="size-4" />
            Events & Workshops
          </div>
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl" style={{ fontFamily: "var(--font-display)" }}>
            Upcoming Events
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-white/80">
            Join our yoga workshops, wellness camps, and community gatherings.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid md:grid-cols-2 gap-8">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-64 rounded-2xl bg-[#1B8271]/5 animate-pulse" />
              ))}
            </div>
          ) : events.length === 0 ? (
            <div className="text-center py-20">
              <Calendar className="mx-auto size-16" style={{ color: "rgba(27,130,113,0.3)" }} />
              <p className="mt-4 text-lg font-medium" style={{ color: palette.body }}>No events yet</p>
              <p className="mt-2" style={{ color: palette.body, opacity: 0.6 }}>Stay tuned for upcoming workshops and gatherings.</p>
            </div>
          ) : (
            <>
              {upcoming.length > 0 && (
                <div className="mb-16">
                  <h2 className="text-2xl font-bold mb-8" style={{ color: palette.heading, fontFamily: "var(--font-display)" }}>Upcoming Events</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    {upcoming.map((event) => (
                      <div key={event.id} className="group rounded-2xl border border-[#1B8271]/10 bg-white overflow-hidden shadow-sm hover:shadow-lg transition-all">
                        <div className="h-3" style={{ background: `linear-gradient(to right, ${palette.primary}, ${palette.primary})` }} />
                        <div className="p-6">
                          <div className="flex items-start justify-between">
                            <div>
                              <span className={`inline-block rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${statusColors[event.status] || ""}`}>
                                {event.status}
                              </span>
                              <h3 className="mt-3 text-lg font-bold transition-colors" style={{ color: palette.heading }}>{event.title}</h3>
                            </div>
                            <div className="text-right shrink-0 ml-4">
                              <div className="text-2xl font-bold" style={{ color: palette.primary }}>{new Date(event.eventDate).getDate()}</div>
                              <div className="text-xs font-medium uppercase" style={{ color: palette.body, opacity: 0.6 }}>{new Date(event.eventDate).toLocaleString("en-IN", { month: "short" })}</div>
                            </div>
                          </div>
                          <p className="mt-3 text-sm" style={{ color: palette.body, opacity: 0.75 }}>{event.shortDescription || event.description}</p>
                          <div className="mt-4 flex flex-wrap items-center gap-4 text-xs" style={{ color: palette.body, opacity: 0.6 }}>
                            <span className="flex items-center gap-1"><Calendar className="size-3" /> {formatDate(event.eventDate)}</span>
                            {event.city && <span className="flex items-center gap-1"><MapPin className="size-3" /> {event.city}</span>}
                            {event.maxAttendees && (
                              <span className="flex items-center gap-1">
                                <Users className="size-3" /> {event._count.registrations}/{event.maxAttendees} spots
                              </span>
                            )}
                          </div>
                          <a href={`/events/${event.slug}`} className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold transition-colors" style={{ color: palette.primary }}>
                            View Details <ArrowRight className="size-3.5" />
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {past.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold mb-8" style={{ color: palette.heading, fontFamily: "var(--font-display)" }}>Past Events</h2>
                  <div className="grid md:grid-cols-3 gap-6">
                    {past.map((event) => (
                      <div key={event.id} className="rounded-xl border border-[#1B8271]/10 bg-white/60 p-5 opacity-80">
                        <span className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${statusColors[event.status] || ""}`}>
                          {event.status}
                        </span>
                        <h3 className="mt-2 font-bold text-sm" style={{ color: palette.heading }}>{event.title}</h3>
                        <p className="mt-1 text-xs" style={{ color: palette.body, opacity: 0.6 }}>{formatDate(event.eventDate)}</p>
                        {event.city && <p className="mt-1 text-xs flex items-center gap-1" style={{ color: palette.body, opacity: 0.6 }}><MapPin className="size-3" /> {event.city}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  )
}
