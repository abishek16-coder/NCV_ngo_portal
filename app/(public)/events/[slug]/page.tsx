"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Calendar, MapPin, Clock, Users, ArrowLeft, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TrustBackground } from "@/components/public/trust-background"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"

interface Event {
  id: string; title: string; slug: string; description: string
  shortDescription: string | null; eventDate: string; endDate: string | null
  startTime: string | null; endTime: string | null; venue: string | null
  address: string | null; city: string | null; status: string
  maxAttendees: number | null; _count: { registrations: number }
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-IN", { weekday: "long", month: "long", day: "numeric", year: "numeric" })
}

export default function EventDetailPage() {
  const params = useParams()
  const slug = params.slug as string
  const [event, setEvent] = useState<Event | null>(null)
  const [loading, setLoading] = useState(true)
  const [registered, setRegistered] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "", city: "", organization: "", notes: "" })

  useEffect(() => {
    fetch(`/api/events/${slug}`)
      .then((r) => r.json())
      .then((d) => { if (d.success) setEvent(d.data) })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [slug])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.firstName.trim() || !form.lastName.trim() || !form.email.trim()) {
      toast.error("Please fill in all required fields")
      return
    }
    setSubmitting(true)
    try {
      const res = await fetch(`/api/events/${slug}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (data.success) {
        setRegistered(true)
        toast.success("Registration successful!")
      } else {
        toast.error(data.error || "Registration failed")
      }
    } catch {
      toast.error("Something went wrong. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="h-64 bg-slate-100 animate-pulse" />
        <div className="mx-auto max-w-3xl px-4 py-12 space-y-6">
          <div className="h-8 w-64 bg-slate-100 rounded animate-pulse" />
          <div className="h-4 w-full bg-slate-100 rounded animate-pulse" />
          <div className="h-4 w-3/4 bg-slate-100 rounded animate-pulse" />
        </div>
      </div>
    )
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center">
        <p className="text-lg font-medium text-slate-600">Event not found</p>
        <Link href="/events" className="mt-4 text-sm font-semibold text-[#1B8271] hover:underline">Back to Events</Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <TrustBackground />
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0f3d33] via-[#1B8271] to-[#0a5e4e] py-16 sm:py-20">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "40px 40px" }} />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Link href="/events" className="inline-flex items-center gap-1.5 text-sm text-white/70 hover:text-white transition-colors mb-6">
            <ArrowLeft className="size-4" /> All Events
          </Link>
          <span className={`inline-block rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ${event.status === "UPCOMING" ? "bg-amber-500/20 text-amber-300" : event.status === "COMPLETED" ? "bg-blue-500/20 text-blue-300" : "bg-green-500/20 text-green-300"}`}>
            {event.status}
          </span>
          <h1 className="mt-4 text-3xl font-bold text-white sm:text-4xl">{event.title}</h1>
          <div className="mt-4 flex flex-wrap items-center gap-5 text-sm text-white/70">
            <span className="flex items-center gap-1.5"><Calendar className="size-4" /> {formatDate(event.eventDate)}</span>
            {event.venue && <span className="flex items-center gap-1.5"><MapPin className="size-4" /> {event.venue}{event.city ? `, ${event.city}` : ""}</span>}
            {event.startTime && <span className="flex items-center gap-1.5"><Clock className="size-4" /> {event.startTime}{event.endTime ? ` - ${event.endTime}` : ""}</span>}
            {event.maxAttendees && <span className="flex items-center gap-1.5"><Users className="size-4" /> {event._count.registrations}/{event.maxAttendees} registered</span>}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-5">
            <div className="lg:col-span-3 space-y-6">
              <h2 className="text-xl font-bold text-[#071C35]">About This Event</h2>
              <p className="text-[#475569] leading-relaxed whitespace-pre-line">{event.description}</p>
            </div>

            <div className="lg:col-span-2">
              {registered ? (
                <div className="rounded-2xl border border-green-200 bg-green-50 p-8 text-center">
                  <CheckCircle className="mx-auto size-12 text-green-500" />
                  <h3 className="mt-4 text-lg font-bold text-green-800">You&apos;re Registered!</h3>
                  <p className="mt-2 text-sm text-green-700">We look forward to seeing you at the event. Check your email for confirmation details.</p>
                  <Link href="/events" className="mt-4 inline-block text-sm font-semibold text-green-600 hover:underline">Browse more events</Link>
                </div>
              ) : event.status !== "UPCOMING" ? (
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8 text-center">
                  <p className="text-sm font-medium text-slate-500">Registration is {event.status === "COMPLETED" ? "closed" : "not available"} for this event.</p>
                </div>
              ) : event.maxAttendees && event._count.registrations >= event.maxAttendees ? (
                <div className="rounded-2xl border border-amber-200 bg-amber-50 p-8 text-center">
                  <p className="text-sm font-medium text-amber-700">This event is fully booked.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
                  <h3 className="text-lg font-bold text-[#071C35]">Register for This Event</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <Label htmlFor="firstName" className="text-sm">First Name *</Label>
                      <Input id="firstName" value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} required />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="lastName" className="text-sm">Last Name *</Label>
                      <Input id="lastName" value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} required />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="email" className="text-sm">Email *</Label>
                    <Input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <Label htmlFor="phone" className="text-sm">Phone</Label>
                      <Input id="phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="city" className="text-sm">City</Label>
                      <Input id="city" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="organization" className="text-sm">Organization</Label>
                    <Input id="organization" value={form.organization} onChange={(e) => setForm({ ...form, organization: e.target.value })} />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="notes" className="text-sm">Notes</Label>
                    <Textarea id="notes" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} rows={3} />
                  </div>
                  <Button type="submit" disabled={submitting} className="w-full" style={{ background: "linear-gradient(135deg, #1B8271 0%, #186F61 100%)" }}>
                    {submitting ? "Registering..." : "Register Now"}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
