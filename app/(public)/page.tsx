import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  Target,
  Eye,
  Heart,
  Users,
  Calendar,
  MapPin,
  ArrowRight,
  Award,
  Star,
  HandHeart,
  Globe,
  BookOpen,
  Sun,
  Sparkles,
  Activity,
  Smile,
  Brain,
  CheckCircle,
  Quote,
  ChevronRight,
  Phone,
  Mail,
} from "lucide-react";

// ─────────────────────────── Design tokens ────────────────────────────────

const palette = {
  primary: "#1B8271",
  primaryHover: "#186F61",
  secondary: "#FF7468",
  secondaryHover: "#F64F40",
  surface: "#F3F4F8",
  heading: "#071C35",
  body: "#475569",
};

// ─────────────────────────── Data ──────────────────────────────────────────

/* eslint-disable @typescript-eslint/no-unused-vars -- The public layout owns the active site header; this legacy component remains available for standalone rendering. */
const navLinks = [
  { label: "About", href: "/about" },
  { label: "Programs", href: "/projects" },
  { label: "Events", href: "/events" },
  { label: "Get Involved", href: "/volunteer" },
  { label: "Contact", href: "/contact" },
];

const stats = [
  { label: "Yoga Sessions", value: "1,000+", icon: Sun, color: palette.primary },
  { label: "Lives Reached", value: "10,000+", icon: Heart, color: palette.secondary },
  { label: "Workshops", value: "200+", icon: Star, color: palette.primaryHover },
  { label: "Volunteers", value: "500+", icon: Users, color: palette.primary },
];

const whyNcv = [
  { icon: Award, title: "Expert Instructors", desc: "Certified and experienced yoga trainers dedicated to holistic wellness." },
  { icon: Heart, title: "Holistic Approach", desc: "Complete harmony of body, mind, and spirit through integrated programs." },
  { icon: Users, title: "All Age Groups", desc: "Inclusive programs designed for children, adults, and senior citizens." },
  { icon: Globe, title: "Online & Offline", desc: "Accessible daily yoga sessions both in-person and via live streaming." },
  { icon: HandHeart, title: "Community Focus", desc: "Charitable initiatives that uplift entire communities through service." },
  { icon: Brain, title: "Positive Thinking", desc: "Personality development and mindset programs for all walks of life." },
  { icon: Smile, title: "Inclusive Environment", desc: "Supportive and welcoming space for everyone, regardless of background." },
  { icon: BookOpen, title: "Affordable Access", desc: "Quality wellness education made available to all, free or at low cost." },
  { icon: Star, title: "Proven Impact", desc: "A track record of transforming thousands of lives across India." },
];

const projects = [
  {
    title: "International Day of Yoga",
    desc: "Annual large-scale yoga events with mass participation, expert-led sessions, and community engagement.",
    tag: "Flagship Program",
    color: palette.primary,
    icon: Sun,
    href: "/projects/idy-celebrations",
  },
  {
    title: "Free Online Yoga Sessions",
    desc: "Daily yoga classes streamed live for participants of all ages, promoting fitness and mental wellness from home.",
    tag: "Daily Program",
    color: palette.primaryHover,
    icon: Activity,
    href: "/projects/online-yoga",
  },
  {
    title: "Yoga Sangamam",
    desc: "Community gatherings bringing together practitioners and instructors for immersive wellness experiences.",
    tag: "Community",
    color: palette.secondary,
    icon: Users,
    href: "/projects/yoga-sangamam",
  },
];

const events = [
  {
    title: "Weekly Yoga Workshop",
    desc: "Guided sessions on asanas, pranayama, and meditation for complete mind-body wellness.",
    date: "Every Sunday",
    location: "NCV Centre & Online",
    tag: "Recurring",
    href: "/events/weekly-yoga",
  },
  {
    title: "Happy Morning Wellness",
    desc: "A rejuvenating morning series combining yoga, breathing exercises, and positive affirmations.",
    date: "Daily at 6:00 AM",
    location: "Online (Live Stream)",
    tag: "Daily",
    href: "/events/happy-morning",
  },
  {
    title: "Meditation & Mindfulness Camp",
    desc: "Guided yoga nidra and mindfulness techniques in a serene and supportive environment.",
    date: "Monthly",
    location: "NCV Trust Office, Chennai",
    tag: "Monthly",
    href: "/events/meditation-camp",
  },
];

