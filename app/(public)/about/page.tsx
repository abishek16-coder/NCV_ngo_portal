import Link from "next/link";
import {
  Heart, Users, Sun, BookOpen, Globe, Award, Target, Eye,
  ArrowRight, Star, HandHeart, Brain, Smile, CheckCircle, Sparkles,
  Phone, Mail, MapPin, ChevronRight, Quote,
} from "lucide-react";
import { TrustBackground } from "@/components/public/trust-background";

const values = [
  { icon: Heart, title: "Compassion", desc: "We serve with empathy and kindness, treating every individual with dignity and respect." },
  { icon: Users, title: "Community", desc: "Building stronger communities through collective wellness and shared purpose." },
  { icon: Globe, title: "Inclusivity", desc: "Our programs welcome everyone regardless of age, background, or ability." },
  { icon: Sparkles, title: "Excellence", desc: "We maintain the highest standards in our teaching, programs, and impact." },
  { icon: BookOpen, title: "Education", desc: "Spreading knowledge of yoga, wellness, and positive thinking to all." },
  { icon: HandHeart, title: "Service", desc: "Selfless service (Seva) is at the heart of everything we do." },
];

const milestones = [
  { year: "2015", event: "NCV Trust founded with a vision of holistic community wellness" },
  { year: "2017", event: "Launched free daily online yoga sessions reaching 1,000+ participants" },
  { year: "2019", event: "Expanded to 10 cities across India with volunteer networks" },
  { year: "2021", event: "Celebrated 5,000th yoga session milestone" },
  { year: "2023", event: "Launched scholarship program for underprivileged students" },
  { year: "2024", event: "Reached 10,000+ lives touched through our programs" },
];

export default function AboutPage() {
  return (
    <div>
      <TrustBackground />
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0f3d33] via-[#1B8271] to-[#0f3d33] py-20 sm:py-28">
        <div className="absolute inset-0 dot-grid-bg opacity-10" />
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium text-white/90 backdrop-blur-sm">
            <Heart className="size-4 text-[#1B8271]" />
            About NCV Trust
          </div>
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Transforming Lives Through{" "}
            <span className="text-[#1B8271]">Yoga & Service</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/80">
            NCV Trust is a non-profit organization dedicated to holistic well-being through yoga, education, positive thinking, and compassionate community service.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link href="/projects" className="inline-flex items-center gap-2 rounded-full bg-[#FF7468] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#FF7468]/30 transition-all hover:bg-[#F64F40] hover:scale-[1.02]">
              Our Programs <ArrowRight className="size-4" />
            </Link>
            <Link href="/volunteer" className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20">
              Volunteer With Us
            </Link>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-3xl border border-[#E8F5F3] bg-gradient-to-br from-[#F0FAF8] to-white p-8 shadow-sm">
              <div className="flex size-12 items-center justify-center rounded-2xl bg-[#1B8271]/10">
                <Target className="size-6 text-[#1B8271]" />
              </div>
              <h2 className="mt-5 text-2xl font-bold text-[#071C35]">Our Mission</h2>
              <p className="mt-3 leading-relaxed text-[#475569]">
                To empower individuals and communities through accessible yoga education, wellness programs, and compassionate service. We strive to create a healthier, happier, and more mindful society where every person has the opportunity to achieve holistic well-being.
              </p>
            </div>
            <div className="rounded-3xl border border-[#E8F5F3] bg-gradient-to-br from-[#F0FAF8] to-white p-8 shadow-sm">
              <div className="flex size-12 items-center justify-center rounded-2xl bg-[#1B8271]/10">
                <Eye className="size-6 text-[#1B8271]" />
              </div>
              <h2 className="mt-5 text-2xl font-bold text-[#071C35]">Our Vision</h2>
              <p className="mt-3 leading-relaxed text-[#475569]">
                A world where wellness is accessible to all, where communities thrive through selfless service, and where the ancient wisdom of yoga transforms modern life. We envision a society built on compassion, positivity, and holistic health.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 sm:py-24 bg-[#F8FAFB]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-[#071C35] sm:text-4xl">Our Core Values</h2>
            <p className="mx-auto mt-4 max-w-2xl text-[#475569]">The principles that guide every initiative we undertake</p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((v) => (
              <div key={v.title} className="group rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:border-[#1B8271]/20">
                <div className="flex size-11 items-center justify-center rounded-xl bg-[#1B8271]/10 transition-colors group-hover:bg-[#1B8271] group-hover:text-white">
                  <v.icon className="size-5 text-[#1B8271] group-hover:text-white" />
                </div>
                <h3 className="mt-4 text-lg font-bold text-[#071C35]">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#475569]">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-[#071C35] sm:text-4xl">Our Journey</h2>
            <p className="mt-4 text-[#475569]">Key milestones in our mission to transform communities</p>
          </div>
          <div className="relative mt-12">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#1B8271] to-[#186F61]" />
            <div className="space-y-8">
              {milestones.map((m, i) => (
                <div key={m.year} className="relative pl-12">
                  <div className="absolute left-2.5 top-1 flex size-4 items-center justify-center rounded-full border-2 border-[#1B8271] bg-white">
                    <div className="size-1.5 rounded-full bg-[#1B8271]" />
                  </div>
                  <div className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
                    <span className="text-sm font-bold text-[#1B8271]">{m.year}</span>
                    <p className="mt-1 text-sm text-[#475569]">{m.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 bg-gradient-to-r from-[#1B8271] to-[#0f3d33]">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">Join Our Mission</h2>
          <p className="mx-auto mt-4 max-w-xl text-white/80">Whether through volunteering, donating, or simply spreading the word, you can help us create lasting change.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/volunteer" className="inline-flex items-center gap-2 rounded-full bg-[#FF7468] px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:bg-[#F64F40] hover:scale-[1.02]">
              Become a Volunteer <ArrowRight className="size-4" />
            </Link>
            <Link href="/donate" className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20">
              Make a Donation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
