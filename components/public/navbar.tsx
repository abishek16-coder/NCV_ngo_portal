"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useState, useRef, useCallback, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Menu, X, Heart, Sparkles, ArrowRight, HandHeart } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/events", label: "Events" },
  { href: "/gallery", label: "Gallery" },
  { href: "/volunteer", label: "Volunteer" },
  { href: "/contact", label: "Contact" },
];

function TrustLogo({ size = "default" }: { size?: "default" | "small" }) {
  const isSmall = size === "small";

  return (
    <div className="flex items-center gap-3">
      <div
        className={cn(
          "flex shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 via-orange-600 to-amber-500 text-white shadow-lg shadow-orange-200",
          isSmall ? "size-10" : "size-12"
        )}
      >
        <HandHeart className={cn("text-white", isSmall ? "size-5" : "size-6")} />
      </div>
      <div className="leading-tight">
        <p className="text-sm font-semibold tracking-[0.2em] text-slate-800 uppercase">
          NCV Trust
        </p>
        <p className="text-[11px] font-medium text-slate-500">
          Narchinthanai Vattam
        </p>
      </div>
    </div>
  );
}

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

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

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

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50">
      <div className="hidden items-center justify-center gap-2 bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 px-4 py-2 text-center text-xs font-medium text-white sm:flex">
        <Sparkles className="size-3.5" />
        <span>Free online yoga sessions daily at 6:00 AM</span>
        <span className="mx-1 opacity-60">•</span>
        <Link href="/events" className="font-semibold underline decoration-white/40 underline-offset-2 hover:no-underline">
          Register now
        </Link>
      </div>

      <div
        className={cn(
          "border-b border-slate-200/70 transition-all duration-300",
          scrolled
            ? "bg-white/95 shadow-[0_10px_45px_rgba(15,23,42,0.08)] backdrop-blur-xl"
            : "bg-white/90 backdrop-blur-sm"
        )}
      >
        <div className="mx-auto flex h-[74px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <button
            onClick={handleLogoTap}
            className="flex items-center rounded-full transition-transform duration-200 hover:scale-[1.01]"
            aria-label="NCV Trust Home"
          >
            <TrustLogo />
          </button>

          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative rounded-full px-3.5 py-2 text-sm font-semibold transition-all duration-200",
                  isActive(link.href)
                    ? "bg-orange-50 text-orange-600 shadow-sm"
                    : "text-slate-600 hover:bg-orange-50 hover:text-orange-600"
                )}
              >
                {link.label}
                {isActive(link.href) && (
                  <span className="absolute bottom-1 left-1/2 h-1 w-5 -translate-x-1/2 rounded-full bg-orange-500" />
                )}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <Link
              href="/donate"
              className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-sm font-semibold text-orange-600 transition-all hover:border-orange-300 hover:bg-orange-100"
            >
              <Heart className="size-4 fill-orange-200 text-orange-500" />
              Donate
            </Link>
            <Link
              href="/volunteer"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-orange-200 transition-all hover:scale-[1.02]"
            >
              <Sparkles className="size-4" />
              Join Us
            </Link>
          </div>

          <button
            className="flex size-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition-colors hover:bg-slate-50 md:hidden"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      <div
        className={cn(
          "overflow-hidden border-b border-slate-200/80 bg-white/95 shadow-2xl shadow-slate-200/60 backdrop-blur-xl transition-all duration-300 md:hidden",
          mobileOpen ? "max-h-[480px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="mx-auto px-4 py-4 sm:px-6">
          <div className="mb-4 rounded-2xl border border-orange-100 bg-orange-50/80 p-3">
            <p className="text-sm font-semibold text-orange-700">Narchinthanai Vattam</p>
            <p className="text-xs text-slate-600">Yoga, wellness and selfless service</p>
          </div>

          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-semibold transition-colors",
                  isActive(link.href)
                    ? "bg-orange-50 text-orange-600"
                    : "text-slate-600 hover:bg-orange-50 hover:text-orange-600"
                )}
                onClick={() => setMobileOpen(false)}
              >
                <span>{link.label}</span>
                <ArrowRight className="size-4" />
              </Link>
            ))}
          </nav>

          <div className="mt-4 grid grid-cols-2 gap-2">
            <Link
              href="/donate"
              className="flex items-center justify-center gap-2 rounded-2xl border border-orange-200 bg-orange-50 px-3 py-3 text-sm font-semibold text-orange-600"
              onClick={() => setMobileOpen(false)}
            >
              <Heart className="size-4 fill-orange-200 text-orange-500" />
              Donate
            </Link>
            <Link
              href="/volunteer"
              className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 px-3 py-3 text-sm font-semibold text-white"
              onClick={() => setMobileOpen(false)}
            >
              <Sparkles className="size-4" />
              Join Us
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
