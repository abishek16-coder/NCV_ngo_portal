import Link from "next/link";
import { Heart, MapPin, Phone, Mail, ArrowUpRight } from "lucide-react";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

const quickLinks = [
  { href: "/about", label: "About NCV" },
  { href: "/projects", label: "Projects" },
  { href: "/events", label: "Events" },
  { href: "/gallery", label: "Gallery" },
  { href: "/volunteer", label: "Volunteer" },
  { href: "/contact", label: "Contact Us" },
];

const programs = [
  "Daily Yoga Classes",
  "Free Online Yoga",
  "Positive Thinking Workshops",
  "Health Awareness Campaigns",
  "Senior Citizen Wellness",
  "Community Service",
];

const socialLinks = [
  { icon: InstagramIcon, label: "@ncv_speaks", href: "https://instagram.com/ncv_speaks" },
  { icon: FacebookIcon, label: "Narchinthanai Vattam", href: "https://facebook.com" },
];

export function Footer() {
  return (
    <footer style={{ background: "linear-gradient(180deg, #1B8271 0%, #0f3d33 100%)" }}>
      {/* Main footer */}
      <div className="mx-auto max-w-7xl px-4 pt-16 pb-10 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">

          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 group">
              <span
                className="flex size-10 items-center justify-center rounded-xl transition-transform group-hover:scale-105"
                style={{ background: "linear-gradient(135deg, #1B8271, #186F61)", boxShadow: "0 0 20px rgba(27,130,113,0.35)" }}
              >
                <Heart className="size-5 text-white" />
              </span>
              <div>
                <p className="text-base font-bold text-white leading-none">NCV</p>
                <p className="text-[10px] text-slate-400 leading-none mt-0.5 tracking-wide">Narchinthanai Vattam</p>
              </div>
            </Link>
            <p className="mt-5 text-sm text-slate-400 leading-relaxed">
              A registered charitable trust dedicated to promoting holistic health, yoga, positive thinking, education, and community welfare across India.
            </p>

            {/* Social */}
            <div className="mt-6 flex gap-3">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex size-9 items-center justify-center rounded-lg transition-all hover:scale-110"
                  style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.1)" }}
                  aria-label={s.label}
                >
                  <s.icon className="size-4 text-slate-300" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="mb-5 text-sm font-semibold uppercase tracking-wider text-white">Quick Links</h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-1.5 text-sm text-slate-400 transition-colors hover:text-white"
                  >
                    <span className="size-1 rounded-full bg-white/30 group-hover:bg-white transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h4 className="mb-5 text-sm font-semibold uppercase tracking-wider text-white">Programs</h4>
            <ul className="space-y-2.5">
              {programs.map((p) => (
                <li key={p} className="flex items-center gap-1.5 text-sm text-slate-400">
                  <span className="size-1 rounded-full bg-slate-600" />
                  {p}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-5 text-sm font-semibold uppercase tracking-wider text-white">Get In Touch</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg"
                  style={{ background: "rgba(255,255,255,0.1)" }}>
                  <MapPin className="size-4 text-white/80" />
                </div>
                <p className="text-sm text-slate-400 leading-relaxed">
                  87, 4th St, West Kamakoti Nagar,<br />
                  Valasaravakkam, Chennai,<br />
                  Tamil Nadu 600095, India
                </p>
              </li>
              <li className="flex items-center gap-3">
                <div className="flex size-8 shrink-0 items-center justify-center rounded-lg"
                  style={{ background: "rgba(255,255,255,0.1)" }}>
                  <Phone className="size-4 text-white/80" />
                </div>
                <a href="tel:9003075333" className="text-sm text-slate-400 hover:text-white transition-colors">
                  +91 9003075333
                </a>
              </li>
              <li className="flex items-center gap-3">
                <div className="flex size-8 shrink-0 items-center justify-center rounded-lg"
                  style={{ background: "rgba(255,255,255,0.1)" }}>
                  <InstagramIcon className="size-4 text-white/80" />
                </div>
                <a href="https://instagram.com/ncv_speaks" className="text-sm text-slate-400 hover:text-white transition-colors">
                  @ncv_speaks
                </a>
              </li>
            </ul>

            {/* CTA */}
            <Link
              href="/donate"
              className="mt-6 flex items-center gap-2 rounded-xl bg-[#FF7468] px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-[#F64F40] hover:shadow-lg"
              style={{ boxShadow: "0 4px 14px rgba(255,116,104,0.25)" }}
            >
              <Heart className="size-4" />
              Support Our Mission
              <ArrowUpRight className="ml-auto size-4" />
            </Link>
          </div>
        </div>

        {/* Divider */}
        <div className="my-10 h-px" style={{ background: "rgba(255,255,255,0.07)" }} />

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} Narchinthanai Vattam (NCV) Trust. All rights reserved.
          </p>
          <p className="text-xs text-slate-600 italic">
            &ldquo;Health &bull; Yoga &bull; Positive Thinking&rdquo;
          </p>
        </div>
      </div>
    </footer>
  );
}
