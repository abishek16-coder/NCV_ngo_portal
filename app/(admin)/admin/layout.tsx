"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  FolderOpen,
  Calendar,
  Image,
  HandHeart,
  Heart,
  MessageSquare,
  Settings,
  Shield,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Bell,
  Search,
  Sun,
  GraduationCap,
  ChevronDown,
  Sparkles,
  FileText,
  LayoutGrid,
  Quote,
} from "lucide-react";

type NavLink = {
  href: string;
  label: string;
  icon: React.ElementType;
  exact?: boolean;
};

const navGroups: { label: string; links: NavLink[] }[] = [
  {
    label: "Overview",
    links: [
      { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
    ],
  },
  {
    label: "Management",
    links: [
      { href: "/admin/users", label: "Users", icon: Users },
      { href: "/admin/projects", label: "Projects", icon: FolderOpen },
      { href: "/admin/events", label: "Events", icon: Calendar },
      { href: "/admin/gallery", label: "Gallery", icon: Image },
    ],
  },
  {
    label: "Community",
    links: [
      { href: "/admin/volunteers", label: "Volunteers", icon: HandHeart },
      { href: "/admin/donations", label: "Donations", icon: Heart },
      { href: "/admin/scholarships", label: "Scholarships", icon: GraduationCap },
      { href: "/admin/contact", label: "Messages", icon: MessageSquare },
    ],
  },
  {
    label: "Content",
    links: [
      { href: "/admin/cms", label: "Pages", icon: FileText, exact: true },
      { href: "/admin/cms/sections", label: "Sections", icon: LayoutGrid },
      { href: "/admin/cms/testimonials", label: "Testimonials", icon: Quote },
    ],
  },
  {
    label: "System",
    links: [
      { href: "/admin/settings", label: "Settings", icon: Settings },
      { href: "/admin/audit-logs", label: "Audit Logs", icon: Shield },
    ],
  },
];

const notifications = [
  { id: 1, text: "New volunteer registration", time: "5m ago", unread: true },
  { id: 2, text: "Donation of ₹5,000 received", time: "30m ago", unread: true },
  { id: 3, text: "Event registration confirmed", time: "1h ago", unread: true },
  { id: 4, text: "Contact form submitted", time: "2h ago", unread: false },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState<{ firstName: string; lastName: string; role: string } | null>(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((d) => {
        if (d.success) setUser(d.data);
        else router.push("/login");
      })
      .catch(() => router.push("/login"));
  }, [router]);

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setShowNotifications(false);
      if (userRef.current && !userRef.current.contains(e.target as Node)) setShowUserMenu(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  };

  const isActive = (href: string, exact?: boolean) => {
    if (exact) return pathname === href;
    return pathname === href || pathname.startsWith(href + "/");
  };

  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: "#f1f5f9" }}>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* ─────────────── SIDEBAR ─────────────── */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex flex-col transition-all duration-300 ease-in-out lg:static",
          sidebarOpen ? "w-64" : "w-[68px]",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
        style={{
          background: "linear-gradient(180deg, #1B8271 0%, #0f3d33 100%)",
          borderRight: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        {/* Logo area */}
        <div
          className="flex h-16 items-center justify-between px-4 shrink-0"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
        >
          {sidebarOpen ? (
            <Link href="/admin" className="flex items-center gap-2.5 group">
              <div
                className="flex size-9 items-center justify-center rounded-xl shrink-0 transition-transform group-hover:scale-105"
style={{ background: "linear-gradient(135deg, #1B8271 0%, #186F61 100%)", boxShadow: "0 0 20px rgba(27,130,113,0.4)" }}
              >
                <Sun className="size-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-bold text-white leading-none">NCV Admin</p>
                <p className="text-[10px] text-slate-400 leading-none mt-0.5">Management Portal</p>
              </div>
            </Link>
          ) : (
            <div className="mx-auto flex size-9 items-center justify-center rounded-xl shrink-0"
              style={{ background: "linear-gradient(135deg, #1B8271 0%, #186F61 100%)", boxShadow: "0 0 20px rgba(27,130,113,0.4)" }}
            >
              <Sun className="size-4 text-white" />
            </div>
          )}

          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="hidden rounded-lg p-1.5 text-slate-400 hover:text-white hover:bg-white/10 transition-colors lg:flex items-center justify-center"
          >
            {sidebarOpen ? <ChevronLeft className="size-4" /> : <ChevronRight className="size-4" />}
          </button>
          <button
            onClick={() => setMobileOpen(false)}
            className="rounded-lg p-1.5 text-slate-400 hover:text-white hover:bg-white/10 transition-colors lg:hidden"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-6 admin-scroll">
          {navGroups.map((group) => (
            <div key={group.label}>
              {sidebarOpen && (
                <p className="mb-1.5 px-3 text-[10px] font-semibold uppercase tracking-widest text-slate-500">
                  {group.label}
                </p>
              )}
              <div className="space-y-0.5">
                {group.links.map((link) => {
                  const active = isActive(link.href, link.exact);
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      title={!sidebarOpen ? link.label : undefined}
                      className={cn(
                        "sidebar-item flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium relative group",
                        active
                          ? "text-white"
                          : "text-slate-400 hover:text-white hover:bg-white/5",
                        !sidebarOpen && "justify-center px-2"
                      )}
                      style={active ? {
                        background: "linear-gradient(90deg, rgba(27,130,113,0.18) 0%, rgba(27,130,113,0.05) 100%)",
                        boxShadow: "inset 3px 0 0 #1B8271",
                      } : {}}
                    >
                      <link.icon className={cn("size-5 shrink-0", active ? "text-[#1B8271]" : "")} />
                      {sidebarOpen && <span>{link.label}</span>}
                      {active && sidebarOpen && (
                        <span className="ml-auto flex size-1.5 rounded-full bg-[#1B8271]" />
                      )}
                      {/* Tooltip when collapsed */}
                      {!sidebarOpen && (
                        <span className="absolute left-full ml-2.5 whitespace-nowrap rounded-md bg-slate-800 px-2.5 py-1.5 text-xs text-white opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50">
                          {link.label}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* User area at bottom */}
        <div className="shrink-0 p-3" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          {sidebarOpen && user && (
            <div className="mb-3 flex items-center gap-3 rounded-lg px-3 py-2.5"
              style={{ background: "rgba(255,255,255,0.05)" }}>
              <div
                className="flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                style={{ background: "linear-gradient(135deg, #1B8271, #186F61)" }}
              >
                {user.firstName[0]}{user.lastName[0]}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-white">{user.firstName} {user.lastName}</p>
                <p className="text-[10px] text-[#1B8271] uppercase tracking-wide">{user.role.replace("_", " ")}</p>
              </div>
            </div>
          )}
          <button
            onClick={handleLogout}
            className={cn(
              "sidebar-item flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-400 hover:text-red-400 hover:bg-red-400/10",
              !sidebarOpen && "justify-center px-2"
            )}
          >
            <LogOut className="size-5 shrink-0" />
            {sidebarOpen && <span>Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* ─────────────── MAIN CONTENT ─────────────── */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Bar */}
        <header
          className="flex h-16 items-center justify-between px-4 lg:px-6 shrink-0"
          style={{
            background: "rgba(255,255,255,0.85)",
            backdropFilter: "blur(16px)",
            borderBottom: "1px solid rgba(0,0,0,0.07)",
            boxShadow: "0 1px 12px rgba(0,0,0,0.04)",
          }}
        >
          <div className="flex items-center gap-3">
            {/* Mobile menu */}
            <button
              onClick={() => setMobileOpen(true)}
              className="rounded-lg p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors lg:hidden"
            >
              <Menu className="size-5" />
            </button>

            {/* Search */}
            <div className={cn(
              "relative hidden sm:flex items-center transition-all duration-200",
              searchFocused ? "w-72" : "w-56"
            )}>
              <Search className="absolute left-3 size-4 text-slate-400 pointer-events-none" />
              <input
                id="admin-search"
                placeholder="Search anything..."
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                className="h-9 w-full rounded-xl border pl-9 pr-3 text-sm outline-none transition-all"
                style={{
                  background: searchFocused ? "#fff" : "#f8fafc",
                  borderColor: searchFocused ? "#1B8271" : "#e2e8f0",
                  boxShadow: searchFocused ? "0 0 0 3px rgba(27,130,113,0.12)" : "none",
                }}
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Live indicator */}
            <div className="hidden sm:flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-emerald-700"
              style={{ background: "rgba(5,150,105,0.08)", border: "1px solid rgba(5,150,105,0.2)" }}>
              <span className="animate-pulse-dot size-1.5 rounded-full bg-emerald-500" />
              Live
            </div>

            {/* Notifications */}
            <div ref={notifRef} className="relative">
              <button
                onClick={() => { setShowNotifications(!showNotifications); setShowUserMenu(false); }}
                className="relative flex size-9 items-center justify-center rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
              >
                <Bell className="size-5" />
                {unreadCount > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 flex size-4 items-center justify-center rounded-full bg-[#1B8271] text-[9px] font-bold text-white">
                    {unreadCount}
                  </span>
                )}
              </button>

              {showNotifications && (
                <div
                  className="absolute right-0 top-11 z-50 w-80 rounded-2xl p-1 shadow-2xl"
                  style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.08)" }}
                >
                  <div className="flex items-center justify-between px-4 py-3 border-b">
                    <p className="text-sm font-semibold text-slate-800">Notifications</p>
                    <span className="rounded-full bg-[#D4EDE9] px-2 py-0.5 text-[10px] font-semibold text-[#1B8271]">{unreadCount} new</span>
                  </div>
                  {notifications.map((n) => (
                    <div key={n.id} className={cn(
                      "flex items-start gap-3 px-4 py-3 rounded-xl transition-colors cursor-pointer hover:bg-slate-50",
                      n.unread && "bg-[#E8F5F3]/60"
                    )}>
                      <div className={cn(
                        "mt-0.5 size-2 rounded-full shrink-0",
                        n.unread ? "bg-[#1B8271]" : "bg-transparent"
                      )} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-slate-700">{n.text}</p>
                        <p className="text-xs text-slate-400 mt-0.5">{n.time}</p>
                      </div>
                    </div>
                  ))}
                  <div className="px-4 py-2 border-t">
                    <button className="text-xs font-medium text-[#1B8271] hover:text-[#186F61]">View all notifications</button>
                  </div>
                </div>
              )}
            </div>

            {/* User menu */}
            <div ref={userRef} className="relative">
              <button
                onClick={() => { setShowUserMenu(!showUserMenu); setShowNotifications(false); }}
                className="flex items-center gap-2 rounded-xl px-2 py-1.5 hover:bg-slate-100 transition-colors"
              >
                <div
                  className="flex size-8 items-center justify-center rounded-full text-[11px] font-bold text-white"
                  style={{ background: "linear-gradient(135deg, #1B8271 0%, #186F61 100%)" }}
                >
                  {user ? `${user.firstName[0]}${user.lastName[0]}` : "A"}
                </div>
                {user && (
                  <span className="hidden text-sm font-medium text-slate-700 sm:block">
                    {user.firstName}
                  </span>
                )}
                <ChevronDown className="size-3.5 text-slate-400 hidden sm:block" />
              </button>

              {showUserMenu && (
                <div
                  className="absolute right-0 top-11 z-50 w-52 rounded-2xl p-1.5 shadow-2xl"
                  style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.08)" }}
                >
                  {user && (
                    <div className="px-3 py-2.5 border-b mb-1">
                      <p className="text-sm font-semibold text-slate-800">{user.firstName} {user.lastName}</p>
                      <p className="text-xs text-slate-400 capitalize">{user.role.replace("_", " ").toLowerCase()}</p>
                    </div>
                  )}
                  <Link href="/admin/settings" className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors">
                    <Settings className="size-4" />
                    Settings
                  </Link>
                  <Link href="/" className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors">
                    <Sparkles className="size-4" />
                    View Website
                  </Link>
                  <div className="my-1 border-t" />
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors"
                  >
                    <LogOut className="size-4" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6 dot-grid-bg">
          {children}
        </main>
      </div>
    </div>
  );
}
