"use client"

import { useState } from "react"
import { HandHeart, Send, CheckCircle, Users, Clock, MapPin, Heart } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function VolunteerPage() {
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "", city: "",
    occupation: "", skills: "", availability: "", reason: "",
  })
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.firstName || !form.lastName || !form.email) { toast.error("Please fill required fields"); return }
    setSending(true)
    try {
      const res = await fetch("/api/volunteers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (data.success) {
        setSent(true)
        toast.success("Thank you for volunteering!")
      } else { toast.error(data.error || "Failed to submit") }
    } catch { toast.error("Failed to submit") }
    finally { setSending(false) }
  }

  const benefits = [
    { icon: Heart, title: "Make an Impact", desc: "Directly contribute to improving lives in your community." },
    { icon: Users, title: "Build Connections", desc: "Meet like-minded people who share your passion for service." },
    { icon: Clock, title: "Flexible Schedule", desc: "Volunteer at times that work for your lifestyle." },
    { icon: MapPin, title: "Local & Remote", desc: "Help from your neighborhood or anywhere in the world." },
  ]

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#071C35] via-[#0f3d33] to-[#1B8271] py-20 sm:py-28">
        <div className="absolute inset-0 dot-grid-bg opacity-10" />
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium text-white/90 backdrop-blur-sm">
            <HandHeart className="size-4 text-[#FF7468]" />
            Volunteer With Us
          </div>
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Be the <span className="text-[#FF7468]">Change</span> You Wish to See
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/80">
            Join our community of dedicated volunteers and help us create a healthier, happier world through yoga, education, and service.
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-[#071C35] sm:text-4xl">Why Volunteer?</h2>
            <p className="mx-auto mt-4 max-w-xl text-[#475569]">Volunteering with NCV Trust is a rewarding experience</p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((b) => (
              <div key={b.title} className="text-center rounded-2xl border border-slate-100 p-6">
                <div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-[#1B8271]/10">
                  <b.icon className="size-6 text-[#1B8271]" />
                </div>
                <h3 className="mt-4 text-lg font-bold text-[#071C35]">{b.title}</h3>
                <p className="mt-2 text-sm text-[#475569]">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <section className="py-16 sm:py-24 bg-[#F8FAFB]">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          {sent ? (
            <div className="rounded-3xl border border-green-200 bg-green-50 p-12 text-center">
              <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-green-100">
                <CheckCircle className="size-7 text-green-600" />
              </div>
              <h3 className="mt-5 text-xl font-bold text-green-800">Welcome Aboard!</h3>
              <p className="mt-2 text-sm text-green-600">Thank you for volunteering with NCV Trust. Our team will review your application and get in touch within 3-5 business days.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="rounded-3xl border border-slate-100 bg-white p-8 shadow-lg">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-[#071C35]">Volunteer Registration</h3>
                <p className="mt-2 text-sm text-[#475569]">Fill out this form to join our volunteer network</p>
              </div>
              <div className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>First Name <span className="text-red-500">*</span></Label>
                    <Input value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} required />
                  </div>
                  <div className="space-y-2">
                    <Label>Last Name <span className="text-red-500">*</span></Label>
                    <Input value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} required />
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Email <span className="text-red-500">*</span></Label>
                    <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
                  </div>
                  <div className="space-y-2">
                    <Label>Phone</Label>
                    <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>City</Label>
                    <Input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <Label>Occupation</Label>
                    <Input value={form.occupation} onChange={(e) => setForm({ ...form, occupation: e.target.value })} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Skills & Interests</Label>
                  <Input value={form.skills} onChange={(e) => setForm({ ...form, skills: e.target.value })} placeholder="e.g. Yoga, Teaching, Event Management, Social Media" />
                </div>
                <div className="space-y-2">
                  <Label>Availability</Label>
                  <Input value={form.availability} onChange={(e) => setForm({ ...form, availability: e.target.value })} placeholder="e.g. Weekends, Evenings, Flexible" />
                </div>
                <div className="space-y-2">
                  <Label>Why do you want to volunteer?</Label>
                  <Textarea value={form.reason} onChange={(e) => setForm({ ...form, reason: e.target.value })} rows={3} />
                </div>
                <Button type="submit" disabled={sending} className="w-full bg-[#1B8271] hover:bg-[#186F61]">
                  {sending ? "Submitting..." : <>Submit Application <Send className="ml-2 size-4" /></>}
                </Button>
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  )
}
