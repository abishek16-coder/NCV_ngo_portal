"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { format } from "date-fns"
import { History, Loader2, Save, CheckCircle2, AlertCircle } from "lucide-react"
import { toast } from "sonner"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { TiptapEditor } from "@/components/admin/tiptap-editor"

interface CmsEditorPageProps {
  slug: string
  title: string
  initialContent?: string
  onSave?: () => void
}

interface Version {
  id: string
  version: number
  content: string
  createdAt: string
}

function SaveIndicator({
  saving,
  lastSaved,
  dirty,
}: {
  saving: boolean
  lastSaved: Date | null
  dirty: boolean
}) {
  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      {saving ? (
        <>
          <Loader2 className="size-4 animate-spin" />
          <span>Saving...</span>
        </>
      ) : lastSaved ? (
        <>
          <CheckCircle2 className="size-4 text-green-500" />
          <span>Saved at {format(lastSaved, "HH:mm:ss")}</span>
        </>
      ) : dirty ? (
        <>
          <AlertCircle className="size-4 text-amber-500" />
          <span>Unsaved changes</span>
        </>
      ) : null}
    </div>
  )
}

export function CmsEditorPage({
  slug,
  title,
  initialContent = "",
  onSave,
}: CmsEditorPageProps) {
  const [content, setContent] = useState(initialContent)
  const [saving, setSaving] = useState(false)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  const [versions, setVersions] = useState<Version[]>([])
  const [versionsOpen, setVersionsOpen] = useState(false)
  const [loadingVersions, setLoadingVersions] = useState(false)
  const [restoringId, setRestoringId] = useState<string | null>(null)

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const isInitialLoad = useRef(true)
  const dirty = content !== initialContent && !isInitialLoad.current

  useEffect(() => {
    async function loadContent() {
      try {
        const res = await fetch(`/api/cms/pages/${slug}`)
        if (res.ok) {
          const data = await res.json()
          if (data.content) {
            setContent(data.content)
          }
        }
      } catch {
        toast.error("Failed to load page content")
      } finally {
        isInitialLoad.current = false
      }
    }
    loadContent()
  }, [slug])

  useEffect(() => {
    if (isInitialLoad.current) return
    if (!dirty) return

    if (debounceRef.current) clearTimeout(debounceRef.current)

    debounceRef.current = setTimeout(async () => {
      setSaving(true)
      try {
        const res = await fetch(`/api/cms/pages/${slug}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content }),
        })
        if (!res.ok) throw new Error("Save failed")
        setLastSaved(new Date())
        onSave?.()
      } catch {
        toast.error("Failed to save changes")
      } finally {
        setSaving(false)
      }
    }, 3000)

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [content, dirty, slug, onSave])

  const fetchVersions = useCallback(async () => {
    setLoadingVersions(true)
    try {
      const res = await fetch(`/api/cms/pages/${slug}/versions`)
      if (!res.ok) throw new Error("Failed to load versions")
      const data = await res.json()
      setVersions(data)
    } catch {
      toast.error("Failed to load version history")
    } finally {
      setLoadingVersions(false)
    }
  }, [slug])

  useEffect(() => {
    if (versionsOpen) fetchVersions()
  }, [versionsOpen, fetchVersions])

  const restoreVersion = useCallback(
    async (version: Version) => {
      setRestoringId(version.id)
      try {
        const res = await fetch(
          `/api/cms/pages/${slug}/versions/${version.id}`,
          { method: "POST" }
        )
        if (!res.ok) throw new Error("Restore failed")
        setContent(version.content)
        setLastSaved(new Date())
        setVersionsOpen(false)
        toast.success(`Restored to version ${version.version}`)
      } catch {
        toast.error("Failed to restore version")
      } finally {
        setRestoringId(null)
      }
    },
    [slug]
  )

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold">{title}</h1>
          <SaveIndicator saving={saving} lastSaved={lastSaved} dirty={dirty} />
        </div>

        <Dialog open={versionsOpen} onOpenChange={setVersionsOpen}>
          <DialogTrigger
            render={
              <Button variant="outline" size="sm" />
            }
          >
            <History className="size-4" />
            Version History
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Version History</DialogTitle>
              <DialogDescription>
                Browse and restore previous versions of this page.
              </DialogDescription>
            </DialogHeader>

            <ScrollArea className="h-[300px]">
              {loadingVersions ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="size-6 animate-spin text-muted-foreground" />
                </div>
              ) : versions.length === 0 ? (
                <p className="py-8 text-center text-sm text-muted-foreground">
                  No version history available.
                </p>
              ) : (
                <div className="space-y-2">
                  {versions.map((v) => (
                    <div
                      key={v.id}
                      className="flex items-center justify-between rounded-lg border p-3"
                    >
                      <div className="flex flex-col gap-0.5">
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary">
                            v{v.version}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {format(new Date(v.createdAt), "PPP p")}
                          </span>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        disabled={restoringId === v.id}
                        onClick={() => restoreVersion(v)}
                      >
                        {restoringId === v.id ? (
                          <Loader2 className="size-3 animate-spin" />
                        ) : (
                          <Save className="size-3" />
                        )}
                        Restore
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>

            <DialogFooter showCloseButton />
          </DialogContent>
        </Dialog>
      </div>

      <TiptapEditor
        content={content}
        onChange={setContent}
        placeholder="Start editing this page..."
      />
    </div>
  )
}
