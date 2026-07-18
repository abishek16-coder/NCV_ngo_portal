"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Users,
  FolderOpen,
  Calendar,
  Heart,
  HandHeart,
  MessageSquare,
  DollarSign,
  TrendingUp,
  TrendingDown,
  UserPlus,
  Eye,
  Clock,
  ArrowUpRight,
  Activity,
  Zap,
  Target,
  Award,
  GraduationCap,
  Star,
} from "lucide-react";

// ── Data ──────────────────────────────────────────────────────────────────────

const donationData = [
  { month: "Feb", amount: 42000 },
  { month: "Mar", amount: 58000 },
  { month: "Apr", amount: 47000 },
  { month: "May", amount: 75000 },
  { month: "Jun", amount: 61000 },
  { month: "Jul", amount: 125000 },
];

const volunteerData = [
  { label: "Applied", count: 68 },
  { label: "Screening", count: 52 },
  { label: "Active", count: 48 },
  { label: "Senior", count: 19 },
];

const stats = [
  {
    label: "Total Users",
    value: 12,
    display: "12",
    change: "+2 this month",
    trend: "up",
    icon: Users,
    href: "/admin/users",
    gradient: "from-blue-500 to-blue-600",
    lightBg: "bg-blue-50",
    textColor: "text-blue-600",
  },
  {
    label: "Active Projects",
    value: 8,
    display: "8",
    change: "3 active now",
    trend: "up",
    icon: FolderOpen,
    href: "/admin/projects",
    gradient: "from-emerald-500 to-emerald-600",
    lightBg: "bg-emerald-50",
    textColor: "text-emerald-600",
  },
  {
    label: "Upcoming Events",
    value: 5,
    display: "5",
    change: "2 this week",
    trend: "up",
    icon: Calendar,
    href: "/admin/events",
    gradient: "from-violet-500 to-violet-600",
    lightBg: "bg-violet-50",
    textColor: "text-violet-600",
  },
  {
    label: "Donations",
    value: 125000,
    display: "₹1.25L",
    change: "+15% vs last month",
    trend: "up",
    icon: DollarSign,
    href: "/admin/donations",
    gradient: "from-green-500 to-green-600",
    lightBg: "bg-green-50",
    textColor: "text-green-600",
  },
  {
    label: "Volunteers",
    value: 48,
    display: "48",
    change: "6 joined this month",
    trend: "up",
    icon: HandHeart,
    href: "/admin/volunteers",
    gradient: "from-orange-500 to-orange-600",
    lightBg: "bg-orange-50",
    textColor: "text-orange-600",
  },
  {
    label: "Messages",
    value: 23,
    display: "23",
    change: "8 unread",
    trend: "neutral",
    icon: MessageSquare,
    href: "/admin/contact",
    gradient: "from-rose-500 to-rose-600",
    lightBg: "bg-rose-50",
    textColor: "text-rose-600",
  },
];

const recentActivities = [
  {
    action: "New volunteer registration",
    user: "Ananya Sharma",
    avatar: "AS",
    time: "5 min ago",
    type: "volunteer",
  },
  {
    action: "Donation of ₹5,000 received",
    user: "Rajesh Kumar",
    avatar: "RK",
    time: "30 min ago",
    type: "donation",
  },
  {
    action: "Event registration confirmed",
    user: "Priya Singh",
    avatar: "PS",
    time: "1 hour ago",
    type: "event",
  },
  {
    action: "New project published",
    user: "Admin",
    avatar: "AD",
    time: "2 hours ago",
    type: "project",
  },
  {
    action: "Contact form submitted",
    user: "Amit Joshi",
    avatar: "AJ",
    time: "3 hours ago",
    type: "contact",
  },
  {
    action: "Scholarship application received",
    user: "Lakshmi Devi",
    avatar: "LD",
    time: "5 hours ago",
    type: "scholarship",
  },
];

