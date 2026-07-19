"use client"

import { useEffect, useState, useCallback } from "react"
import { format } from "date-fns"
import { Plus, Trash2, Users, Shield } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table"
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"

interface User {
  id: string; email: string; firstName: string; lastName: string
  role: "SUPER_ADMIN" | "CONTENT_MANAGER" | "VOLUNTEER_COORDINATOR"
  isActive: boolean; lastLoginAt: string | null; createdAt: string
}

function RoleBadge({ role }: { role: User["role"] }) {
  const colors: Record<User["role"], string> = {
    SUPER_ADMIN: "bg-purple-500/10 text-purple-700 border-purple-500/20 dark:text-purple-400",
    CONTENT_MANAGER: "bg-blue-500/10 text-blue-700 border-blue-500/20 dark:text-blue-400",
    VOLUNTEER_COORDINATOR: "bg-teal-500/10 text-teal-700 border-teal-500/20 dark:text-teal-400",
  }
  return <Badge variant="outline" className={colors[role]}>{role.replace("_", " ")}</Badge>
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [createOpen, setCreateOpen] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<User | null>(null)
  const [form, setForm] = useState({ email: "", password: "", firstName: "", lastName: "", phone: "", role: "CONTENT_MANAGER" as User["role"] })
  const [saving, setSaving] = useState(false)

  const fetchUsers = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/users")
      const data = await res.json()
      if (data.success) setUsers(data.data)
    } catch { toast.error("Failed to load") }
    finally { setLoading(false) }
  }, [])

  useEffect(() => { fetchUsers() }, [fetchUsers])

  const handleCreate = async () => {
    if (!form.email || !form.password || !form.firstName || !form.lastName) { toast.error("All fields required"); return }
    setSaving(true)
    try {
      const res = await fetch("/api/admin/users", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (data.success) { toast.success("User created"); setCreateOpen(false); setForm({ email: "", password: "", firstName: "", lastName: "", phone: "", role: "CONTENT_MANAGER" }); fetchUsers() }
      else { toast.error(data.error) }
    } catch { toast.error("Failed") }
    finally { setSaving(false) }
  }

  const handleDelete = async () => {
    if (!deleteTarget) return
    try {
      const res = await fetch(`/api/admin/users/${deleteTarget.id}`, { method: "DELETE" })
      const data = await res.json()
      if (data.success) { toast.success("Deleted"); setDeleteTarget(null); fetchUsers() }
    } catch { toast.error("Failed") }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Users</h2>
          <p className="text-sm text-muted-foreground">Manage admin users and roles</p>
        </div>
        <Dialog open={createOpen} onOpenChange={(open) => { setCreateOpen(open); if (!open) setForm({ email: "", password: "", firstName: "", lastName: "", phone: "", role: "CONTENT_MANAGER" }) }}>
          <DialogTrigger render={<Button onClick={() => setCreateOpen(true)} />}>
            <Plus className="size-4" /> Add User
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Create User</DialogTitle></DialogHeader>
            <div className="grid gap-4 py-2">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2"><Label>First Name</Label><Input value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} /></div>
                <div className="space-y-2"><Label>Last Name</Label><Input value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} /></div>
              </div>
              <div className="space-y-2"><Label>Email</Label><Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></div>
              <div className="space-y-2"><Label>Password</Label><Input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} /></div>
              <div className="space-y-2"><Label>Phone</Label><Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></div>
              <div className="space-y-2">
                <Label>Role</Label>
                <Select value={form.role} onValueChange={(v) => { if (v) setForm({ ...form, role: v as User["role"] }) }}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SUPER_ADMIN">Super Admin</SelectItem>
                    <SelectItem value="CONTENT_MANAGER">Content Manager</SelectItem>
                    <SelectItem value="VOLUNTEER_COORDINATOR">Volunteer Coordinator</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setCreateOpen(false)}>Cancel</Button>
              <Button onClick={handleCreate} disabled={saving}>{saving ? "Creating..." : "Create"}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <Card><CardContent className="space-y-3 py-6">{Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-12 w-full" />)}</CardContent></Card>
      ) : (
        <Card><CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Login</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((u) => (
                <TableRow key={u.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="flex size-8 items-center justify-center rounded-full bg-gradient-to-br from-[#FF7468] to-[#F64F40] text-[10px] font-bold text-white">
                        {u.firstName[0]}{u.lastName[0]}
                      </div>
                      <div>
                        <p className="font-medium text-sm">{u.firstName} {u.lastName}</p>
                        <p className="text-xs text-muted-foreground">{u.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell><RoleBadge role={u.role} /></TableCell>
                  <TableCell><Badge variant={u.isActive ? "default" : "secondary"} className={u.isActive ? "bg-green-500/10 text-green-700 dark:text-green-400" : ""}>{u.isActive ? "Active" : "Inactive"}</Badge></TableCell>
                  <TableCell className="text-sm text-muted-foreground">{u.lastLoginAt ? format(new Date(u.lastLoginAt), "MMM d, h:mm a") : "Never"}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{format(new Date(u.createdAt), "MMM d, yyyy")}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon-sm" onClick={() => setDeleteTarget(u)}><Trash2 className="size-4 text-destructive" /></Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent></Card>
      )}

      <Dialog open={!!deleteTarget} onOpenChange={(open) => { if (!open) setDeleteTarget(null) }}>
        <DialogContent>
          <DialogHeader><DialogTitle>Delete User</DialogTitle><DialogDescription>Are you sure you want to delete {deleteTarget?.firstName} {deleteTarget?.lastName}?</DialogDescription></DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteTarget(null)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDelete}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
