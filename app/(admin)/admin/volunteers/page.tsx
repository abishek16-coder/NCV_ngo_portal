"use client"

import { useEffect, useState, useCallback } from "react"
import { format } from "date-fns"
import { HandHeart, Mail, Phone, MapPin } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table"
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
} from "@/components/ui/dialog"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"

interface Volunteer {
  id: string; firstName: string; lastName: string; email: string; phone: string | null
  city: string | null; occupation: string | null; skills: string | null
  status: "ACTIVE" | "INACTIVE" | "ON_LEAVE" | "REMOVED"; createdAt: string
}

function StatusBadge({ status }: { status: Volunteer["status"] }) {
  const colors: Record<Volunteer["status"], string> = {
    ACTIVE: "bg-green-500/10 text-green-700 border-green-500/20 dark:text-green-400",
    INACTIVE: "bg-slate-500/10 text-slate-700 border-slate-500/20",
    ON_LEAVE: "bg-amber-500/10 text-amber-700 border-amber-500/20",
    REMOVED: "bg-red-500/10 text-red-700 border-red-500/20",
  }
  return <Badge variant="outline" className={colors[status]}>{status.replace("_", " ")}</Badge>
}

export default function AdminVolunteersPage() {
  const [volunteers, setVolunteers] = useState<Volunteer[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [detailTarget, setDetailTarget] = useState<Volunteer | null>(null)

  const fetchVolunteers = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({ limit: "100" })
      if (search) params.set("search", search)
      if (statusFilter !== "all") params.set("status", statusFilter)
      const res = await fetch(`/api/volunteers?${params}`)
      const data = await res.json()
      if (data.success) setVolunteers(data.data)
    } catch { toast.error("Failed to load volunteers") }
    finally { setLoading(false) }
  }, [search, statusFilter])

  useEffect(() => { fetchVolunteers() }, [fetchVolunteers])

  const updateStatus = async (id: string, status: Volunteer["status"]) => {
    try {
      const res = await fetch(`/api/volunteers/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      })
      const data = await res.json()
      if (data.success) { toast.success("Status updated"); fetchVolunteers() }
      else { toast.error(data.error) }
    } catch { toast.error("Failed to update") }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Volunteers</h2>
        <p className="text-sm text-muted-foreground">Manage volunteer registrations</p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Input placeholder="Search volunteers..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-64" />
        <Select value={statusFilter} onValueChange={(v) => { if (v) setStatusFilter(v) }}>
          <SelectTrigger className="w-40"><SelectValue placeholder="All statuses" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="ACTIVE">Active</SelectItem>
            <SelectItem value="INACTIVE">Inactive</SelectItem>
            <SelectItem value="ON_LEAVE">On Leave</SelectItem>
            <SelectItem value="REMOVED">Removed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {loading ? (
        <Card><CardContent className="space-y-3 py-6">{Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-12 w-full" />)}</CardContent></Card>
      ) : volunteers.length === 0 ? (
        <Card><CardContent className="flex flex-col items-center justify-center py-12">
          <HandHeart className="mb-4 size-12 text-muted-foreground/50" />
          <p className="font-medium">No volunteers found</p>
        </CardContent></Card>
      ) : (
        <Card><CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Skills</TableHead>
                <TableHead>City</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {volunteers.map((v) => (
                <TableRow key={v.id}>
                  <TableCell className="font-medium">{v.firstName} {v.lastName}</TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-0.5">
                      <span className="flex items-center gap-1 text-xs text-muted-foreground"><Mail className="size-3" /> {v.email}</span>
                      {v.phone && <span className="flex items-center gap-1 text-xs text-muted-foreground"><Phone className="size-3" /> {v.phone}</span>}
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground max-w-[150px] truncate">{v.skills || "—"}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{v.city || "—"}</TableCell>
                  <TableCell><StatusBadge status={v.status} /></TableCell>
                  <TableCell className="text-sm text-muted-foreground">{format(new Date(v.createdAt), "MMM d, yyyy")}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="icon-sm" onClick={() => setDetailTarget(v)}>👁</Button>
                      <Select value={v.status} onValueChange={(val) => { if (val) updateStatus(v.id, val as Volunteer["status"]) }}>
                        <SelectTrigger className="w-8 h-8 border-0 bg-transparent"><span className="text-xs">⋯</span></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ACTIVE">Active</SelectItem>
                          <SelectItem value="INACTIVE">Inactive</SelectItem>
                          <SelectItem value="ON_LEAVE">On Leave</SelectItem>
                          <SelectItem value="REMOVED">Removed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent></Card>
      )}

      <Dialog open={!!detailTarget} onOpenChange={(open) => { if (!open) setDetailTarget(null) }}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>Volunteer Details</DialogTitle></DialogHeader>
          {detailTarget && (
            <div className="space-y-3 py-2">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div><span className="text-muted-foreground">Name:</span> <span className="font-medium">{detailTarget.firstName} {detailTarget.lastName}</span></div>
                <div><span className="text-muted-foreground">Email:</span> <span className="font-medium">{detailTarget.email}</span></div>
                <div><span className="text-muted-foreground">Phone:</span> <span className="font-medium">{detailTarget.phone || "—"}</span></div>
                <div><span className="text-muted-foreground">City:</span> <span className="font-medium">{detailTarget.city || "—"}</span></div>
                <div><span className="text-muted-foreground">Occupation:</span> <span className="font-medium">{detailTarget.occupation || "—"}</span></div>
                <div><span className="text-muted-foreground">Status:</span> <StatusBadge status={detailTarget.status} /></div>
              </div>
              {detailTarget.skills && <div><span className="text-xs text-muted-foreground">Skills:</span><p className="text-sm mt-1">{detailTarget.skills}</p></div>}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
