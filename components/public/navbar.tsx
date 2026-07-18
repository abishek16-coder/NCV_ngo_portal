"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu, X, Heart, Sun, Sparkles, Activity } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/events", label: "Events" },
  { href: "/gallery", label: "Gallery" },
  { href: "/volunteer", label: "Volunteer" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();
  const tapCount = useRef(0);
  const tapTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleLogoTap = useCallback(() => {
    tapCount.current += 1;
    if (tapTimer.current) clearTimeout(tapTimer.current);
    if (tapCount.current >= 5) {
      tapCount.current = 0;
      router.push("/admin");
      return;
    }
    tapTimer.current = setTimeout(() => {
      tapCount.current = 0;
    }, 1000);
  }, [router]);

  return (
    <header className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur-md shadow-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <button
          onClick={handleLogoTap}
          className="flex items-center gap-2 text-lg font-bold tracking-tight hover:opacity-80 transition-opacity"
        >
          <span className="flex size-9 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-sm">
            <Heart className="size-5" />
          </span>
          <div className="flex flex-col items-start leading-tight">
            <span className="text-base">NCV</span>
            <span className="text-[10px] font-normal text-muted-foreground tracking-wide">
              Narchinthanai Vattam
            </span>
          </div>
        </button>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-orange-600 hover:bg-orange-50"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Button
            variant="outline"
            size="sm"
            className="border-orange-200 text-orange-700 hover:bg-orange-50"
            render={<Link href="/donate" />}
          >
            <Heart className="mr-1 size-3.5" />
            Donate
          </Button>
          <Button
            size="sm"
            className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-sm"
            render={<Link href="/volunteer" />}
          >
            <Sparkles className="mr-1 size-3.5" />
            Join Us
          </Button>
        </div>

        <button
          className="inline-flex items-center justify-center rounded-md p-2 text-muted-foreground hover:text-foreground md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t bg-white px-4 pb-4 pt-2 md:hidden shadow-lg">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-orange-600 hover:bg-orange-50"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-2 flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex-1 border-orange-200 text-orange-700"
                render={<Link href="/donate" />}
                onClick={() => setMobileOpen(false)}
              >
                <Heart className="mr-1 size-3.5" />
                Donate
              </Button>
              <Button
                size="sm"
                className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white"
                render={<Link href="/volunteer" />}
                onClick={() => setMobileOpen(false)}
              >
                <Sparkles className="mr-1 size-3.5" />
                Join
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