const typeConfig: Record<string, { color: string; bg: string; icon: React.ElementType }> = {
  volunteer: { color: "text-orange-600", bg: "bg-orange-100", icon: HandHeart },
  donation:  { color: "text-green-600",  bg: "bg-green-100",  icon: Heart },
  event:     { color: "text-violet-600", bg: "bg-violet-100", icon: Calendar },
  project:   { color: "text-emerald-600",bg: "bg-emerald-100",icon: FolderOpen },
  contact:   { color: "text-blue-600",   bg: "bg-blue-100",   icon: MessageSquare },
  scholarship:{ color: "text-amber-600", bg: "bg-amber-100",  icon: GraduationCap },
};

const quickActions = [
  { label: "Add User",       desc: "Create admin account",  icon: UserPlus,    href: "/admin/users",        gradient: "from-blue-500 to-blue-600" },
  { label: "New Project",    desc: "Launch a campaign",     icon: FolderOpen,  href: "/admin/projects",     gradient: "from-emerald-500 to-emerald-600" },
  { label: "Create Event",   desc: "Schedule activity",     icon: Calendar,    href: "/admin/events",       gradient: "from-violet-500 to-violet-600" },
  { label: "View Gallery",   desc: "Manage media",          icon: Eye,         href: "/admin/gallery",      gradient: "from-orange-500 to-orange-600" },
  { label: "Volunteers",     desc: "Review applications",   icon: HandHeart,   href: "/admin/volunteers",   gradient: "from-rose-500 to-rose-600" },
  { label: "Scholarships",   desc: "Student support",       icon: GraduationCap,href:"/admin/scholarships", gradient: "from-amber-500 to-amber-600" },
];

const schedule = [
  { time: "6:00 AM",  title: "Happy Morning Yoga",           venue: "Online", tag: "yoga"     },
  { time: "9:00 AM",  title: "Staff Meeting",                venue: "Office", tag: "internal" },
  { time: "11:00 AM", title: "Positive Thinking Workshop",   venue: "Community Hall", tag: "workshop" },
  { time: "4:00 PM",  title: "Senior Citizen Wellness",      venue: "NCV Centre", tag: "wellness" },
];

const scheduleTagColor: Record<string, string> = {
  yoga:     "bg-orange-100 text-orange-700",
  internal: "bg-slate-100 text-slate-600",
  workshop: "bg-violet-100 text-violet-700",
  wellness: "bg-emerald-100 text-emerald-700",
};

const impactCards = [
  { label: "Yoga Sessions",    value: "124",  sub: "+12% this month",  icon: Activity, gradient: "from-orange-500 to-amber-500"   },
  { label: "New Registrations",value: "18",   sub: "This week",        icon: Zap,      gradient: "from-emerald-500 to-teal-500"   },
  { label: "Website Visitors", value: "2,847",sub: "This month",       icon: Target,   gradient: "from-blue-500 to-cyan-500"      },
  { label: "Community Reach",  value: "15.2K",sub: "+8% this week",    icon: Award,    gradient: "from-violet-500 to-purple-500"  },
];

// ── Custom Tooltip ─────────────────────────────────────────────────────────────
function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: { value: number }[]; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border bg-white px-4 py-3 shadow-xl text-sm"
      style={{ borderColor: "rgba(249,115,22,0.2)" }}>
      <p className="font-semibold text-slate-800">{label}</p>
      <p className="text-orange-600 font-bold mt-0.5">₹{payload[0].value.toLocaleString("en-IN")}</p>
    </div>
  );
}

// ── Count-up hook ──────────────────────────────────────────────────────────────
function useCountUp(target: number, duration = 1200) {
  const [count, setCount] = useState(0);
  const ref = useRef(false);
  useEffect(() => {
    if (ref.current) return;
    ref.current = true;
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(target * eased));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [target, duration]);
  return count;
}

