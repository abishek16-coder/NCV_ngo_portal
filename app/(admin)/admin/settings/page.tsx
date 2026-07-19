"use client"

import { useEffect, useState, useCallback } from "react"
import { Settings, Save, Loader2 } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Skeleton } from "@/components/ui/skeleton"

const settingGroups = [
  {
    title: "General",
    description: "Basic site information",
    fields: [
      { key: "site_name", label: "Site Name", type: "text" as const },
      { key: "site_tagline", label: "Tagline", type: "text" as const },
      { key: "site_description", label: "Site Description", type: "textarea" as const },
      { key: "contact_email", label: "Contact Email", type: "text" as const },
      { key: "contact_phone", label: "Contact Phone", type: "text" as const },
      { key: "contact_address", label: "Contact Address", type: "textarea" as const },
    ],
  },
  {
    title: "Social Media",
    description: "Social media links",
    fields: [
      { key: "social_facebook", label: "Facebook URL", type: "text" as const },
      { key: "social_twitter", label: "Twitter/X URL", type: "text" as const },
      { key: "social_instagram", label: "Instagram URL", type: "text" as const },
      { key: "social_youtube", label: "YouTube URL", type: "text" as const },
      { key: "social_linkedin", label: "LinkedIn URL", type: "text" as const },
    ],
  },
  {
    title: "Donations",
    description: "Payment configuration",
    fields: [
      { key: "razorpay_key_id", label: "Razorpay Key ID", type: "text" as const },
      { key: "razorpay_key_secret", label: "Razorpay Key Secret", type: "text" as const },
      { key: "upi_id", label: "UPI ID", type: "text" as const },
      { key: "bank_account_details", label: "Bank Account Details", type: "textarea" as const },
    ],
  },
  {
    title: "Homepage",
    description: "Homepage content sections",
    fields: [
      { key: "hero_title", label: "Hero Title", type: "text" as const },
      { key: "hero_subtitle", label: "Hero Subtitle", type: "textarea" as const },
      { key: "cta_text", label: "CTA Button Text", type: "text" as const },
      { key: "cta_link", label: "CTA Button Link", type: "text" as const },
      { key: "about_section_text", label: "About Section Text", type: "textarea" as const },
    ],
  },
]

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const fetchSettings = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/settings")
      const data = await res.json()
      if (data.success) setSettings(data.data)
    } catch { toast.error("Failed to load settings") }
    finally { setLoading(false) }
  }, [])

  useEffect(() => { fetchSettings() }, [fetchSettings])

  const handleSave = async () => {
    setSaving(true)
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      })
      const data = await res.json()
      if (data.success) toast.success("Settings saved")
      else toast.error(data.error)
    } catch { toast.error("Failed to save") }
    finally { setSaving(false) }
  }

  const updateField = (key: string, value: string) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-40 w-full rounded-xl" />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
          <p className="text-sm text-muted-foreground">Configure your site settings</p>
        </div>
        <Button onClick={handleSave} disabled={saving}>
          {saving ? <Loader2 className="size-4 mr-2 animate-spin" /> : <Save className="size-4 mr-2" />}
          Save Changes
        </Button>
      </div>

      {settingGroups.map((group) => (
        <Card key={group.title}>
          <CardHeader>
            <CardTitle>{group.title}</CardTitle>
            <CardDescription>{group.description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {group.fields.map((field) => (
              <div key={field.key} className="space-y-2">
                <Label htmlFor={field.key}>{field.label}</Label>
                {field.type === "textarea" ? (
                  <Textarea
                    id={field.key}
                    value={settings[field.key] || ""}
                    onChange={(e) => updateField(field.key, e.target.value)}
                    rows={3}
                  />
                ) : (
                  <Input
                    id={field.key}
                    value={settings[field.key] || ""}
                    onChange={(e) => updateField(field.key, e.target.value)}
                  />
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
