"use client"

import { useEffect, useState, useCallback } from "react"
import { Loader2, Save } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

interface SectionEntry {
  key: string
  value: string
}

const DEFAULT_SECTIONS: SectionEntry[] = [
  { key: "hero_title", value: "Welcome to NCV Trust" },
  { key: "hero_subtitle", value: "Empowering communities through education and development" },
  { key: "hero_cta_text", value: "Get Involved" },
  { key: "about_title", value: "About Us" },
  { key: "about_description", value: "NCV Trust is a non-profit organization dedicated to education, community development, and social welfare." },
  { key: "mission_title", value: "Our Mission" },
  { key: "mission_description", value: "To empower underserved communities through quality education, sustainable development programs, and social welfare initiatives." },
  { key: "vision_title", value: "Our Vision" },
  { key: "vision_description", value: "A world where every individual has access to education and opportunities for a better life." },
  { key: "impact_stat_beneficiaries", value: "10,000+" },
  { key: "impact_stat_projects", value: "50+" },
  { key: "impact_stat_communities", value: "100+" },
  { key: "impact_stat_years", value: "15" },
]

function formatLabel(key: string): string {
  return key
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
}

function isLongField(key: string): boolean {
  return /description|subtitle|about|mission|vision/i.test(key)
}

export default function CmsSectionsPage() {
  const [sections, setSections] = useState<SectionEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const fetchSections = useCallback(async () => {
    try {
      const res = await fetch("/api/cms/sections")
      const data = await res.json()
      if (data.success) {
        const fetched = data.data as Record<string, string>
        const entries: SectionEntry[] = Object.entries(fetched).map(
          ([key, value]) => ({ key, value })
        )
        if (entries.length === 0) {
          setSections(DEFAULT_SECTIONS)
        } else {
          setSections(entries)
        }
      }
    } catch {
      toast.error("Failed to load sections")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchSections()
  }, [fetchSections])

  const updateValue = (key: string, value: string) => {
    setSections((prev) =>
      prev.map((s) => (s.key === key ? { ...s, value } : s))
    )
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const res = await fetch("/api/cms/sections", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sections }),
      })
      const data = await res.json()
      if (data.success) {
        toast.success("Sections saved successfully")
      } else {
        toast.error(data.error || "Failed to save sections")
      }
    } catch {
      toast.error("Failed to save sections")
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Site Sections</h2>
          <p className="text-sm text-muted-foreground">
            Edit site-wide content sections displayed on the public website
          </p>
        </div>
        <Button onClick={handleSave} disabled={saving || loading}>
          {saving ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <Save className="size-4" />
          )}
          Save All
        </Button>
      </div>

      {loading ? (
        <div className="grid gap-4 md:grid-cols-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i}>
              <CardContent className="pt-6">
                <Skeleton className="mb-3 h-4 w-24" />
                <Skeleton className="h-10 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {sections.map((section, idx) => (
            <div key={section.key}>
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">
                    {formatLabel(section.key)}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Label className="text-xs text-muted-foreground">
                    {section.key}
                  </Label>
                  {isLongField(section.key) ? (
                    <Textarea
                      value={section.value}
                      onChange={(e) =>
                        updateValue(section.key, e.target.value)
                      }
                      rows={3}
                      className="mt-2"
                    />
                  ) : (
                    <Input
                      value={section.value}
                      onChange={(e) =>
                        updateValue(section.key, e.target.value)
                      }
                      className="mt-2"
                    />
                  )}
                </CardContent>
              </Card>
              {(idx + 1) % 4 === 0 && idx < sections.length - 1 && (
                <Separator className="col-span-full my-2 md:hidden" />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