// ── Stat Card ─────────────────────────────────────────────────────────────────
function StatCard({ stat, delay }: { stat: (typeof stats)[0]; delay: number }) {
  const count = useCountUp(stat.value);
  return (
    <Link
      href={stat.href}
      className="group relative overflow-hidden rounded-2xl bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl animate-fade-up"
      style={{
        animationDelay: `${delay}ms`,
        border: "1px solid rgba(0,0,0,0.06)",
        boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
      }}
    >
      {/* Gradient orb */}
      <div
        className={cn(
          "absolute -right-4 -top-4 size-24 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100 blur-2xl bg-gradient-to-br",
          stat.gradient
        )}
        style={{ opacity: 0.06 }}
      />

      <div className="flex items-start justify-between">
        <div className={cn("flex size-11 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-sm", stat.gradient)}>
          <stat.icon className="size-5" />
        </div>
        <span className={cn(
          "flex items-center gap-1 rounded-full px-2 py-1 text-[10px] font-semibold",
          stat.trend === "up" ? "bg-emerald-50 text-emerald-600" :
          stat.trend === "down" ? "bg-red-50 text-red-600" :
          "bg-slate-100 text-slate-500"
        )}>
          {stat.trend === "up" ? <TrendingUp className="size-3" /> : stat.trend === "down" ? <TrendingDown className="size-3" /> : null}
          {stat.trend === "up" ? "↑" : stat.trend === "down" ? "↓" : "—"}
        </span>
      </div>

      <div className="mt-4">
        <p className="text-2xl font-bold text-slate-900 tabular-nums">
          {stat.label === "Donations" ? `₹${count >= 100000 ? (count / 100000).toFixed(2) + "L" : count.toLocaleString("en-IN")}` : count.toLocaleString()}
        </p>
        <p className="mt-0.5 text-sm font-medium text-slate-500">{stat.label}</p>
        <p className="mt-2 text-[11px] text-slate-400">{stat.change}</p>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(90deg, transparent, rgba(249,115,22,0.5), transparent)` }} />
    </Link>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────────
export default function AdminDashboardPage() {
  const [greeting, setGreeting] = useState("Good Morning");
  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const h = now.getHours();
      setGreeting(h < 12 ? "Good Morning" : h < 17 ? "Good Afternoon" : "Good Evening");
      setCurrentTime(now.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }));
      setCurrentDate(now.toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" }));
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="space-y-6 max-w-[1600px]">

      {/* ── Hero Banner ── */}
      <div
        className="relative overflow-hidden rounded-2xl p-6 lg:p-8 animate-fade-up"
        style={{
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        {/* Decorative orbs */}
        <div className="absolute -right-12 -top-12 size-48 rounded-full bg-orange-500/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-8 left-1/3 size-40 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />

        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-500/20 px-3 py-1 text-xs font-semibold text-orange-300">
                <Star className="size-3" /> NCV Management Portal
              </span>
            </div>
            <h1 className="text-2xl font-bold text-white lg:text-3xl">
              {greeting} 👋
            </h1>
            <p className="mt-1 text-slate-400 text-sm">
              Here&apos;s what&apos;s happening at Narchinthanai Vattam today.
            </p>
          </div>

          <div className="flex flex-col items-start sm:items-end gap-1">
            <p className="text-3xl font-bold text-white tabular-nums">{currentTime}</p>
            <div className="flex items-center gap-1.5 text-slate-400 text-sm">
              <Clock className="size-3.5" />
              <span>{currentDate}</span>
            </div>
          </div>
        </div>

        {/* Mini stats bar */}
        <div
          className="relative mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 pt-5"
          style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
        >
          {[
            { label: "Today's Sessions", value: "4" },
            { label: "Pending Reviews", value: "12" },
            { label: "New Signups", value: "3" },
            { label: "Active Now", value: "7" },
          ].map((item) => (
            <div key={item.label}>
              <p className="text-xl font-bold text-white">{item.value}</p>
              <p className="text-xs text-slate-400 mt-0.5">{item.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── KPI Stats Grid ── */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {stats.map((stat, i) => (
          <StatCard key={stat.label} stat={stat} delay={i * 60} />
        ))}
      </div>

      {/* ── Charts Row ── */}
      <div className="grid gap-6 lg:grid-cols-5">
        {/* Donation Area Chart */}
        <div
          className="lg:col-span-3 rounded-2xl bg-white p-5 animate-fade-up"
          style={{ border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 1px 3px rgba(0,0,0,0.05)", animationDelay: "200ms" }}
        >
          <div className="flex items-start justify-between mb-5">
            <div>
              <h2 className="text-base font-semibold text-slate-800">Donation Overview</h2>
              <p className="text-xs text-slate-400 mt-0.5">Monthly donation totals — last 6 months</p>
            </div>
            <Link href="/admin/donations"
              className="flex items-center gap-1 rounded-lg bg-orange-50 px-3 py-1.5 text-xs font-semibold text-orange-600 hover:bg-orange-100 transition-colors">
              View All <ArrowUpRight className="size-3" />
            </Link>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={donationData} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
              <defs>
                <linearGradient id="donationGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f97316" stopOpacity={0.25} />
                  <stop offset="100%" stopColor="#f97316" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false}
                tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}K`} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="amount" stroke="#f97316" strokeWidth={2.5}
                fill="url(#donationGrad)" dot={{ fill: "#f97316", strokeWidth: 0, r: 4 }}
                activeDot={{ r: 6, fill: "#ea580c", strokeWidth: 0 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Volunteer Pipeline Bar Chart */}
        <div
          className="lg:col-span-2 rounded-2xl bg-white p-5 animate-fade-up"
          style={{ border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 1px 3px rgba(0,0,0,0.05)", animationDelay: "280ms" }}
        >
          <div className="flex items-start justify-between mb-5">
            <div>
              <h2 className="text-base font-semibold text-slate-800">Volunteer Pipeline</h2>
              <p className="text-xs text-slate-400 mt-0.5">Funnel by stage</p>
            </div>
            <Link href="/admin/volunteers"
              className="flex items-center gap-1 rounded-lg bg-orange-50 px-3 py-1.5 text-xs font-semibold text-orange-600 hover:bg-orange-100 transition-colors">
              View <ArrowUpRight className="size-3" />
            </Link>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={volunteerData} layout="vertical" margin={{ top: 0, right: 8, bottom: 0, left: 16 }}>
              <defs>
                <linearGradient id="volGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#f97316" />
                  <stop offset="100%" stopColor="#fb923c" />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="label" tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} width={60} />
              <Tooltip cursor={{ fill: "rgba(249,115,22,0.05)" }} formatter={(v) => [`${v} people`, "Count"]} />
              <Bar dataKey="count" fill="url(#volGrad)" radius={[0, 6, 6, 0]} barSize={18} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ── Activity + Actions + Schedule ── */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Activity Timeline */}
        <div
          className="lg:col-span-2 rounded-2xl bg-white overflow-hidden animate-fade-up"
          style={{ border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 1px 3px rgba(0,0,0,0.05)", animationDelay: "300ms" }}
        >
          <div className="flex items-center justify-between px-5 py-4"
            style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
            <div>
              <h2 className="text-base font-semibold text-slate-800">Recent Activity</h2>
              <p className="text-xs text-slate-400 mt-0.5">Latest actions across the portal</p>
            </div>
            <Link href="/admin/audit-logs"
              className="flex items-center gap-1 rounded-lg bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors">
              View All <ArrowUpRight className="size-3" />
            </Link>
          </div>
          <div className="divide-y divide-slate-50">
            {recentActivities.map((activity, i) => {
              const cfg = typeConfig[activity.type];
              const Icon = cfg.icon;
              return (
                <div key={i} className="flex items-center gap-4 px-5 py-3.5 hover:bg-slate-50 transition-colors">
                  {/* Avatar */}
                  <div className="relative shrink-0">
                    <div className="flex size-10 items-center justify-center rounded-full bg-gradient-to-br from-slate-100 to-slate-200 text-xs font-bold text-slate-600">
                      {activity.avatar}
                    </div>
                    <div className={cn("absolute -bottom-0.5 -right-0.5 flex size-4 items-center justify-center rounded-full", cfg.bg)}>
                      <Icon className={cn("size-2.5", cfg.color)} />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-800">{activity.action}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{activity.user}</p>
                  </div>
                  <span className="shrink-0 text-xs text-slate-400 whitespace-nowrap">{activity.time}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-5">
          {/* Quick Actions */}
          <div
            className="rounded-2xl bg-white overflow-hidden animate-fade-up"
            style={{ border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 1px 3px rgba(0,0,0,0.05)", animationDelay: "360ms" }}
          >
            <div className="px-5 py-4" style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
              <h2 className="text-base font-semibold text-slate-800">Quick Actions</h2>
            </div>
            <div className="grid grid-cols-2 gap-2 p-4">
              {quickActions.map((action) => (
                <Link
                  key={action.label}
                  href={action.href}
                  className="group flex flex-col items-center gap-2 rounded-xl p-3 text-center transition-all hover:scale-105"
                  style={{ border: "1px solid rgba(0,0,0,0.06)" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(249,115,22,0.3)"; (e.currentTarget as HTMLElement).style.background = "rgba(249,115,22,0.03)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,0,0,0.06)"; (e.currentTarget as HTMLElement).style.background = ""; }}
                >
                  <div className={cn("flex size-9 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-sm", action.gradient)}>
                    <action.icon className="size-4" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-700">{action.label}</p>
                    <p className="text-[10px] text-slate-400 hidden sm:block">{action.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Today's Schedule */}
          <div
            className="rounded-2xl bg-white overflow-hidden animate-fade-up"
            style={{ border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 1px 3px rgba(0,0,0,0.05)", animationDelay: "420ms" }}
          >
            <div className="px-5 py-4" style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
              <h2 className="text-base font-semibold text-slate-800">Today&apos;s Schedule</h2>
            </div>
            <div className="space-y-2 p-4">
              {schedule.map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-slate-50"
                  style={{ borderLeft: "3px solid #f97316", background: "rgba(249,115,22,0.025)" }}
                >
                  <p className="text-xs font-bold text-orange-500 w-14 shrink-0 pt-0.5">{item.time}</p>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-slate-800 leading-tight">{item.title}</p>
                    <div className="flex items-center gap-1.5 mt-1">
                      <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-semibold", scheduleTagColor[item.tag])}>
                        {item.tag}
                      </span>
                      <span className="text-[10px] text-slate-400">{item.venue}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Impact Metrics Banner ── */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {impactCards.map((card, i) => {
          const Icon = card.icon;
          return (
            <div
              key={card.label}
              className="relative overflow-hidden rounded-2xl p-5 text-white animate-fade-up"
              style={{
                background: `linear-gradient(135deg, var(--tw-gradient-from), var(--tw-gradient-to))`,
                animationDelay: `${i * 80}ms`,
              }}
            >
              {/* Inline gradient workaround */}
              <div
                className="absolute inset-0 rounded-2xl"
                style={{ background: `linear-gradient(135deg, ${
                  card.gradient === "from-orange-500 to-amber-500"   ? "#f97316, #f59e0b" :
                  card.gradient === "from-emerald-500 to-teal-500"   ? "#10b981, #14b8a6" :
                  card.gradient === "from-blue-500 to-cyan-500"      ? "#3b82f6, #06b6d4" :
                                                                        "#8b5cf6, #a855f7"
                })` }}
              />
              <div className="absolute -right-4 -top-4 size-24 rounded-full bg-white/10 blur-xl" />
              <div className="relative">
                <div className="flex items-center justify-between mb-3">
                  <Icon className="size-5 text-white/90" />
                  <ArrowUpRight className="size-4 text-white/60" />
                </div>
                <p className="text-2xl font-bold">{card.value}</p>
                <p className="text-sm text-white/80 mt-0.5">{card.label}</p>
                <p className="text-[11px] text-white/60 mt-1">{card.sub}</p>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
