"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { FileText, LayoutGrid, Quote } from "lucide-react"
import { Toaster } from "@/components/ui/sonner"
import { cn } from "@/lib/utils"

const navItems = [
  { label: "Pages", href: "/cms", icon: FileText },
  { label: "Site Sections", href: "/cms/sections", icon: LayoutGrid },
  { label: "Testimonials", href: "/cms/testimonials", icon: Quote },
]

export default function CmsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen">
      <header className="border-b bg-muted/50">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex h-14 items-center">
            <h1 className="text-lg font-semibold">CMS Manager</h1>
          </div>
          <nav className="-mb-px flex gap-1">
            {navItems.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/cms" && pathname.startsWith(item.href))
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "inline-flex items-center gap-2 border-b-2 px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "border-primary text-primary"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  )}
                >
                  <item.icon className="size-4" />
                  {item.label}
                </Link>
              )
            })}
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-6">{children}</main>
      <Toaster />
    </div>
  )
}
