"use client"

import { useEffect, useState, useCallback } from "react"
import { format } from "date-fns"
import { Shield } from "lucide-react"
import { toast } from "sonner"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"

interface AuditLog {
  id: string; action: string; entity: string | null; entityId: string | null
  details: string | null; ipAddress: string | null; createdAt: string
  user: { firstName: string; lastName: string; email: string }
}

const actionColors: Record<string, string> = {
  LOGIN: "bg-green-500/10 text-green-700",
  LOGOUT: "bg-slate-500/10 text-slate-700",
  CREATE: "bg-blue-500/10 text-blue-700",
  UPDATE: "bg-amber-500/10 text-amber-700",
  DELETE: "bg-red-500/10 text-red-700",
}

export default function AdminAuditLogsPage() {
  const [logs, setLogs] = useState<AuditLog[]>([])
  const [loading, setLoading] = useState(true)
  const [actionFilter, setActionFilter] = useState("all")
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const fetchLogs = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({ page: page.toString(), limit: "30" })
      if (actionFilter !== "all") params.set("action", actionFilter)
      const res = await fetch(`/api/admin/audit-logs?${params}`)
      const data = await res.json()
      if (data.success) {
        setLogs(data.data)
        setTotalPages(data.pagination.totalPages)
      }
    } catch { toast.error("Failed to load") }
    finally { setLoading(false) }
  }, [page, actionFilter])

  useEffect(() => { fetchLogs() }, [fetchLogs])

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Audit Logs</h2>
        <p className="text-sm text-muted-foreground">Track all admin actions</p>
      </div>

      <div className="flex items-center gap-3">
        <Select value={actionFilter} onValueChange={(v) => { setActionFilter(v); setPage(1) }}>
          <SelectTrigger className="w-40"><SelectValue placeholder="All actions" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Actions</SelectItem>
            <SelectItem value="LOGIN">Login</SelectItem>
            <SelectItem value="LOGOUT">Logout</SelectItem>
            <SelectItem value="CREATE">Create</SelectItem>
            <SelectItem value="UPDATE">Update</SelectItem>
            <SelectItem value="DELETE">Delete</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {loading ? (
        <Card><CardContent className="space-y-3 py-6">{Array.from({ length: 10 }).map((_, i) => <Skeleton key={i} className="h-10 w-full" />)}</CardContent></Card>
      ) : logs.length === 0 ? (
        <Card><CardContent className="flex flex-col items-center justify-center py-12">
          <Shield className="mb-4 size-12 text-muted-foreground/50" />
          <p className="font-medium">No audit logs</p>
        </CardContent></Card>
      ) : (
        <Card><CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Action</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Entity</TableHead>
                <TableHead>Details</TableHead>
                <TableHead>IP</TableHead>
                <TableHead>Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {logs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell>
                    <Badge variant="outline" className={actionColors[log.action] || ""}>{log.action}</Badge>
                  </TableCell>
                  <TableCell className="text-sm">{log.user.firstName} {log.user.lastName}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{log.entity || "—"}</TableCell>
                  <TableCell className="text-xs text-muted-foreground max-w-[200px] truncate">{log.details || "—"}</TableCell>
                  <TableCell className="text-xs text-muted-foreground font-mono">{log.ipAddress || "—"}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">{format(new Date(log.createdAt), "MMM d, h:mm a")}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent></Card>
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => setPage(page - 1)}>Previous</Button>
          <span className="text-sm text-muted-foreground">Page {page} of {totalPages}</span>
          <Button variant="outline" size="sm" disabled={page >= totalPages} onClick={() => setPage(page + 1)}>Next</Button>
        </div>
      )}
    </div>
  )
}