const testimonials = [
  {
    name: "Priya S.",
    role: "Yoga Practitioner",
    initials: "PS",
    color: palette.primary,
    rating: 5,
    quote: "NCV's yoga sessions transformed my health completely. I feel stronger, calmer, and more focused. The free online classes make it so easy to stay consistent every day.",
  },
  {
    name: "Rajesh K.",
    role: "Community Member",
    initials: "RK",
    color: palette.primaryHover,
    rating: 5,
    quote: "The positive thinking workshops changed my entire outlook on life. NCV's holistic approach to wellness is truly remarkable and accessible to absolutely everyone.",
  },
  {
    name: "Anita R.",
    role: "Senior Wellness Program",
    initials: "AR",
    color: palette.secondary,
    rating: 5,
    quote: "At 65, I never thought I could practice yoga. The senior citizen wellness program at NCV made it possible. I feel healthier and happier than ever before.",
  },
];

const coreActivities = [
  "Daily Yoga Classes", "Free Online Yoga Sessions", "Pranayama & Meditation",
  "Yoga Nidra & Relaxation", "Therapeutic Yoga", "Health Awareness Programs",
  "Positive Thinking Workshops", "Stress Management", "Personality Development",
  "Student Development", "Women's Wellness Programs", "Senior Citizen Wellness",
  "International Yoga Day", "Environmental Awareness", "Community Service",
  "Volunteer Development", "Educational Welfare Projects",
];

// ─────────────────────────── Small components ──────────────────────────────

function SectionBadge({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider"
      style={{ background: "rgba(27,130,113,0.1)", border: "1px solid rgba(27,130,113,0.2)", color: palette.primary }}
    >
      <span className="size-1.5 rounded-full" style={{ background: palette.primary }} />
      {children}
    </span>
  );
}

