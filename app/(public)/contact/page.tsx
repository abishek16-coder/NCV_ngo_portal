"use client"

import { useState } from "react"
import { Mail, Phone, MapPin, Send, Clock, MessageSquare } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" })
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) { toast.error("Please fill required fields"); return }
    setSending(true)
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (data.success) {
        setSent(true)
        setForm({ name: "", email: "", phone: "", subject: "", message: "" })
        toast.success("Message sent! We'll get back to you soon.")
      } else { toast.error(data.error || "Failed to send") }
    } catch { toast.error("Failed to send message") }
    finally { setSending(false) }
  }

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#071C35] via-[#0f3d33] to-[#1B8271] py-20 sm:py-28">
        <div className="absolute inset-0 dot-grid-bg opacity-10" />
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium text-white/90 backdrop-blur-sm">
            <MessageSquare className="size-4 text-[#1B8271]" />
            Get In Touch
          </div>
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Contact <span className="text-[#1B8271]">Us</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/80">
            Have a question, want to collaborate, or need support? We would love to hear from you.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-5">
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-[#071C35]">Reach Out to Us</h2>
                <p className="mt-3 text-[#475569] leading-relaxed">
                  Whether you want to volunteer, donate, or partner with us, we are here to help.
                </p>
              </div>

              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#1B8271]/10">
                    <MapPin className="size-5 text-[#1B8271]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#071C35]">Address</h3>
                    <p className="mt-1 text-sm text-[#475569]">NCV Trust, Navi Mumbai, Maharashtra, India</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#1B8271]/10">
                    <Mail className="size-5 text-[#1B8271]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#071C35]">Email</h3>
                    <p className="mt-1 text-sm text-[#475569]">info@ncvtrust.org</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#1B8271]/10">
                    <Phone className="size-5 text-[#1B8271]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#071C35]">Phone</h3>
                    <p className="mt-1 text-sm text-[#475569]">+91 98765 43210</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#1B8271]/10">
                    <Clock className="size-5 text-[#1B8271]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#071C35]">Hours</h3>
                    <p className="mt-1 text-sm text-[#475569]">Mon - Sat: 8:00 AM - 6:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              {sent ? (
                <div className="rounded-3xl border border-green-200 bg-green-50 p-12 text-center">
                  <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-green-100">
                    <Send className="size-7 text-green-600" />
                  </div>
                  <h3 className="mt-5 text-xl font-bold text-green-800">Message Sent!</h3>
                  <p className="mt-2 text-sm text-green-600">Thank you for reaching out. We will get back to you within 24-48 hours.</p>
                  <Button className="mt-6" variant="outline" onClick={() => setSent(false)}>Send Another Message</Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="rounded-3xl border border-slate-100 bg-white p-8 shadow-lg">
                  <h3 className="text-xl font-bold text-[#071C35]">Send a Message</h3>
                  <p className="mt-1 text-sm text-[#475569]">Fill out the form below and we will respond promptly.</p>
                  <div className="mt-6 space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name <span className="text-red-500">*</span></Label>
                        <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
                        <Input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="your@email.com" required />
                      </div>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input id="phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+91 XXXXX XXXXX" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subject">Subject</Label>
                        <Input id="subject" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} placeholder="How can we help?" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Message <span className="text-red-500">*</span></Label>
                      <Textarea id="message" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Tell us more..." rows={5} required />
                    </div>
                    <Button type="submit" disabled={sending} className="w-full bg-[#1B8271] hover:bg-[#186F61]">
                      {sending ? "Sending..." : <>Send Message <Send className="ml-2 size-4" /></>}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
