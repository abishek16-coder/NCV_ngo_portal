"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Menu, X, Heart, Sparkles, ArrowRight } from "lucide-react";

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
    <div className="flex items-center gap-3.5">
      <div
        className={cn(
          "relative flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-white ring-2 ring-white/20 shadow-[0_8px_24px_rgba(0,0,0,0.15)]",
          isSmall ? "size-11" : "size-[58px]"
        )}
      >
        <Image
          src="/logo.png"
          alt="NCV Charitable Trust logo"
          fill
          sizes={isSmall ? "44px" : "58px"}
          className="object-cover"
          priority
        />
      </div>
      <div className="leading-tight">
        <p className="text-sm font-bold tracking-[0.16em] text-white uppercase">
          NCV Trust
        </p>
        <p className="mt-0.5 text-[11px] font-semibold tracking-wide text-white/70">
          Narchinthanai Vattam
        </p>
      </div>
    </div>
  );
}

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const logoClickCount = useRef(0);
  const logoClickTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const router = useRouter();

  const handleLogoClick = useCallback(() => {
    logoClickCount.current += 1;
    if (logoClickTimer.current) clearTimeout(logoClickTimer.current);
    if (logoClickCount.current >= 5) {
      logoClickCount.current = 0;
      router.push("/login");
    } else {
      logoClickTimer.current = setTimeout(() => { logoClickCount.current = 0; }, 2000);
    }
  }, [router]);

  useEffect(() => {
    return () => { if (logoClickTimer.current) clearTimeout(logoClickTimer.current); };
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50">
      <div className="hidden items-center justify-center gap-2 bg-gradient-to-r from-[#1B8271] to-[#186F61] px-4 py-2 text-center text-xs font-medium text-white sm:flex">
        <Sparkles className="size-3.5" />
        <span>Free online yoga sessions daily at 6:00 AM</span>
        <span className="mx-1 opacity-60">•</span>
        <Link href="/events" className="font-semibold underline decoration-white/40 underline-offset-2 hover:no-underline">
          Register now
        </Link>
      </div>

      <div
        className={cn(
          "border-b border-white/10 transition-all duration-300",
          scrolled
            ? "bg-[#1B8271]/98 shadow-[0_10px_45px_rgba(0,0,0,0.15)] backdrop-blur-xl"
            : "bg-[#1B8271]/95 backdrop-blur-sm"
        )}
        style={{ background: scrolled ? undefined : "linear-gradient(135deg, #1B8271 0%, #186F61 100%)" }}
      >
        <div className="mx-auto flex h-[82px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div
            role="link"
            tabIndex={0}
            onClick={handleLogoClick}
            onKeyDown={(e) => { if (e.key === "Enter") handleLogoClick(); }}
            className="flex items-center rounded-full transition-transform duration-200 hover:scale-[1.01] cursor-pointer"
            aria-label="NCV Trust Home"
          >
            <TrustLogo />
          </div>

          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative px-3 py-7 text-[12px] font-medium uppercase tracking-[0.08em] transition-colors duration-200",
                  isActive(link.href)
                    ? "text-white"
                    : "text-white/70 hover:text-white"
                )}
              >
                {link.label}
                {isActive(link.href) && (
                  <span className="absolute bottom-4 left-1/2 h-px w-7 -translate-x-1/2 bg-white" />
                )}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <Link
              href="/donate"
              className="inline-flex items-center gap-2 rounded-[4px] border border-[#FF7468] bg-[#FF7468] px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-[#F64F40]"
            >
              <Heart className="size-4" />
              Donate
            </Link>
            <Link
              href="/volunteer"
              className="inline-flex items-center gap-2 rounded-[4px] border border-white/30 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-white/20"
            >
              <Sparkles className="size-4" />
              Join Us
            </Link>
          </div>

          <button
            className="flex size-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-colors hover:bg-white/20 md:hidden"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      <div
        className={cn(
          "overflow-hidden border-b border-white/10 bg-[#1B8271] shadow-2xl shadow-black/20 backdrop-blur-xl transition-all duration-300 md:hidden",
          mobileOpen ? "max-h-[480px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="mx-auto px-4 py-4 sm:px-6">
          <div className="mb-4 rounded-2xl border border-white/10 bg-white/10 p-3">
            <p className="text-sm font-semibold text-white">Narchinthanai Vattam</p>
            <p className="text-xs text-white/70">Yoga, wellness and selfless service</p>
          </div>

          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-semibold transition-colors",
                  isActive(link.href)
                    ? "bg-white/15 text-white"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
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
              className="flex items-center justify-center gap-2 rounded-2xl border border-[#FF7468] bg-[#FF7468] px-3 py-3 text-sm font-semibold text-white"
              onClick={() => setMobileOpen(false)}
            >
              <Heart className="size-4" />
              Donate
            </Link>
            <Link
              href="/volunteer"
              className="flex items-center justify-center gap-2 rounded-2xl border border-white/30 bg-white/10 px-3 py-3 text-sm font-semibold text-white"
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
