"use client"

import { useEffect, useState, useCallback } from "react"
import { format } from "date-fns"
import { Heart, Search } from "lucide-react"
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
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"

interface Donation {
  id: string; donorName: string; email: string; phone: string | null
  amount: number; paymentMethod: string; status: "PENDING" | "COMPLETED" | "FAILED" | "REFUNDED"
  message: string | null; isAnonymous: boolean; createdAt: string
}

function StatusBadge({ status }: { status: Donation["status"] }) {
  const colors: Record<Donation["status"], string> = {
    PENDING: "bg-amber-500/10 text-amber-700 border-amber-500/20",
    COMPLETED: "bg-green-500/10 text-green-700 border-green-500/20 dark:text-green-400",
    FAILED: "bg-red-500/10 text-red-700 border-red-500/20",
    REFUNDED: "bg-slate-500/10 text-slate-700 border-slate-500/20",
  }
  return <Badge variant="outline" className={colors[status]}>{status}</Badge>
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(amount)
}

export default function AdminDonationsPage() {
  const [donations, setDonations] = useState<Donation[]>([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [totalAmount, setTotalAmount] = useState(0)
  const [totalCount, setTotalCount] = useState(0)

  const fetchDonations = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({ limit: "100" })
      if (statusFilter !== "all") params.set("status", statusFilter)
      const res = await fetch(`/api/donations?${params}`)
      const data = await res.json()
      if (data.success) {
        setDonations(data.data)
        setTotalAmount(data.data.filter((d: Donation) => d.status === "COMPLETED").reduce((sum: number, d: Donation) => sum + d.amount, 0))
        setTotalCount(data.data.filter((d: Donation) => d.status === "COMPLETED").length)
      }
    } catch { toast.error("Failed to load donations") }
    finally { setLoading(false) }
  }, [statusFilter])

  useEffect(() => { fetchDonations() }, [fetchDonations])

  const updateStatus = async (id: string, status: Donation["status"]) => {
    try {
      const res = await fetch(`/api/donations/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      })
      const data = await res.json()
      if (data.success) { toast.success("Status updated"); fetchDonations() }
      else { toast.error(data.error) }
    } catch { toast.error("Failed to update") }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Donations</h2>
        <p className="text-sm text-muted-foreground">Track and manage donations</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground uppercase tracking-wide">Total Raised</p>
            <p className="text-2xl font-bold text-green-600 mt-1">{formatCurrency(totalAmount)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground uppercase tracking-wide">Completed</p>
            <p className="text-2xl font-bold mt-1">{totalCount}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground uppercase tracking-wide">Pending</p>
            <p className="text-2xl font-bold text-amber-600 mt-1">{donations.filter((d) => d.status === "PENDING").length}</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center gap-3">
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40"><SelectValue placeholder="All statuses" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="COMPLETED">Completed</SelectItem>
            <SelectItem value="PENDING">Pending</SelectItem>
            <SelectItem value="FAILED">Failed</SelectItem>
            <SelectItem value="REFUNDED">Refunded</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {loading ? (
        <Card><CardContent className="space-y-3 py-6">{Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-12 w-full" />)}</CardContent></Card>
      ) : donations.length === 0 ? (
        <Card><CardContent className="flex flex-col items-center justify-center py-12">
          <Heart className="mb-4 size-12 text-muted-foreground/50" />
          <p className="font-medium">No donations found</p>
        </CardContent></Card>
      ) : (
        <Card><CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Donor</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {donations.map((d) => (
                <TableRow key={d.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium text-sm">{d.isAnonymous ? "Anonymous" : d.donorName}</p>
                      <p className="text-xs text-muted-foreground">{d.email}</p>
                    </div>
                  </TableCell>
                  <TableCell className="font-semibold text-green-600">{formatCurrency(d.amount)}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{d.paymentMethod}</TableCell>
                  <TableCell><StatusBadge status={d.status} /></TableCell>
                  <TableCell className="text-sm text-muted-foreground">{format(new Date(d.createdAt), "MMM d, yyyy")}</TableCell>
                  <TableCell className="text-right">
                    <Select value={d.status} onValueChange={(val) => updateStatus(d.id, val as Donation["status"])}>
                      <SelectTrigger className="w-8 h-8 border-0 bg-transparent"><span className="text-xs">⋯</span></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="PENDING">Pending</SelectItem>
                        <SelectItem value="COMPLETED">Completed</SelectItem>
                        <SelectItem value="FAILED">Failed</SelectItem>
                        <SelectItem value="REFUNDED">Refunded</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent></Card>
      )}
    </div>
  )
}
