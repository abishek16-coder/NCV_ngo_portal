"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  Users,
  FolderOpen,
  Calendar,
  Heart,
  HandHeart,
  MessageSquare,
  DollarSign,
  TrendingUp,
  ArrowRight,
  UserPlus,
  Eye,
  Clock,
} from "lucide-react";

type StatCard = {
  label: string;
  value: string;
  change: string;
  changeType: "up" | "down" | "neutral";
  icon: React.ElementType;
  href: string;
  color: string;
};

const stats: StatCard[] = [
  { label: "Total Users", value: "12", change: "+2 this month", changeType: "up", icon: Users, href: "/admin/users", color: "bg-blue-50 text-blue-600" },
  { label: "Projects", value: "8", change: "3 active", changeType: "up", icon: FolderOpen, href: "/admin/projects", color: "bg-emerald-50 text-emerald-600" },
  { label: "Upcoming Events", value: "5", change: "2 this week", changeType: "up", icon: Calendar, href: "/admin/events", color: "bg-purple-50 text-purple-600" },
  { label: "Donations", value: "₹1,25,000", change: "+15% vs last month", changeType: "up", icon: DollarSign, href: "/admin/donations", color: "bg-green-50 text-green-600" },
  { label: "Volunteers", value: "48", change: "6 new this month", changeType: "up", icon: HandHeart, href: "/admin/volunteers", color: "bg-orange-50 text-orange-600" },
  { label: "Contact Messages", value: "23", change: "8 unread", changeType: "neutral", icon: MessageSquare, href: "/admin/contact", color: "bg-rose-50 text-rose-600" },
];

const recentActivities = [
  { action: "New volunteer registration", user: "Ananya Sharma", time: "5 min ago", type: "volunteer" },
  { action: "Donation received", user: "Rajesh Kumar", time: "30 min ago", type: "donation" },
  { action: "Event registered", user: "Priya Singh", time: "1 hour ago", type: "event" },
  { action: "New project created", user: "Admin", time: "2 hours ago", type: "project" },
  { action: "Contact form submitted", user: "Amit Joshi", time: "3 hours ago", type: "contact" },
  { action: "Yoga session attended", user: "Lakshmi Devi", time: "5 hours ago", type: "volunteer" },
];

const quickActions = [
  { label: "Add User", icon: UserPlus, href: "/admin/users", color: "bg-orange-500" },
  { label: "New Project", icon: FolderOpen, href: "/admin/projects", color: "bg-emerald-500" },
  { label: "Create Event", icon: Calendar, href: "/admin/events", color: "bg-purple-500" },
  { label: "View Gallery", icon: Eye, href: "/admin/gallery", color: "bg-blue-500" },
];

export default function AdminDashboardPage() {
  const [greeting, setGreeting] = useState("Good Morning");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning");
    else if (hour < 17) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">{greeting}, Admin</h1>
          <p className="mt-1 text-sm text-gray-500">
            Here&apos;s what&apos;s happening at NCV today.
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Clock className="size-4" />
          <span>{new Date().toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="group rounded-xl border bg-white p-4 transition-all hover:shadow-md hover:border-orange-200"
          >
            <div className="flex items-center justify-between">
              <div className={cn("flex size-10 items-center justify-center rounded-lg", stat.color)}>
                <stat.icon className="size-5" />
              </div>
              <TrendingUp className={cn(
                "size-4",
                stat.changeType === "up" ? "text-green-500" : stat.changeType === "down" ? "text-red-500" : "text-gray-400"
              )} />
            </div>
            <p className="mt-3 text-xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-sm font-medium text-gray-600">{stat.label}</p>
            <p className="mt-1 text-[11px] text-gray-400">{stat.change}</p>
          </Link>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Activity */}
        <div className="rounded-xl border bg-white lg:col-span-2">
          <div className="flex items-center justify-between border-b px-5 py-4">
            <h2 className="font-semibold text-gray-900">Recent Activity</h2>
            <Link href="/admin/audit-logs" className="text-sm text-orange-600 hover:text-orange-700">
              View All
            </Link>
          </div>
          <div className="divide-y">
            {recentActivities.map((activity, i) => (
              <div key={i} className="flex items-center gap-3 px-5 py-3.5">
                <div className={cn(
                  "flex size-8 items-center justify-center rounded-full text-white",
                  activity.type === "volunteer" ? "bg-orange-500" :
                  activity.type === "donation" ? "bg-green-500" :
                  activity.type === "event" ? "bg-purple-500" :
                  activity.type === "project" ? "bg-emerald-500" : "bg-blue-500"
                )}>
                  {activity.type === "volunteer" ? <HandHeart className="size-4" /> :
                   activity.type === "donation" ? <Heart className="size-4" /> :
                   activity.type === "event" ? <Calendar className="size-4" /> :
                   activity.type === "project" ? <FolderOpen className="size-4" /> :
                   <MessageSquare className="size-4" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-xs text-gray-500">{activity.user}</p>
                </div>
                <span className="shrink-0 text-xs text-gray-400">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions & Upcoming */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="rounded-xl border bg-white">
            <div className="border-b px-5 py-4">
              <h2 className="font-semibold text-gray-900">Quick Actions</h2>
            </div>
            <div className="grid grid-cols-2 gap-3 p-4">
              {quickActions.map((action) => (
                <Link
                  key={action.label}
                  href={action.href}
                  className="flex flex-col items-center gap-2 rounded-lg border p-4 text-center transition-all hover:border-orange-200 hover:bg-orange-50"
                >
                  <div className={cn("flex size-10 items-center justify-center rounded-lg text-white", action.color)}>
                    <action.icon className="size-5" />
                  </div>
                  <span className="text-xs font-medium text-gray-700">{action.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Upcoming Schedule */}
          <div className="rounded-xl border bg-white">
            <div className="border-b px-5 py-4">
              <h2 className="font-semibold text-gray-900">Today&apos;s Schedule</h2>
            </div>
            <div className="space-y-3 p-4">
              {[
                { time: "6:00 AM", title: "Happy Morning Yoga", type: "Online" },
                { time: "9:00 AM", title: "Staff Meeting", type: "Office" },
                { time: "11:00 AM", title: "Positive Thinking Workshop", type: "Community Hall" },
                { time: "4:00 PM", title: "Senior Citizen Wellness", type: "NCV Centre" },
              ].map((item, i) => (
                <div key={i} className="flex gap-3 rounded-lg border-l-4 border-l-orange-500 bg-orange-50/50 px-3 py-2.5">
                  <div className="text-xs font-semibold text-orange-600 w-14 shrink-0">{item.time}</div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-900">{item.title}</p>
                    <p className="text-xs text-gray-500">{item.type}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Yoga Sessions This Month", value: "124", sub: "+12% from last month", color: "from-orange-500 to-orange-600" },
          { label: "New Registrations", value: "18", sub: "This week", color: "from-emerald-500 to-emerald-600" },
          { label: "Website Visitors", value: "2,847", sub: "This month", color: "from-blue-500 to-blue-600" },
          { label: "Social Media Reach", value: "15.2K", sub: "+8% this week", color: "from-purple-500 to-purple-600" },
        ].map((card) => (
          <div
            key={card.label}
            className={cn(
              "rounded-xl bg-gradient-to-br p-5 text-white shadow-sm",
              card.color
            )}
          >
            <p className="text-sm text-white/80">{card.label}</p>
            <p className="mt-1 text-2xl font-bold">{card.value}</p>
            <p className="mt-1 text-xs text-white/70">{card.sub}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
