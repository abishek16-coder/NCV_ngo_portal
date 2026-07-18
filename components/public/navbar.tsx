"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useState, useRef, useCallback, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Menu, X, Heart, Sparkles, Sun, Leaf } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/events", label: "Events" },
  { href: "/gallery", label: "Gallery" },
  { href: "/volunteer", label: "Volunteer" },
  { href: "/contact", label: "Contact" },
];

// ── Trust Logo Component ─────────────────────────────────────────────────────
function TrustLogo({ size = "default" }: { size?: "default" | "small" }) {
  const isSmall = size === "small";
  return (
    <div className={cn("flex items-center gap-3", isSmall && "gap-2")}>
      {/* Emblem */}
      <div className="relative shrink-0">
        {/* Outer ring */}
        <div
          className={cn(
            "flex items-center justify-center rounded-full",
            isSmall ? "size-9" : "size-12"
          )}
          style={{
            background: "linear-gradient(135deg, #f97316 0%, #ea580c 50%, #c2410c 100%)",
            boxShadow: "0 4px 16px rgba(249,115,22,0.4), inset 0 1px 1px rgba(255,255,255,0.2)",
          }}
        >
          {/* Inner lotus/sun motif */}
          <div className="relative flex items-center justify-center">
            <Sun
              className={cn("text-white", isSmall ? "size-4" : "size-6")}
              style={{ filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.3))" }}
            />
            <Leaf
              className={cn(
                "absolute text-amber-200 opacity-70",
                isSmall ? "size-2.5" : "size-3.5"
              )}
              style={{ transform: "rotate(135deg) translateX(2px)" }}
            />
          </div>
        </div>
        {/* Small green accent dot */}
        <span
          className="absolute -bottom-0.5 -right-0.5 flex size-3 items-center justify-center rounded-full bg-emerald-500"
          style={{ border: "1.5px solid #fff" }}
        >
          <Heart className="size-1.5 text-white fill-white" />
        </span>
      </div>

      {/* Text block */}
      <div className="flex flex-col leading-none">
        <div className="flex items-baseline gap-1.5">
          <span
            className={cn("font-extrabold tracking-tight text-gray-900", isSmall ? "text-base" : "text-xl")}
            style={{ letterSpacing: "-0.02em" }}
          >
            NCV
          </span>
          <span
            className={cn("font-bold text-orange-600", isSmall ? "text-xs" : "text-sm")}
          >
            Trust
          </span>
        </div>
        <span
          className={cn(
            "font-medium text-gray-500 tracking-wide",
            isSmall ? "text-[9px]" : "text-[10px]"
          )}
          style={{ letterSpacing: "0.08em" }}
        >
          NARCHINTHANAI VATTAM
        </span>
        {!isSmall && (
          <span
            className="text-[9px] text-orange-500 font-medium tracking-widest uppercase mt-0.5"
            style={{ letterSpacing: "0.12em" }}
          >
            Charitable Trust · Est. 2015
          </span>
        )}
      </div>
    </div>
  );
}

// ── Navbar ───────────────────────────────────────────────────────────────────
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

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className="sticky top-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(255,255,255,0.97)" : "rgba(255,255,255,0.95)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        boxShadow: scrolled
          ? "0 4px 24px rgba(0,0,0,0.08)"
          : "0 1px 0 rgba(0,0,0,0.06)",
      }}
    >
      {/* ── Announcement bar ── */}
      <div
        className="hidden sm:flex items-center justify-center gap-2 py-1.5 text-xs font-medium text-white"
        style={{ background: "linear-gradient(90deg, #f97316 0%, #ea580c 50%, #dc6a0a 100%)" }}
      >
        <Sparkles className="size-3" />
        <span>Free Online Yoga Sessions — Daily at 6:00 AM</span>
        <span className="mx-1 opacity-50">|</span>
        <Link href="/events" className="underline underline-offset-2 hover:no-underline font-semibold">
          Register Free →
        </Link>
      </div>

      {/* ── Main bar ── */}
      <div className="mx-auto flex h-[68px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* ── LOGO (left) ── */}
        <button
          onClick={handleLogoTap}
          className="flex items-center group transition-opacity hover:opacity-90"
          aria-label="NCV Trust Home"
        >
          <TrustLogo />
        </button>

        {/* ── Desktop nav (center) ── */}
        <nav className="hidden items-center gap-0.5 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "relative rounded-lg px-3.5 py-2 text-sm font-medium transition-all duration-200",
                isActive(link.href)
                  ? "text-orange-600 bg-orange-50"
                  : "text-gray-600 hover:text-orange-600 hover:bg-orange-50/70"
              )}
            >
              {link.label}
              {isActive(link.href) && (
                <span className="absolute bottom-1 left-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full bg-orange-500" />
              )}
            </Link>
          ))}
        </nav>

        {/* ── Desktop CTAs (right) ── */}
        <div className="hidden items-center gap-2 md:flex">
          <Link
            href="/donate"
            className="flex items-center gap-1.5 rounded-xl border px-4 py-2 text-sm font-semibold transition-all hover:bg-orange-50"
            style={{ borderColor: "#fed7aa", color: "#ea580c" }}
          >
            <Heart className="size-3.5 fill-orange-200 text-orange-500" />
            Donate
          </Link>
          <Link
            href="/volunteer"
            className="flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-semibold text-white transition-all hover:shadow-lg hover:scale-105"
            style={{
              background: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
              boxShadow: "0 2px 10px rgba(249,115,22,0.3)",
            }}
          >
            <Sparkles className="size-3.5" />
            Join Us
          </Link>
        </div>

        {/* ── Mobile toggle ── */}
        <button
          className="flex size-10 items-center justify-center rounded-xl text-gray-600 hover:bg-gray-100 transition-colors md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {/* ── Mobile menu ── */}
      <div
        className={cn(
          "overflow-hidden transition-all duration-300 md:hidden",
          mobileOpen ? "max-h-[520px]" : "max-h-0"
        )}
        style={{ borderTop: "1px solid rgba(0,0,0,0.06)", background: "#fff" }}
      >
        {/* Mobile logo (larger, centred) */}
        <div
          className="flex items-center justify-center py-4"
          style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}
        >
          <TrustLogo />
        </div>

        <nav className="flex flex-col gap-0.5 px-4 py-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center rounded-xl px-4 py-3 text-sm font-medium transition-colors",
                isActive(link.href)
                  ? "bg-orange-50 text-orange-600"
                  : "text-gray-600 hover:text-orange-600 hover:bg-orange-50"
              )}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}

          <div className="mt-3 grid grid-cols-2 gap-2 pt-3" style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
            <Link
              href="/donate"
              className="flex items-center justify-center gap-1.5 rounded-xl border py-3 text-sm font-semibold transition-colors hover:bg-orange-50"
              style={{ borderColor: "#fed7aa", color: "#ea580c" }}
              onClick={() => setMobileOpen(false)}
            >
              <Heart className="size-3.5 fill-orange-200 text-orange-500" />
              Donate
            </Link>
            <Link
              href="/volunteer"
              className="flex items-center justify-center gap-1.5 rounded-xl py-3 text-sm font-semibold text-white"
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
