"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useState, useRef, useCallback, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Menu, X, Heart, Sparkles, ChevronDown } from "lucide-react";

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
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const tapCount = useRef(0);
  const tapTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogoTap = useCallback(() => {
    tapCount.current += 1;
    if (tapTimer.current) clearTimeout(tapTimer.current);
    if (tapCount.current >= 5) {
      tapCount.current = 0;
      router.push("/admin");
      return;
    }
    tapTimer.current = setTimeout(() => { tapCount.current = 0; }, 1000);
  }, [router]);

  const isActive = (href: string) => href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/95 backdrop-blur-lg shadow-md"
          : "bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100"
      )}
    >
      {/* Top announcement bar */}
      <div
        className="hidden sm:flex items-center justify-center gap-2 py-1.5 text-xs font-medium text-white"
        style={{ background: "linear-gradient(90deg, #f97316, #ea580c)" }}
      >
        <Sparkles className="size-3" />
        <span>Free Online Yoga Sessions — Daily at 6:00 AM · Join Now</span>
        <Link href="/events" className="underline underline-offset-2 hover:no-underline ml-1">Register →</Link>
      </div>

      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <button
          onClick={handleLogoTap}
          className="flex items-center gap-2.5 group"
          aria-label="NCV Home"
        >
          <span
            className="flex size-10 items-center justify-center rounded-xl transition-transform group-hover:scale-105"
            style={{
              background: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
              boxShadow: "0 4px 14px rgba(249,115,22,0.35)",
            }}
          >
            <Heart className="size-5 text-white" />
          </span>
          <div className="flex flex-col items-start leading-none">
            <span className="text-base font-bold text-gray-900 tracking-tight">NCV</span>
            <span className="text-[10px] font-normal text-gray-400 tracking-widest uppercase">Narchinthanai Vattam</span>
          </div>
        </button>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-0.5 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "relative rounded-lg px-3.5 py-2 text-sm font-medium transition-all duration-200",
                isActive(link.href)
                  ? "text-orange-600"
                  : "text-gray-600 hover:text-orange-600 hover:bg-orange-50"
              )}
            >
              {link.label}
              {isActive(link.href) && (
                <span
                  className="absolute bottom-0.5 left-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full bg-orange-500"
                />
              )}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-2 md:flex">
          <Link
            href="/donate"
            className="flex items-center gap-1.5 rounded-lg border px-4 py-2 text-sm font-semibold transition-all hover:bg-orange-50"
            style={{ borderColor: "#fed7aa", color: "#ea580c" }}
          >
            <Heart className="size-3.5" />
            Donate
          </Link>
          <Link
            href="/volunteer"
            className="flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold text-white transition-all hover:shadow-lg"
            style={{
              background: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
              boxShadow: "0 2px 10px rgba(249,115,22,0.3)",
            }}
          >
            <Sparkles className="size-3.5" />
            Join Us
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="flex size-9 items-center justify-center rounded-lg text-gray-600 hover:bg-gray-100 transition-colors md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "overflow-hidden transition-all duration-300 md:hidden",
          mobileOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        )}
        style={{ borderTop: mobileOpen ? "1px solid #f3f4f6" : "none", background: "#fff" }}
      >
        <nav className="flex flex-col gap-0.5 px-4 py-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive(link.href)
                  ? "bg-orange-50 text-orange-600"
                  : "text-gray-600 hover:text-orange-600 hover:bg-orange-50"
              )}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-3 grid grid-cols-2 gap-2 pt-3" style={{ borderTop: "1px solid #f3f4f6" }}>
            <Link
              href="/donate"
              className="flex items-center justify-center gap-1.5 rounded-lg border py-2.5 text-sm font-semibold"
              style={{ borderColor: "#fed7aa", color: "#ea580c" }}
              onClick={() => setMobileOpen(false)}
            >
              <Heart className="size-3.5" />
              Donate
            </Link>
            <Link
              href="/volunteer"
              className="flex items-center justify-center gap-1.5 rounded-lg py-2.5 text-sm font-semibold text-white"
              style={{ background: "linear-gradient(135deg, #f97316, #ea580c)" }}
              onClick={() => setMobileOpen(false)}
            >
              <Sparkles className="size-3.5" />
              Join Us
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
