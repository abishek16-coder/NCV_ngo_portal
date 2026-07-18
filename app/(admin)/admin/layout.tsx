"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
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
} from "lucide-react";

const sidebarLinks = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/projects", label: "Projects", icon: FolderOpen },
  { href: "/admin/events", label: "Events", icon: Calendar },
  { href: "/admin/gallery", label: "Gallery", icon: Image },
  { href: "/admin/volunteers", label: "Volunteers", icon: HandHeart },
  { href: "/admin/donations", label: "Donations", icon: Heart },
  { href: "/admin/contact", label: "Messages", icon: MessageSquare },
  { href: "/admin/settings", label: "Settings", icon: Settings },
  { href: "/admin/audit-logs", label: "Audit Logs", icon: Shield },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState<{ firstName: string; lastName: string; role: string } | null>(null);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((d) => {
        if (d.success) setUser(d.data);
        else router.push("/login");
      })
      .catch(() => router.push("/login"));
  }, [router]);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex flex-col border-r bg-white transition-all duration-300 lg:static",
          sidebarOpen ? "w-64" : "w-16",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex h-16 items-center justify-between border-b px-4">
          {sidebarOpen ? (
            <Link href="/" className="flex items-center gap-2 font-bold text-orange-600">
              <span className="flex size-8 items-center justify-center rounded-lg bg-orange-600 text-white">
                <Sun className="size-4" />
              </span>
              <span className="text-sm">NCV Admin</span>
            </Link>
          ) : (
            <span className="mx-auto flex size-8 items-center justify-center rounded-lg bg-orange-600 text-white">
              <Sun className="size-4" />
            </span>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="hidden rounded-md p-1 text-gray-400 hover:text-gray-600 lg:block"
          >
            {sidebarOpen ? <ChevronLeft className="size-4" /> : <ChevronRight className="size-4" />}
          </button>
          <button
            onClick={() => setMobileOpen(false)}
            className="rounded-md p-1 text-gray-400 hover:text-gray-600 lg:hidden"
          >
            <X className="size-4" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== "/admin" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-orange-50 text-orange-700"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
                  !sidebarOpen && "justify-center px-2"
                )}
                title={!sidebarOpen ? link.label : undefined}
              >
                <link.icon className="size-5 shrink-0" />
                {sidebarOpen && <span>{link.label}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="border-t p-3">
          {sidebarOpen && user && (
            <div className="mb-2 px-3 py-2 text-xs text-gray-500">
              {user.firstName} {user.lastName}
              <span className="ml-1 text-[10px] uppercase text-orange-600">({user.role})</span>
            </div>
          )}
          <button
            onClick={handleLogout}
            className={cn(
              "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50",
              !sidebarOpen && "justify-center px-2"
            )}
          >
            <LogOut className="size-5 shrink-0" />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top bar */}
        <header className="flex h-16 items-center justify-between border-b bg-white px-4 lg:px-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="rounded-md p-1 text-gray-500 hover:text-gray-700 lg:hidden"
            >
              <Menu className="size-5" />
            </button>
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
              <input
                placeholder="Search..."
                className="h-9 w-64 rounded-lg border bg-gray-50 pl-9 pr-3 text-sm outline-none focus:border-orange-300 focus:ring-1 focus:ring-orange-300"
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative rounded-md p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100">
              <Bell className="size-5" />
              <span className="absolute -right-0.5 -top-0.5 flex size-4 items-center justify-center rounded-full bg-orange-500 text-[9px] text-white">3</span>
            </button>
            <div className="flex items-center gap-2 border-l pl-3">
              <div className="flex size-8 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-orange-600 text-[11px] font-bold text-white">
                {user ? `${user.firstName[0]}${user.lastName[0]}` : "A"}
              </div>
              {user && (
                <span className="hidden text-sm font-medium text-gray-700 sm:block">
                  {user.firstName}
                </span>
              )}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}