function SectionHeader({ badge, title, subtitle, center = true }: {
  badge: string; title: string; subtitle?: string; center?: boolean;
}) {
  return (
    <div className={cn("mb-12", center && "text-center")}>
      <SectionBadge>{badge}</SectionBadge>
      <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl" style={{ color: palette.heading }}>
        {title}
      </h2>
      <div className="ncv-classic-rule" />
      {subtitle && (
        <p className={cn("mt-4 text-lg leading-relaxed", center && "mx-auto max-w-2xl")} style={{ color: palette.body }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

function Logo({ size = 44 }: { size?: number }) {
  return (
    <div
      className="flex shrink-0 items-center justify-center overflow-hidden rounded-full ring-2 ring-white"
      style={{ width: size, height: size, boxShadow: "0 4px 14px rgba(7,28,53,0.12)" }}
    >
      <Image src="/logo.png" alt="NCV logo" width={size} height={size} className="h-full w-full object-cover" priority />
    </div>
  );
}

// ─────────────────────────── Navbar ────────────────────────────────────────

function Navbar() {
  return (
    <header
      className="sticky top-0 z-50 w-full"
      style={{ background: "rgba(255,255,255,0.92)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(7,28,53,0.06)" }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo — top left */}
        <Link href="/" className="flex items-center gap-3">
          <Logo size={46} />
          <div className="hidden leading-tight sm:block">
            <p className="text-sm font-bold" style={{ color: palette.heading }}>Narchinthanai Vattam</p>
            <p className="text-[11px] font-semibold tracking-[0.12em]" style={{ color: palette.primary }}>
              NCV CHARITABLE TRUST
            </p>
          </div>
        </Link>

        {/* Nav links */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className="text-sm font-medium transition-colors hover:text-[#1B8271]"
              style={{ color: palette.body }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="flex items-center gap-3">
          <a
            href="tel:9003075333"
            className="hidden items-center gap-1.5 text-sm font-medium lg:flex"
            style={{ color: palette.body }}
          >
            <Phone className="size-4" style={{ color: palette.secondary }} />
            +91 90030 75333
          </a>
          <Link
            href="/donate"
            className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white transition-all hover:shadow-lg hover:scale-105"
            style={{ background: palette.secondary, boxShadow: "0 6px 18px rgba(255,116,104,0.3)" }}
          >
            <Heart className="size-4" /> Donate
          </Link>
        </div>
      </div>
    </header>
  );
}

// ─────────────────────────── Page ──────────────────────────────────────────

/* eslint-enable @typescript-eslint/no-unused-vars */

export default function HomePage() {
  return (
    <div className="ncv-classic-theme">
      {/* ══════════════════════ HERO ══════════════════════ */}
      <section className="relative overflow-hidden" style={{ background: palette.surface }}>
        {/* Ambient color washes */}
        <div className="absolute -top-32 -right-32 size-[520px] rounded-full opacity-20 blur-3xl"
          style={{ background: `radial-gradient(circle, ${palette.secondary}, transparent 70%)` }} />
        <div className="absolute -bottom-32 -left-32 size-[440px] rounded-full opacity-20 blur-3xl"
          style={{ background: `radial-gradient(circle, ${palette.primary}, transparent 70%)` }} />
        <div className="absolute inset-0 opacity-[0.35]"
          style={{ backgroundImage: "radial-gradient(rgba(7,28,53,0.06) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="grid items-center gap-14 lg:grid-cols-[0.85fr_1.15fr]">
            {/* Left — visual identity panel */}
            <div className="order-2 lg:order-1">
              <div
                className="relative rounded-[4px] p-8"
                style={{ background: "#fff", border: "1px solid rgba(7,28,53,0.06)", boxShadow: "0 30px 70px rgba(7,28,53,0.1)" }}
              >
                <div className="flex items-center justify-center py-8">
                  <div className="relative">
                    <div
                      className="absolute inset-0 rounded-full opacity-30 blur-2xl"
                      style={{ background: `linear-gradient(135deg, ${palette.secondary}, ${palette.primary})` }}
                    />
                    <div className="relative rounded-full p-2" style={{ background: "#fff", boxShadow: "0 20px 50px rgba(7,28,53,0.12)" }}>
                      <Logo size={174} />
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-lg font-bold" style={{ color: palette.heading }}>Est. 2015</p>
                  <p className="mt-1 text-sm" style={{ color: palette.body }}>Serving communities across India</p>
                </div>

                <div className="mt-8 grid grid-cols-2 gap-3">
                  {stats.map((s) => (
                    <div key={s.label} className="rounded-[4px] p-4" style={{ background: palette.surface }}>
                      <div
                        className="mb-2 flex size-9 items-center justify-center rounded-xl text-white"
                        style={{ background: `linear-gradient(135deg, ${s.color}, ${s.color}cc)` }}
                      >
                        <s.icon className="size-4" />
                      </div>
                      <p className="text-lg font-bold" style={{ color: palette.heading }}>{s.value}</p>
                      <p className="text-xs" style={{ color: palette.body }}>{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right — big headline */}
            <div className="order-1 lg:order-2">
              <div
                className="inline-flex items-center gap-2 rounded-full px-4 py-2"
                style={{ background: "rgba(27,130,113,0.1)", border: "1px solid rgba(27,130,113,0.2)" }}
              >
                <span className="size-2 rounded-full" style={{ background: palette.primary }} />
                <span className="text-sm font-semibold" style={{ color: palette.primaryHover }}>
                  Narchinthanai Vattam (NCV) &middot; Registered Charitable Trust
                </span>
              </div>

              <h1
                className="mt-6 text-5xl font-light uppercase leading-[1.05] tracking-[0.01em] sm:text-6xl lg:text-7xl"
                style={{ color: palette.heading }}
              >
                Yoga
                <span className="mx-3" style={{ color: palette.secondary }}>&bull;</span>
                Health
                <span
                  className="block mt-2"
                  style={{
                    background: `linear-gradient(90deg, ${palette.secondary}, ${palette.secondaryHover}, ${palette.primary})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Positive Thinking
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-relaxed" style={{ color: palette.body }}>
                Transforming lives through Yoga, Wellness, and Selfless Service. Empowering individuals and
                communities to embrace holistic health and value-based living.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href="/donate"
                  className="flex items-center gap-2 rounded-[4px] px-7 py-4 text-base font-semibold text-white transition-all hover:shadow-2xl hover:scale-105"
                  style={{ background: palette.secondary, boxShadow: "0 8px 30px rgba(255,116,104,0.35)" }}
                >
                  <Heart className="size-5" />
                  Support Our Mission
                </Link>
                <Link
                  href="/volunteer"
                  className="flex items-center gap-2 rounded-[4px] px-7 py-4 text-base font-semibold transition-all hover:shadow-lg"
                  style={{ background: "#fff", border: `1px solid rgba(7,28,53,0.12)`, color: palette.heading }}
                >
                  Join Our Programs
                  <ArrowRight className="size-5" />
                </Link>
              </div>

              <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
                {[
                  { icon: CheckCircle, text: "Registered Charitable Trust" },
                  { icon: Award, text: "Certified Instructors" },
                  { icon: Globe, text: "Free Online Sessions" },
                ].map((b) => (
                  <div key={b.text} className="flex items-center gap-2">
                    <b.icon className="size-4" style={{ color: palette.primary }} />
                    <span className="text-sm" style={{ color: palette.body }}>{b.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════ ABOUT ══════════════════════ */}
      <section className="py-20 lg:py-28" style={{ background: "#fff" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            {/* Left visual */}
            <div className="relative">
              <div
                className="relative aspect-[4/3] overflow-hidden rounded-3xl"
                style={{ background: `linear-gradient(135deg, ${palette.primary}, ${palette.primaryHover})` }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div
                      className="mx-auto mb-6 flex size-24 items-center justify-center rounded-3xl"
                      style={{ background: palette.secondary, boxShadow: "0 0 60px rgba(255,116,104,0.5)" }}
                    >
                      <Sun className="size-12 text-white" />
                    </div>
                    <p className="text-2xl font-bold text-white">Est. 2015</p>
                    <p className="mt-1 text-emerald-100">Serving Communities Across India</p>
                  </div>
                </div>
                <div className="absolute bottom-6 left-6 right-6 grid grid-cols-2 gap-3">
                  {[
                    { label: "Cities Reached", value: "15+" },
                    { label: "Years of Service", value: "10+" },
                  ].map((b) => (
                    <div key={b.label} className="rounded-xl px-4 py-3 text-center text-white"
                      style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)" }}>
                      <p className="text-xl font-bold">{b.value}</p>
                      <p className="mt-0.5 text-xs text-emerald-100">{b.label}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div
                className="absolute -right-5 -top-5 flex size-28 items-center justify-center rounded-2xl text-center text-white"
                style={{ background: `linear-gradient(135deg, ${palette.secondary}, ${palette.secondaryHover})`, boxShadow: "0 8px 30px rgba(255,116,104,0.4)" }}
              >
                <div>
                  <p className="text-2xl font-bold">10K+</p>
                  <p className="text-xs text-white/90">Lives Touched</p>
                </div>
              </div>
            </div>

            {/* Right — text */}
            <div>
              <SectionBadge>About NCV</SectionBadge>
              <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl" style={{ color: palette.heading }}>
                Narchinthanai Vattam (NCV)
              </h2>
              <div className="mt-6 space-y-4">
                {[
                  "NCV is a registered charitable trust dedicated to promoting holistic health, yoga, positive thinking, education, and community welfare. Founded with the vision of creating a healthier and more compassionate society.",
                  "We believe that true transformation begins within. By combining the timeless principles of Yoga with modern health awareness and personal development, we inspire people of all ages to lead disciplined, healthy, and meaningful lives.",
                  "Our initiatives are open to everyone, irrespective of age, gender, religion, or background, making wellness and education truly accessible to all.",
                ].map((para, i) => (
                  <p key={i} className="text-base leading-relaxed" style={{ color: palette.body }}>{para}</p>
                ))}
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4">
                {[
                  { icon: Target, label: "Our Mission", bg: "rgba(255,116,104,0.08)", border: "rgba(255,116,104,0.2)", color: palette.secondary, text: "Inspire through Yoga & Wellness" },
                  { icon: Eye, label: "Our Vision", bg: "rgba(27,130,113,0.08)", border: "rgba(27,130,113,0.2)", color: palette.primary, text: "Healthier, Happier Society" },
                ].map((c) => (
                  <div key={c.label} className="rounded-xl p-4" style={{ background: c.bg, border: `1px solid ${c.border}` }}>
                    <div className="mb-2 flex items-center gap-2">
                      <c.icon className="size-4" style={{ color: c.color }} />
                      <span className="text-xs font-semibold" style={{ color: palette.heading }}>{c.label}</span>
                    </div>
                    <p className="text-sm font-medium" style={{ color: palette.body }}>{c.text}</p>
                  </div>
                ))}
              </div>

              <Link
                href="/about"
                className="mt-8 inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white transition-all hover:shadow-lg"
                style={{ background: palette.secondary, boxShadow: "0 4px 14px rgba(255,116,104,0.3)" }}
              >
                Learn More About NCV
                <ChevronRight className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════ MOTTO STRIP ══════════════════════ */}
      <div className="overflow-hidden py-8"
        style={{ background: `linear-gradient(90deg, ${palette.secondary} 0%, ${palette.secondaryHover} 45%, ${palette.primary} 100%)` }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
            <p className="text-xl font-bold italic text-white sm:text-2xl">
              &ldquo;Health &bull; Yoga &bull; Positive Thinking&rdquo;
            </p>
            <p className="text-center text-sm text-white/85 sm:text-right">
              Transforming Lives Through Yoga, Wellness &amp; Selfless Service
            </p>
          </div>
        </div>
      </div>

      {/* ══════════════════════ WHY NCV ══════════════════════ */}
      <section className="py-20 lg:py-28" style={{ background: palette.surface }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Why NCV"
            title="Why Choose NCV?"
            subtitle="We believe wellness is not just about physical fitness — it is about achieving complete harmony of body, mind, and spirit."
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {whyNcv.map((item) => (
              <div
                key={item.title}
                className="group flex gap-4 rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                style={{ background: "#fff", border: "1px solid rgba(7,28,53,0.06)", boxShadow: "0 1px 4px rgba(7,28,53,0.04)" }}
              >
                <div
                  className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-xl transition-transform group-hover:scale-110"
                  style={{ background: "rgba(255,116,104,0.1)", border: "1px solid rgba(255,116,104,0.2)" }}
                >
                  <item.icon className="size-5" style={{ color: palette.secondary }} />
                </div>
                <div>
                  <p className="font-semibold" style={{ color: palette.heading }}>{item.title}</p>
                  <p className="mt-1 text-sm leading-relaxed" style={{ color: palette.body }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════ CORE ACTIVITIES ══════════════════════ */}
      <section className="py-20 lg:py-28" style={{ background: "#fff" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="What We Do"
            title="Our Core Activities"
            subtitle="A comprehensive range of programs focused on health, education, and community development."
          />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {coreActivities.map((activity) => (
              <div
                key={activity}
                className="group flex items-center gap-3 rounded-xl px-4 py-3.5 transition-all duration-200 hover:shadow-sm"
                style={{ background: palette.surface, border: "1px solid rgba(7,28,53,0.06)" }}
              >
                <span
                  className="size-2 shrink-0 rounded-full transition-transform group-hover:scale-150"
                  style={{ background: `linear-gradient(135deg, ${palette.secondary}, ${palette.secondaryHover})` }}
                />
                <span className="text-sm" style={{ color: palette.body }}>{activity}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════ PROJECTS ══════════════════════ */}
      <section className="py-20 lg:py-28" style={{ background: palette.surface }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <SectionBadge>Our Work</SectionBadge>
              <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl" style={{ color: palette.heading }}>
                Projects &amp; Initiatives
              </h2>
              <p className="mt-3 max-w-xl" style={{ color: palette.body }}>
                Impactful programs throughout the year to promote holistic wellness and social responsibility.
              </p>
            </div>
            <Link
              href="/projects"
              className="inline-flex shrink-0 items-center gap-2 rounded-xl border px-5 py-2.5 text-sm font-semibold transition-all hover:bg-white"
              style={{ borderColor: "rgba(7,28,53,0.12)", color: palette.heading }}
            >
              View All Projects <ArrowRight className="size-4" />
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((p) => (
              <Link
                key={p.title}
                href={p.href}
                className="group overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
                style={{ background: "#fff", border: "1px solid rgba(7,28,53,0.06)", boxShadow: "0 2px 8px rgba(7,28,53,0.06)" }}
              >
                <div
                  className="relative flex h-44 items-center justify-center overflow-hidden"
                  style={{ background: `linear-gradient(135deg, ${p.color}22, ${p.color}11)` }}
                >
                  <div
                    className="flex size-20 items-center justify-center rounded-3xl transition-transform group-hover:scale-110"
                    style={{ background: `linear-gradient(135deg, ${p.color}, ${p.color}cc)`, boxShadow: `0 10px 30px ${p.color}44` }}
                  >
                    <p.icon className="size-10 text-white" />
                  </div>
                  <div className="absolute top-4 right-4 rounded-full px-3 py-1 text-xs font-semibold text-white" style={{ background: p.color }}>
                    {p.tag}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold" style={{ color: palette.heading }}>{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed line-clamp-2" style={{ color: palette.body }}>{p.desc}</p>
                  <div className="mt-4 flex items-center gap-1 text-sm font-semibold" style={{ color: p.color }}>
                    Learn More <ChevronRight className="size-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════ EVENTS ══════════════════════ */}
      <section className="py-20 lg:py-28" style={{ background: "#fff" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <SectionBadge>Join Us</SectionBadge>
              <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl" style={{ color: palette.heading }}>
                Upcoming Events
              </h2>
              <p className="mt-3 max-w-xl" style={{ color: palette.body }}>
                Participate in our wellness programs and community events open to everyone.
              </p>
            </div>
            <Link
              href="/events"
              className="inline-flex shrink-0 items-center gap-2 rounded-xl border px-5 py-2.5 text-sm font-semibold transition-all hover:bg-gray-50"
              style={{ borderColor: "rgba(7,28,53,0.12)", color: palette.heading }}
            >
              View All Events <ArrowRight className="size-4" />
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((ev, i) => {
              const barColor = i === 0 ? palette.secondary : i === 1 ? palette.primary : palette.primaryHover;
              return (
                <div
                  key={ev.title}
                  className="group overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                  style={{ background: "#fff", border: "1px solid rgba(7,28,53,0.06)", boxShadow: "0 2px 8px rgba(7,28,53,0.04)" }}
                >
                  <div className="h-1.5" style={{ background: barColor }} />
                  <div className="p-6">
                    <div className="mb-4 flex items-center justify-between">
                      <div
                        className="flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold"
                        style={{ background: `${barColor}1a`, color: barColor }}
                      >
                        <Calendar className="size-3" />
                        {ev.date}
                      </div>
                      <span className="rounded-full px-2.5 py-1 text-xs font-semibold" style={{ background: palette.surface, color: palette.body }}>
                        {ev.tag}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold" style={{ color: palette.heading }}>{ev.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed line-clamp-2" style={{ color: palette.body }}>{ev.desc}</p>
                    <div className="mt-4 flex items-center gap-1.5 text-xs" style={{ color: palette.body }}>
                      <MapPin className="size-3.5" style={{ color: palette.secondary }} />
                      {ev.location}
                    </div>
                    <Link
                      href={ev.href}
                      className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold text-white transition-all hover:shadow-md"
                      style={{ background: `linear-gradient(135deg, ${barColor}, ${palette.secondaryHover})` }}
                    >
                      Register Now <ArrowRight className="size-4" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════ TESTIMONIALS ══════════════════════ */}
      <section className="py-20 lg:py-28" style={{ background: palette.surface }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Stories of Change"
            title="What People Say"
            subtitle="Hear from the individuals whose lives have been touched by NCV's wellness programs."
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="group flex flex-col rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                style={{ background: "#fff", border: "1px solid rgba(7,28,53,0.06)", boxShadow: "0 2px 8px rgba(7,28,53,0.04)" }}
              >
                <div className="mb-4 flex gap-1">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="size-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <div className="relative flex-1">
                  <Quote className="absolute -top-1 -left-1 size-8" style={{ color: "rgba(255,116,104,0.25)" }} />
                  <p className="relative pl-2 text-sm leading-relaxed" style={{ color: palette.body }}>
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>
                <div className="mt-6 flex items-center gap-3 pt-5" style={{ borderTop: "1px solid rgba(7,28,53,0.06)" }}>
                  <div
                    className="flex size-11 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
                    style={{ background: t.color }}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <p className="font-semibold" style={{ color: palette.heading }}>{t.name}</p>
                    <p className="text-xs" style={{ color: palette.body }}>{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════ CTA BANNER ══════════════════════ */}
      <section className="relative overflow-hidden py-20 lg:py-28"
        style={{ background: `linear-gradient(135deg, ${palette.primary} 0%, ${palette.primaryHover} 100%)` }}>
        <div className="absolute -right-16 -top-16 size-72 rounded-full opacity-20 blur-3xl"
          style={{ background: `radial-gradient(circle, ${palette.secondary}, transparent)` }} />
        <div className="absolute -left-16 -bottom-16 size-72 rounded-full opacity-20 blur-3xl"
          style={{ background: "radial-gradient(circle, #fff, transparent)" }} />

        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2"
            style={{ background: "rgba(255,255,255,0.14)", border: "1px solid rgba(255,255,255,0.25)" }}>
            <Sparkles className="size-4" style={{ color: palette.secondary }} />
            <span className="text-sm font-semibold text-white">Together We Transform</span>
          </div>
          <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Join Us in Building a <br />
            <span style={{ color: "#FFD9D4" }}>Healthier Society</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-emerald-50">
            Together, let&apos;s build a healthier, happier, and more compassionate society through Yoga, Positive Thinking, and Selfless Service.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/volunteer"
              className="flex items-center gap-2 rounded-xl px-8 py-4 text-base font-bold text-white transition-all hover:shadow-2xl hover:scale-105"
              style={{ background: `linear-gradient(135deg, ${palette.secondary}, ${palette.secondaryHover})`, boxShadow: "0 8px 30px rgba(255,116,104,0.4)" }}
            >
              <Heart className="size-5" /> Join Our Programs
            </Link>
            <Link
              href="/contact"
              className="flex items-center gap-2 rounded-xl px-8 py-4 text-base font-semibold text-white transition-all hover:bg-white/15"
              style={{ border: "1px solid rgba(255,255,255,0.3)", background: "rgba(255,255,255,0.1)" }}
            >
              Contact Us <ArrowRight className="size-5" />
            </Link>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-6">
            <a href="tel:9003075333" className="flex items-center gap-2 text-sm text-emerald-50 transition-colors hover:text-white">
              <Phone className="size-4" /> +91 9003075333
            </a>
            <span className="text-white/30">|</span>
            <a href="mailto:info@ncv.org" className="flex items-center gap-2 text-sm text-emerald-50 transition-colors hover:text-white">
              <Mail className="size-4" /> info@ncv.org
            </a>
            <span className="text-white/30">|</span>
            <span className="flex items-center gap-2 text-sm text-emerald-50">
              <MapPin className="size-4" /> Valasaravakkam, Chennai
            </span>
          </div>
        </div>
      </section>

      {/* ══════════════════════ PARTNERS ══════════════════════ */}
      <section className="py-16" style={{ background: "#fff" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <SectionBadge>Our Network</SectionBadge>
            <h2 className="mt-4 text-2xl font-bold" style={{ color: palette.heading }}>Partners &amp; Supporters</h2>
            <p className="mt-2" style={{ color: palette.body }}>Proud to collaborate with organizations sharing our vision.</p>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="flex aspect-[3/2] items-center justify-center rounded-2xl text-xs font-medium transition-all hover:shadow-md"
                style={{ background: palette.surface, border: "1px dashed rgba(7,28,53,0.12)", color: palette.body }}
              >
                Partner {i + 1}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
