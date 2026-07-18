import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  Target,
  Eye,
  Heart,
  Users,
  FolderOpen,
  Calendar,
  MapPin,
  ArrowRight,
  Award,
  Star,
  HandHeart,
  Globe,
  BookOpen,
  Leaf,
  Sun,
  Sparkles,
  Activity,
  Smile,
  Brain,
  CheckCircle,
  Quote,
  Play,
  ChevronRight,
  Phone,
} from "lucide-react";

// ─────────────────────────── Data ────────────────────────────────────────────

const stats = [
  { label: "Yoga Sessions", value: "1,000+", icon: Sun, color: "from-orange-500 to-amber-500" },
  { label: "Lives Reached", value: "10,000+", icon: Heart, color: "from-rose-500 to-pink-500" },
  { label: "Workshops", value: "200+", icon: Star, color: "from-violet-500 to-purple-500" },
  { label: "Volunteers", value: "500+", icon: Users, color: "from-emerald-500 to-teal-500" },
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
    color: "#f97316",
    icon: Sun,
    href: "/projects/idy-celebrations",
  },
  {
    title: "Free Online Yoga Sessions",
    desc: "Daily yoga classes streamed live for participants of all ages, promoting fitness and mental wellness from home.",
    tag: "Daily Program",
    color: "#10b981",
    icon: Activity,
    href: "/projects/online-yoga",
  },
  {
    title: "Yoga Sangamam",
    desc: "Community gatherings bringing together practitioners and instructors for immersive wellness experiences.",
    tag: "Community",
    color: "#8b5cf6",
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
    color: "from-blue-500 to-blue-600",
    rating: 5,
    quote: "NCV's yoga sessions transformed my health completely. I feel stronger, calmer, and more focused. The free online classes make it so easy to stay consistent every day.",
  },
  {
    name: "Rajesh K.",
    role: "Community Member",
    initials: "RK",
    color: "from-emerald-500 to-emerald-600",
    rating: 5,
    quote: "The positive thinking workshops changed my entire outlook on life. NCV's holistic approach to wellness is truly remarkable and accessible to absolutely everyone.",
  },
  {
    name: "Anita R.",
    role: "Senior Wellness Program",
    initials: "AR",
    color: "from-amber-500 to-orange-500",
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

// ─────────────────────────── Components ──────────────────────────────────────

function SectionBadge({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-orange-700"
      style={{ background: "rgba(249,115,22,0.1)", border: "1px solid rgba(249,115,22,0.2)" }}
    >
      <span className="size-1.5 rounded-full bg-orange-500" />
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
      <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className={cn("mt-4 text-lg text-gray-500 leading-relaxed", center && "mx-auto max-w-2xl")}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

// ─────────────────────────── Page ────────────────────────────────────────────

export default function HomePage() {
  return (
    <>
      {/* ══════════════════════ HERO ══════════════════════ */}
      <section className="relative overflow-hidden" style={{ minHeight: "92vh", display: "flex", alignItems: "center" }}>
        {/* Background layers */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e1a3a 40%, #0f2d1a 100%)" }} />
        {/* Animated orbs */}
        <div className="absolute -top-24 -right-24 size-[500px] rounded-full opacity-20 blur-3xl"
          style={{ background: "radial-gradient(circle, #f97316, transparent 70%)" }} />
        <div className="absolute -bottom-24 -left-24 size-[400px] rounded-full opacity-15 blur-3xl"
          style={{ background: "radial-gradient(circle, #10b981, transparent 70%)" }} />
        <div className="absolute top-1/3 right-1/3 size-64 rounded-full opacity-10 blur-3xl"
          style={{ background: "radial-gradient(circle, #8b5cf6, transparent 70%)" }} />
        {/* Dot grid */}
        <div className="absolute inset-0 opacity-20"
          style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 w-full">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Left — text */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-6"
                style={{ background: "rgba(249,115,22,0.15)", border: "1px solid rgba(249,115,22,0.3)" }}>
                <span className="size-2 rounded-full bg-orange-400 animate-pulse" />
                <span className="text-sm font-semibold text-orange-300">Narchinthanai Vattam (NCV)</span>
              </div>

              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.1]">
                Health &bull; Yoga &bull;
                <span
                  className="block mt-2"
                  style={{
                    background: "linear-gradient(90deg, #f97316, #fbbf24, #10b981)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Positive Thinking
                </span>
              </h1>

              <p className="mt-6 text-lg text-slate-300 leading-relaxed max-w-xl">
                Transforming lives through Yoga, Wellness, and Selfless Service. Empowering individuals and communities to embrace holistic health and value-based living.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href="/donate"
                  className="flex items-center gap-2 rounded-xl px-7 py-4 text-base font-semibold text-white transition-all hover:shadow-2xl hover:scale-105"
                  style={{ background: "linear-gradient(135deg, #f97316, #ea580c)", boxShadow: "0 8px 30px rgba(249,115,22,0.4)" }}
                >
                  <Heart className="size-5" />
                  Support Our Mission
                </Link>
                <Link
                  href="/volunteer"
                  className="flex items-center gap-2 rounded-xl px-7 py-4 text-base font-semibold text-white transition-all hover:bg-white/15"
                  style={{ border: "1px solid rgba(255,255,255,0.25)", background: "rgba(255,255,255,0.08)" }}
                >
                  Join Our Programs
                  <ArrowRight className="size-5" />
                </Link>
              </div>

              {/* Trust badges */}
              <div className="mt-10 flex flex-wrap items-center gap-6">
                {[
                  { icon: CheckCircle, text: "Registered Charitable Trust" },
                  { icon: Award, text: "Certified Instructors" },
                  { icon: Globe, text: "Free Online Sessions" },
                ].map((b) => (
                  <div key={b.text} className="flex items-center gap-2">
                    <b.icon className="size-4 text-emerald-400" />
                    <span className="text-sm text-slate-400">{b.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — stats + visual card */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl p-6 text-white transition-transform hover:scale-105"
                  style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", backdropFilter: "blur(10px)" }}
                >
                  <div
                    className="mb-4 flex size-12 items-center justify-center rounded-xl bg-gradient-to-br"
                    style={{ background: `linear-gradient(135deg, ${s.color.includes("orange") ? "#f97316, #f59e0b" : s.color.includes("rose") ? "#f43f5e, #ec4899" : s.color.includes("violet") ? "#8b5cf6, #a855f7" : "#10b981, #14b8a6"})` }}
                  >
                    <s.icon className="size-6 text-white" />
                  </div>
                  <p className="text-3xl font-bold">{s.value}</p>
                  <p className="mt-1 text-sm text-slate-300">{s.label}</p>
                </div>
              ))}
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
                className="aspect-[4/3] rounded-3xl overflow-hidden"
                style={{ background: "linear-gradient(135deg, #0f172a, #1e293b)" }}
              >
                {/* Placeholder visual */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div
                      className="mx-auto mb-6 flex size-24 items-center justify-center rounded-3xl"
                      style={{ background: "linear-gradient(135deg, #f97316, #ea580c)", boxShadow: "0 0 60px rgba(249,115,22,0.5)" }}
                    >
                      <Sun className="size-12 text-white" />
                    </div>
                    <p className="text-2xl font-bold text-white">Est. 2015</p>
                    <p className="text-slate-400 mt-1">Serving Communities Across India</p>
                  </div>
                </div>
                {/* Corner badges */}
                <div className="absolute bottom-6 left-6 right-6 grid grid-cols-2 gap-3">
                  {[
                    { label: "Cities Reached", value: "15+" },
                    { label: "Years of Service", value: "10+" },
                  ].map((b) => (
                    <div key={b.label} className="rounded-xl px-4 py-3 text-white text-center"
                      style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)" }}>
                      <p className="text-xl font-bold">{b.value}</p>
                      <p className="text-xs text-slate-300 mt-0.5">{b.label}</p>
                    </div>
                  ))}
                </div>
              </div>
              {/* Floating accent */}
              <div
                className="absolute -right-5 -top-5 size-28 rounded-2xl flex items-center justify-center text-white font-bold text-sm text-center leading-tight"
                style={{ background: "linear-gradient(135deg, #10b981, #059669)", boxShadow: "0 8px 30px rgba(16,185,129,0.4)" }}
              >
                <div>
                  <p className="text-2xl font-bold">10K+</p>
                  <p className="text-xs text-emerald-100">Lives Touched</p>
                </div>
              </div>
            </div>

            {/* Right — text */}
            <div>
              <SectionBadge>About NCV</SectionBadge>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
                Narchinthanai Vattam (NCV)
              </h2>
              <div className="mt-6 space-y-4">
                {[
                  "NCV is a registered charitable trust dedicated to promoting holistic health, yoga, positive thinking, education, and community welfare. Founded with the vision of creating a healthier and more compassionate society.",
                  "We believe that true transformation begins within. By combining the timeless principles of Yoga with modern health awareness and personal development, we inspire people of all ages to lead disciplined, healthy, and meaningful lives.",
                  "Our initiatives are open to everyone, irrespective of age, gender, religion, or background, making wellness and education truly accessible to all.",
                ].map((para, i) => (
                  <p key={i} className="text-base text-gray-500 leading-relaxed">{para}</p>
                ))}
              </div>

              {/* Mission & Vision mini cards */}
              <div className="mt-8 grid grid-cols-2 gap-4">
                {[
                  { icon: Target, label: "Our Mission", color: "#f97316", bg: "rgba(249,115,22,0.08)", border: "rgba(249,115,22,0.2)", text: "Inspire through Yoga & Wellness" },
                  { icon: Eye, label: "Our Vision", color: "#10b981", bg: "rgba(16,185,129,0.08)", border: "rgba(16,185,129,0.2)", text: "Healthier, Happier Society" },
                ].map((c) => (
                  <div key={c.label} className="rounded-xl p-4" style={{ background: c.bg, border: `1px solid ${c.border}` }}>
                    <div className="flex items-center gap-2 mb-2">
                      <c.icon className="size-4" style={{ color: c.color }} />
                      <span className="text-xs font-semibold text-gray-600">{c.label}</span>
                    </div>
                    <p className="text-sm text-gray-700 font-medium">{c.text}</p>
                  </div>
                ))}
              </div>

              <Link
                href="/about"
                className="mt-8 inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white transition-all hover:shadow-lg"
                style={{ background: "linear-gradient(135deg, #f97316, #ea580c)", boxShadow: "0 4px 14px rgba(249,115,22,0.3)" }}
              >
                Learn More About NCV
                <ChevronRight className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════ MOTTO STRIP ══════════════════════ */}
      <div
        className="py-8 overflow-hidden"
        style={{ background: "linear-gradient(90deg, #f97316 0%, #ea580c 50%, #dc7a0a 100%)" }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
            <p className="text-xl font-bold text-white sm:text-2xl italic">
              &ldquo;Health &bull; Yoga &bull; Positive Thinking&rdquo;
            </p>
            <p className="text-orange-100 text-sm text-center sm:text-right">
              Transforming Lives Through Yoga, Wellness &amp; Selfless Service
            </p>
          </div>
        </div>
      </div>

      {/* ══════════════════════ WHY NCV ══════════════════════ */}
      <section className="py-20 lg:py-28" style={{ background: "#f8fafc" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Why NCV"
            title="Why Choose NCV?"
            subtitle="We believe wellness is not just about physical fitness — it is about achieving complete harmony of body, mind, and spirit."
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {whyNcv.map((item, i) => (
              <div
                key={item.title}
                className="group flex gap-4 rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}
              >
                <div
                  className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-xl transition-transform group-hover:scale-110"
                  style={{ background: "linear-gradient(135deg, rgba(249,115,22,0.12), rgba(249,115,22,0.06))", border: "1px solid rgba(249,115,22,0.2)" }}
                >
                  <item.icon className="size-5 text-orange-500" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">{item.title}</p>
                  <p className="mt-1 text-sm text-gray-500 leading-relaxed">{item.desc}</p>
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
            {coreActivities.map((activity, i) => (
              <div
                key={activity}
                className="group flex items-center gap-3 rounded-xl px-4 py-3.5 transition-all duration-200 hover:shadow-sm"
                style={{ background: "#f8fafc", border: "1px solid rgba(0,0,0,0.06)" }}
              >
                <span
                  className="size-2 shrink-0 rounded-full transition-transform group-hover:scale-150"
                  style={{ background: "linear-gradient(135deg, #f97316, #ea580c)" }}
                />
                <span className="text-sm text-gray-700">{activity}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════ PROJECTS ══════════════════════ */}
      <section className="py-20 lg:py-28" style={{ background: "#f8fafc" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between mb-12">
            <div>
              <SectionBadge>Our Work</SectionBadge>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Projects &amp; Initiatives
              </h2>
              <p className="mt-3 text-gray-500 max-w-xl">
                Impactful programs throughout the year to promote holistic wellness and social responsibility.
              </p>
            </div>
            <Link
              href="/projects"
              className="inline-flex shrink-0 items-center gap-2 rounded-xl border px-5 py-2.5 text-sm font-semibold text-gray-700 transition-all hover:bg-gray-50"
              style={{ borderColor: "rgba(0,0,0,0.12)" }}
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
                style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}
              >
                {/* Visual header */}
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
                  <div
                    className="absolute top-4 right-4 rounded-full px-3 py-1 text-xs font-semibold text-white"
                    style={{ background: p.color }}
                  >
                    {p.tag}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-900">{p.title}</h3>
                  <p className="mt-2 text-sm text-gray-500 leading-relaxed line-clamp-2">{p.desc}</p>
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
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between mb-12">
            <div>
              <SectionBadge>Join Us</SectionBadge>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Upcoming Events
              </h2>
              <p className="mt-3 text-gray-500 max-w-xl">
                Participate in our wellness programs and community events open to everyone.
              </p>
            </div>
            <Link
              href="/events"
              className="inline-flex shrink-0 items-center gap-2 rounded-xl border px-5 py-2.5 text-sm font-semibold text-gray-700 transition-all hover:bg-gray-50"
              style={{ borderColor: "rgba(0,0,0,0.12)" }}
            >
              View All Events <ArrowRight className="size-4" />
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((ev, i) => (
              <div
                key={ev.title}
                className="group rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}
              >
                {/* Colored top bar */}
                <div className="h-1.5" style={{ background: i === 0 ? "#f97316" : i === 1 ? "#10b981" : "#8b5cf6" }} />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className="flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold"
                      style={{
                        background: i === 0 ? "rgba(249,115,22,0.1)" : i === 1 ? "rgba(16,185,129,0.1)" : "rgba(139,92,246,0.1)",
                        color: i === 0 ? "#ea580c" : i === 1 ? "#059669" : "#7c3aed",
                      }}
                    >
                      <Calendar className="size-3" />
                      {ev.date}
                    </div>
                    <span className="text-xs font-semibold rounded-full px-2.5 py-1 bg-gray-100 text-gray-500">{ev.tag}</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">{ev.title}</h3>
                  <p className="mt-2 text-sm text-gray-500 leading-relaxed line-clamp-2">{ev.desc}</p>
                  <div className="mt-4 flex items-center gap-1.5 text-xs text-gray-400">
                    <MapPin className="size-3.5 text-orange-400" />
                    {ev.location}
                  </div>
                  <Link
                    href={ev.href}
                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold text-white transition-all hover:shadow-md"
                    style={{
                      background: i === 0 ? "linear-gradient(135deg, #f97316, #ea580c)" : i === 1 ? "linear-gradient(135deg, #10b981, #059669)" : "linear-gradient(135deg, #8b5cf6, #7c3aed)",
                    }}
                  >
                    Register Now <ArrowRight className="size-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════ TESTIMONIALS ══════════════════════ */}
      <section className="py-20 lg:py-28" style={{ background: "#f8fafc" }}>
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
                style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}
              >
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="size-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                {/* Quote */}
                <div className="relative flex-1">
                  <Quote className="absolute -top-1 -left-1 size-8 text-orange-100" />
                  <p className="relative text-sm text-gray-600 leading-relaxed pl-2">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>
                {/* Author */}
                <div className="mt-6 flex items-center gap-3 pt-5" style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
                  <div
                    className="flex size-11 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
                    style={{ background: `linear-gradient(135deg, ${t.color.includes("blue") ? "#3b82f6, #2563eb" : t.color.includes("emerald") ? "#10b981, #059669" : "#f97316, #ea580c"})` }}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{t.name}</p>
                    <p className="text-xs text-gray-400">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════ CTA BANNER ══════════════════════ */}
      <section className="relative overflow-hidden py-20 lg:py-28">
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #0f172a, #1e1a3a, #0f2d1a)" }} />
        <div className="absolute -right-16 -top-16 size-72 rounded-full opacity-20 blur-3xl"
          style={{ background: "radial-gradient(circle, #f97316, transparent)" }} />
        <div className="absolute -left-16 -bottom-16 size-72 rounded-full opacity-15 blur-3xl"
          style={{ background: "radial-gradient(circle, #10b981, transparent)" }} />

        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-6"
            style={{ background: "rgba(249,115,22,0.15)", border: "1px solid rgba(249,115,22,0.3)" }}>
            <Sparkles className="size-4 text-orange-400" />
            <span className="text-sm font-semibold text-orange-300">Together We Transform</span>
          </div>
          <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Join Us in Building a <br />
            <span style={{ color: "#f97316" }}>Healthier Society</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-300 leading-relaxed">
            Together, let&apos;s build a healthier, happier, and more compassionate society through Yoga, Positive Thinking, and Selfless Service.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/volunteer"
              className="flex items-center gap-2 rounded-xl px-8 py-4 text-base font-bold text-white transition-all hover:shadow-2xl hover:scale-105"
              style={{ background: "linear-gradient(135deg, #f97316, #ea580c)", boxShadow: "0 8px 30px rgba(249,115,22,0.4)" }}
            >
              <Heart className="size-5" /> Join Our Programs
            </Link>
            <Link
              href="/contact"
              className="flex items-center gap-2 rounded-xl px-8 py-4 text-base font-semibold text-white transition-all hover:bg-white/15"
              style={{ border: "1px solid rgba(255,255,255,0.25)", background: "rgba(255,255,255,0.08)" }}
            >
              Contact Us <ArrowRight className="size-5" />
            </Link>
          </div>

          {/* Contact info strip */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6">
            <a href="tel:9003075333" className="flex items-center gap-2 text-slate-400 hover:text-orange-400 transition-colors text-sm">
              <Phone className="size-4" /> +91 9003075333
            </a>
            <span className="text-slate-700">|</span>
            <span className="flex items-center gap-2 text-slate-400 text-sm">
              <MapPin className="size-4 text-orange-400" /> Valasaravakkam, Chennai
            </span>
          </div>
        </div>
      </section>

      {/* ══════════════════════ PARTNERS ══════════════════════ */}
      <section className="py-16" style={{ background: "#fff" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <SectionBadge>Our Network</SectionBadge>
            <h2 className="mt-4 text-2xl font-bold text-gray-900">Partners &amp; Supporters</h2>
            <p className="mt-2 text-gray-500">Proud to collaborate with organizations sharing our vision.</p>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="flex aspect-[3/2] items-center justify-center rounded-2xl text-xs text-gray-400 font-medium transition-all hover:shadow-md"
                style={{ background: "#f8fafc", border: "1px dashed rgba(0,0,0,0.12)" }}
              >
                Partner {i + 1}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
