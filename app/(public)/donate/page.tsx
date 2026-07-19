"use client"

import { useState } from "react"
import { Heart, CreditCard, Banknote, CheckCircle, Shield, ArrowRight } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"

const presetAmounts = [500, 1000, 2500, 5000, 10000]

export default function DonatePage() {
  const [form, setForm] = useState({
    donorName: "", email: "", phone: "", amount: "",
    message: "", isAnonymous: false, paymentMethod: "RAZORPAY",
  })
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const amount = parseFloat(form.amount)
    if (!form.donorName || !form.email || !amount || amount <= 0) {
      toast.error("Please fill all required fields")
      return
    }
    setSending(true)
    try {
      const res = await fetch("/api/donations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, amount }),
      })
      const data = await res.json()
      if (data.success) {
        setSent(true)
        toast.success("Thank you for your generous donation!")
      } else { toast.error(data.error || "Failed to process") }
    } catch { toast.error("Failed to process donation") }
    finally { setSending(false) }
  }

  const impactItems = [
    { amount: "₹500", impact: "Provides yoga mats and supplies for 5 students for a month" },
    { amount: "₹1,000", impact: "Sponsors one online yoga session for 50 participants" },
    { amount: "₹5,000", impact: "Supports a full week of community wellness programs" },
    { amount: "₹10,000", impact: "Provides a scholarship for one student for a semester" },
  ]

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#071C35] via-[#0f3d33] to-[#1B8271] py-20 sm:py-28">
        <div className="absolute inset-0 dot-grid-bg opacity-10" />
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium text-white/90 backdrop-blur-sm">
            <Heart className="size-4 text-[#1B8271]" />
            Make a Difference
          </div>
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Your <span className="text-[#1B8271]">Donation</span> Changes Lives
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/80">
            Every contribution, big or small, helps us provide free yoga, education, and wellness programs to communities in need.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-5">
            {/* Donation Form */}
            <div className="lg:col-span-3">
              {sent ? (
                <div className="rounded-3xl border border-green-200 bg-green-50 p-12 text-center">
                  <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-green-100">
                    <CheckCircle className="size-7 text-green-600" />
                  </div>
                  <h3 className="mt-5 text-xl font-bold text-green-800">Thank You!</h3>
                  <p className="mt-2 text-sm text-green-600">Your donation of ₹{form.amount} is deeply appreciated. You will receive a confirmation email shortly.</p>
                  <Button className="mt-6" variant="outline" onClick={() => { setSent(false); setForm({ donorName: "", email: "", phone: "", amount: "", message: "", isAnonymous: false, paymentMethod: "RAZORPAY" }) }}>
                    Make Another Donation
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="rounded-3xl border border-slate-100 bg-white p-8 shadow-lg">
                  <h3 className="text-2xl font-bold text-[#071C35]">Donate Now</h3>
                  <p className="mt-2 text-sm text-[#475569]">Your generosity fuels our mission</p>

                  <div className="mt-8 space-y-6">
                    {/* Amount Selection */}
                    <div className="space-y-3">
                      <Label>Select Amount</Label>
                      <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                        {presetAmounts.map((a) => (
                          <button key={a} type="button" onClick={() => setForm({ ...form, amount: a.toString() })}
                            className={`rounded-xl border-2 py-3 text-sm font-bold transition-all ${form.amount === a.toString() ? "border-[#1B8271] bg-[#1B8271]/5 text-[#1B8271]" : "border-slate-200 text-slate-600 hover:border-slate-300"}`}>
                            ₹{a.toLocaleString("en-IN")}
                          </button>
                        ))}
                      </div>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-500">₹</span>
                        <Input type="number" placeholder="Custom amount" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })}
                          className="pl-8 text-lg font-bold" min="1" required />
                      </div>
                    </div>

                    {/* Donor Info */}
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label>Name <span className="text-red-500">*</span></Label>
                        <Input value={form.donorName} onChange={(e) => setForm({ ...form, donorName: e.target.value })} required />
                      </div>
                      <div className="space-y-2">
                        <Label>Email <span className="text-red-500">*</span></Label>
                        <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
                      </div>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label>Phone</Label>
                        <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                      </div>
                      <div className="space-y-2">
                        <Label>Payment Method</Label>
                        <div className="flex gap-2">
                          <button type="button" onClick={() => setForm({ ...form, paymentMethod: "RAZORPAY" })}
                            className={`flex-1 flex items-center justify-center gap-2 rounded-xl border-2 py-2.5 text-sm font-medium transition-all ${form.paymentMethod === "RAZORPAY" ? "border-[#1B8271] bg-[#1B8271]/5 text-[#1B8271]" : "border-slate-200 text-slate-600"}`}>
                            <CreditCard className="size-4" /> Online
                          </button>
                          <button type="button" onClick={() => setForm({ ...form, paymentMethod: "BANK_TRANSFER" })}
                            className={`flex-1 flex items-center justify-center gap-2 rounded-xl border-2 py-2.5 text-sm font-medium transition-all ${form.paymentMethod === "BANK_TRANSFER" ? "border-[#1B8271] bg-[#1B8271]/5 text-[#1B8271]" : "border-slate-200 text-slate-600"}`}>
                            <Banknote className="size-4" /> Bank
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Message (Optional)</Label>
                      <Textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Leave a note with your donation..." rows={2} />
                    </div>

                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" checked={form.isAnonymous} onChange={(e) => setForm({ ...form, isAnonymous: e.target.checked })} className="size-4 rounded" />
                      <span className="text-sm text-[#475569]">Make this donation anonymous</span>
                    </label>

                    <Button type="submit" disabled={sending} className="w-full bg-[#1B8271] hover:bg-[#186F61] py-6 text-base">
                      {sending ? "Processing..." : <>Donate {form.amount ? `₹${parseFloat(form.amount).toLocaleString("en-IN")}` : ""} <ArrowRight className="ml-2 size-4" /></>}
                    </Button>

                    <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
                      <Shield className="size-3.5" />
                      Secure & encrypted payment via Razorpay
                    </div>
                  </div>
                </form>
              )}
            </div>

            {/* Impact Sidebar */}
            <div className="lg:col-span-2 space-y-6">
              <div className="rounded-2xl border border-[#D4EDE9] bg-[#F2FAFA] p-6">
                <h3 className="text-lg font-bold text-[#071C35]">Your Impact</h3>
                <p className="mt-2 text-sm text-[#475569]">See how your donation makes a difference</p>
                <div className="mt-4 space-y-4">
                  {impactItems.map((item) => (
                    <div key={item.amount} className="flex items-start gap-3">
                      <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#1B8271]/10 text-xs font-bold text-[#1B8271]">
                        {item.amount.replace("₹", "")}
                      </div>
                      <p className="text-sm text-[#475569]">{item.impact}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-bold text-[#071C35]">Tax Benefits</h3>
                <p className="mt-2 text-sm text-[#475569] leading-relaxed">
                  All donations to NCV Trust are eligible for tax deduction under Section 80G of the Income Tax Act. You will receive your donation receipt via email.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-bold text-[#071C35]">Other Ways to Give</h3>
                <ul className="mt-3 space-y-2 text-sm text-[#475569]">
                  <li className="flex items-center gap-2"><Heart className="size-3.5 text-[#1B8271] shrink-0" /> Monthly recurring donations</li>
                  <li className="flex items-center gap-2"><Heart className="size-3.5 text-[#1B8271] shrink-0" /> Corporate partnerships</li>
                  <li className="flex items-center gap-2"><Heart className="size-3.5 text-[#1B8271] shrink-0" /> In-kind donations (supplies, equipment)</li>
                  <li className="flex items-center gap-2"><Heart className="size-3.5 text-[#1B8271] shrink-0" /> Legacy giving</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
