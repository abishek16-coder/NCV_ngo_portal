import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  Target,
  Eye,
  Heart,
  Users,
  FolderOpen,
  Clock,
  Calendar,
  MapPin,
  Quote,
  ArrowRight,
  ChevronRight,
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
  TreePine,
  Brain,
  Music,
  Dumbbell,
} from "lucide-react";

const stats = [
  { label: "Yoga Sessions", value: "1000+", icon: Sun },
  { label: "Lives Reached", value: "10000+", icon: Heart },
  { label: "Workshops", value: "200+", icon: Star },
  { label: "Volunteers", value: "500+", icon: Users },
];

const projects = [
  {
    title: "International Day of Yoga Celebrations",
    description:
      "Annual large-scale yoga events celebrating the global day of yoga with mass participation, expert-led sessions, and community engagement.",
    image: "https://placehold.co/800x500/2563EB/ffffff?text=IDY+Celebrations",
    status: "Active",
    statusVariant: "default" as const,
    href: "/projects/idy-celebrations",
  },
  {
    title: "Free Online Yoga Sessions",
    description:
      "Accessible daily yoga classes streamed online for participants of all ages, promoting physical fitness and mental wellness from home.",
    image: "https://placehold.co/800x500/059669/ffffff?text=Online+Yoga",
    status: "Active",
    statusVariant: "default" as const,
    href: "/projects/online-yoga",
  },
  {
    title: "Yoga Sangamam Programs",
    description:
      "Community yoga gatherings that bring together practitioners, instructors, and enthusiasts for immersive wellness experiences.",
    image: "https://placehold.co/800x500/F59E0B/ffffff?text=Yoga+Sangamam",
    status: "Active",
    statusVariant: "default" as const,
    href: "/projects/yoga-sangamam",
  },
];

const events = [
  {
    title: "Weekly Yoga Workshop",
    description:
      "Join us every week for guided yoga sessions focusing on asanas, pranayama, and meditation for complete mind-body wellness.",
    date: "Every Sunday",
    location: "NCV Centre, Chennai & Online",
    href: "/events/weekly-yoga",
  },
  {
    title: "Happy Morning Wellness Series",
    description:
      "A rejuvenating morning series combining yoga, breathing exercises, and positive affirmations to start your day with energy and calm.",
    date: "Daily at 6:00 AM",
    location: "Online (Live Stream)",
    href: "/events/happy-morning",
  },
  {
    title: "Meditation & Mindfulness Camp",
    description:
      "Deepen your practice with guided meditation, yoga nidra, and mindfulness techniques in a serene and supportive environment.",
    date: "Monthly",
    location: "NCV Trust Office, Chennai",
    href: "/events/meditation-camp",
  },
];

const testimonials = [
  {
    name: "Priya S.",
    role: "Yoga Practitioner",
    avatar: "https://placehold.co/100x100/2563EB/ffffff?text=PS",
    initials: "PS",
    quote:
      "NCV's yoga sessions transformed my health. I feel stronger, calmer, and more focused. The free online classes make it so easy to stay consistent.",
  },
  {
    name: "Rajesh K.",
    role: "Community Member",
    avatar: "https://placehold.co/100x100/059669/ffffff?text=RK",
    initials: "RK",
    quote:
      "The positive thinking workshops changed my outlook on life. NCV's holistic approach to wellness is truly remarkable and accessible to everyone.",
  },
  {
    name: "Anita R.",
    role: "Senior Wellness Program",
    avatar: "https://placehold.co/100x100/F59E0B/ffffff?text=AR",
    initials: "AR",
    quote:
      "At 65, I never thought I could practice yoga. The senior citizen wellness program at NCV made it possible. I feel healthier and happier than ever.",
  },
];

const partners = [
  "Partner 1",
  "Partner 2",
  "Partner 3",
  "Partner 4",
  "Partner 5",
  "Partner 6",
];

const coreActivities = [
  "Daily Yoga Classes",
  "Free Online Yoga Sessions",
  "Pranayama & Meditation Programs",
  "Yoga Nidra & Relaxation Sessions",
  "Therapeutic Yoga",
  "Health & Wellness Awareness Programs",
  "Positive Thinking Workshops",
  "Stress Management Programs",
  "Personality Development & Leadership Training",
  "Student Development Initiatives",
  "Women's Wellness Programs",
  "Senior Citizen Wellness Programs",
  "International Day of Yoga Celebrations",
  "Environmental Awareness Campaigns",
  "Community Service Activities",
  "Volunteer Development Programs",
  "Educational & Social Welfare Projects",
];

export default function HomePage() {
  return (
    <>
      {/* ── Hero Banner ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-amber-600 via-orange-600 to-green-700">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{
            backgroundImage:
              "url('https://placehold.co/1600x900/1e3a5f/ffffff?text=NCV+Hero')",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
          <div className="max-w-3xl">
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-amber-200">
              Narchinthanai Vattam (NCV)
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl xl:text-6xl">
              Health &bull; Yoga &bull; Positive Thinking
            </h1>
            <p className="mt-4 text-base text-orange-100 sm:mt-6 sm:text-lg lg:text-xl">
              Transforming Lives Through Yoga, Wellness, and Selfless Service.
              Empowering individuals and communities to embrace holistic health,
              mental resilience, and value-based living.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:mt-10">
              <Button
                size="lg"
                render={<Link href="/donate" />}
                className="bg-white text-orange-700 hover:bg-orange-50"
              >
                <Heart className="mr-1.5 size-4" />
                Support Our Mission
              </Button>
              <Button
                size="lg"
                variant="outline"
                render={<Link href="/volunteer" />}
                className="border-white/30 text-white hover:bg-white/10 hover:text-white"
              >
                Join Our Programs
                <ArrowRight className="ml-1.5 size-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ── About Section ── */}
      <section className="bg-background py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <Badge variant="outline" className="mb-3">
                About Us
              </Badge>
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
                Narchinthanai Vattam (NCV)
              </h2>
              <p className="mt-4 text-muted-foreground sm:text-lg">
                NCV is a registered charitable trust dedicated to promoting
                holistic health, yoga, positive thinking, education, and
                community welfare. Founded with the vision of creating a
                healthier and more compassionate society, NCV empowers
                individuals through physical wellness, mental resilience,
                emotional balance, and value-based living.
              </p>
              <p className="mt-4 text-muted-foreground">
                NCV believes that true transformation begins within. By
                combining the timeless principles of Yoga with modern health
                awareness and personal development, the organization inspires
                people of all ages to lead disciplined, healthy, and meaningful
                lives. Our initiatives are open to everyone, irrespective of
                age, gender, religion, or background, making wellness and
                education accessible to all.
              </p>
              <p className="mt-4 text-muted-foreground">
                Over the years, NCV has conducted thousands of yoga sessions,
                wellness workshops, awareness campaigns, motivational programs,
                and community service activities. Through both online and
                offline platforms, we continue to reach individuals, educational
                institutions, corporate organizations, and communities across
                India, promoting the message of healthy living and positive
                thinking.
              </p>
              <div className="mt-8">
                <Button variant="outline" render={<Link href="/about" />}>
                  Learn More About NCV
                  <ChevronRight className="ml-1 size-4" />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat) => (
                <Card key={stat.label} className="text-center">
                  <CardContent className="flex flex-col items-center gap-2 pt-6">
                    <div className="flex size-12 items-center justify-center rounded-full bg-orange-50 text-orange-600 dark:bg-orange-950">
                      <stat.icon className="size-6" />
                    </div>
                    <p className="text-2xl font-bold text-foreground sm:text-3xl">
                      {stat.value}
                    </p>
                    <p className="text-xs text-muted-foreground sm:text-sm">
                      {stat.label}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Separator />

      {/* ── Mission & Vision ── */}
      <section className="bg-muted/30 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center sm:mb-12">
            <Badge variant="outline" className="mb-3">
              Our Purpose
            </Badge>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
              Mission &amp; Vision
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:gap-8">
            <Card className="border-l-4 border-l-amber-500">
              <CardHeader>
                <div className="mb-2 flex size-10 items-center justify-center rounded-lg bg-amber-50 text-amber-600 dark:bg-amber-950">
                  <Target className="size-5" />
                </div>
                <CardTitle className="text-xl">Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed text-muted-foreground">
                  To inspire individuals and communities to adopt Yoga as a way
                  of life while promoting physical health, mental well-being,
                  emotional stability, and social responsibility. We strive to
                  provide accessible yoga education, wellness programs, positive
                  thinking initiatives, health awareness campaigns, and
                  community development activities that empower people to lead
                  balanced and purposeful lives.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-green-600">
              <CardHeader>
                <div className="mb-2 flex size-10 items-center justify-center rounded-lg bg-green-50 text-green-600 dark:bg-green-950">
                  <Eye className="size-5" />
                </div>
                <CardTitle className="text-xl">Our Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed text-muted-foreground">
                  To build a healthier, happier, and more harmonious society
                  where every individual enjoys physical fitness, mental peace,
                  emotional strength, moral values, and spiritual well-being
                  through Yoga, education, and selfless service.
                </CardDescription>
              </CardContent>
            </Card>
          </div>

          {/* Motto */}
          <div className="mt-12 text-center">
            <Badge variant="secondary" className="mb-3">
              Our Motto
            </Badge>
            <p className="text-xl font-semibold italic text-foreground sm:text-2xl">
              &ldquo;Health &bull; Yoga &bull; Positive Thinking&rdquo;
            </p>
            <p className="mt-2 text-muted-foreground">
              Transforming Lives Through Yoga, Wellness, and Selfless Service.
            </p>
          </div>
        </div>
      </section>

      {/* ── Why Choose NCV ── */}
      <section className="bg-background py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center sm:mb-12">
            <Badge variant="outline" className="mb-3">
              Why NCV
            </Badge>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
              Why Choose NCV?
            </h2>
            <p className="mt-2 mx-auto max-w-2xl text-muted-foreground">
              At NCV, we believe that wellness is not just about physical
              fitness&mdash;it is about achieving complete harmony of body,
              mind, and spirit. Our programs are designed by experienced yoga
              instructors and wellness professionals.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: Award, text: "Experienced and certified yoga trainers" },
              { icon: Heart, text: "Holistic approach to health and wellness" },
              { icon: Users, text: "Programs suitable for all age groups" },
              { icon: Globe, text: "Regular free online and offline yoga sessions" },
              { icon: HandHeart, text: "Community-focused charitable initiatives" },
              { icon: Brain, text: "Positive thinking and personality development programs" },
              { icon: Smile, text: "Supportive and inclusive learning environment" },
              { icon: BookOpen, text: "Affordable and accessible wellness education" },
              { icon: Star, text: "Commitment to quality, compassion, and service" },
            ].map((item) => (
              <div
                key={item.text}
                className="flex items-start gap-3 rounded-lg border p-4"
              >
                <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-orange-50 text-orange-600 dark:bg-orange-950">
                  <item.icon className="size-4" />
                </div>
                <p className="text-sm text-muted-foreground">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Separator />

      {/* ── Core Activities ── */}
      <section className="bg-muted/30 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center sm:mb-12">
            <Badge variant="outline" className="mb-3">
              What We Do
            </Badge>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
              Our Core Activities
            </h2>
            <p className="mt-2 mx-auto max-w-xl text-muted-foreground">
              NCV conducts a wide range of programs focused on health,
              education, and community development.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {coreActivities.map((activity) => (
              <div
                key={activity}
                className="flex items-center gap-2 rounded-lg border bg-background px-4 py-3 text-sm"
              >
                <div className="size-1.5 rounded-full bg-orange-500" />
                <span>{activity}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Latest Projects ── */}
      <section className="bg-background py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <Badge variant="outline" className="mb-3">
                Our Work
              </Badge>
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
                Projects &amp; Events
              </h2>
              <p className="mt-2 max-w-xl text-muted-foreground">
                NCV organizes impactful programs throughout the year to promote
                holistic wellness and social responsibility.
              </p>
            </div>
            <Button variant="outline" render={<Link href="/projects" />}>
              View All Projects
              <ArrowRight className="ml-1 size-4" />
            </Button>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3">
            {projects.map((project) => (
              <Card key={project.title} className="overflow-hidden">
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{project.title}</CardTitle>
                    <Badge variant={project.statusVariant}>
                      {project.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="line-clamp-3 text-sm leading-relaxed">
                    {project.description}
                  </CardDescription>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="link"
                    render={<Link href={project.href} />}
                    className="px-0 text-orange-600"
                  >
                    Learn More
                    <ChevronRight className="ml-0.5 size-3.5" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Separator />

      {/* ── Upcoming Events ── */}
      <section className="bg-muted/30 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <Badge variant="outline" className="mb-3">
                Join Us
              </Badge>
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
                Upcoming Events
              </h2>
              <p className="mt-2 max-w-xl text-muted-foreground">
                Participate in our wellness programs and community events.
              </p>
            </div>
            <Button variant="outline" render={<Link href="/events" />}>
              View All Events
              <ArrowRight className="ml-1 size-4" />
            </Button>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3">
            {events.map((event) => (
              <Card key={event.title}>
                <CardHeader>
                  <div className="mb-1 flex items-center gap-2 text-sm text-orange-600">
                    <Calendar className="size-4" />
                    <span>{event.date}</span>
                  </div>
                  <CardTitle className="text-lg">{event.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <CardDescription className="line-clamp-2 text-sm leading-relaxed">
                    {event.description}
                  </CardDescription>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <MapPin className="size-3.5" />
                    <span>{event.location}</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="link"
                    render={<Link href={event.href} />}
                    className="px-0 text-orange-600"
                  >
                    Register Now
                    <ChevronRight className="ml-0.5 size-3.5" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="bg-background py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center sm:mb-12">
            <Badge variant="outline" className="mb-3">
              Stories of Change
            </Badge>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
              What People Say
            </h2>
            <p className="mt-2 mx-auto max-w-xl text-muted-foreground">
              Hear from the individuals whose lives have been touched by NCV&apos;s
              wellness programs.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t) => (
              <Card key={t.name}>
                <CardContent className="pt-6">
                  <Quote className="mb-3 size-8 text-orange-200 dark:text-orange-800" />
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </CardContent>
                <CardFooter>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={t.avatar} alt={t.name} />
                      <AvatarFallback>{t.initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{t.name}</p>
                      <p className="text-xs text-muted-foreground">{t.role}</p>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── Call to Action ── */}
      <section className="bg-gradient-to-r from-amber-600 via-orange-600 to-green-700 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <Sparkles className="mx-auto mb-4 size-12 text-white/80" />
          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
            Join Us in Building a Healthier Society
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-orange-100 sm:text-lg">
            Together, let&apos;s build a healthier, happier, and more compassionate
            society through Yoga, Positive Thinking, and Selfless Service. Your
            support can transform lives.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              size="lg"
              render={<Link href="/volunteer" />}
              className="bg-white text-orange-700 hover:bg-orange-50"
            >
              <Heart className="mr-1.5 size-4" />
              Join Our Programs
            </Button>
            <Button
              size="lg"
              variant="outline"
              render={<Link href="/contact" />}
              className="border-white/30 text-white hover:bg-white/10 hover:text-white"
            >
              Contact Us
              <ArrowRight className="ml-1.5 size-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* ── Partners / Supporters ── */}
      <section className="bg-background py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center sm:mb-12">
            <Badge variant="outline" className="mb-3">
              Our Network
            </Badge>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
              Partners &amp; Supporters
            </h2>
            <p className="mt-2 mx-auto max-w-xl text-muted-foreground">
              We are proud to collaborate with organizations that share our
              vision for a healthier world.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-6">
            {partners.map((partner) => (
              <div
                key={partner}
                className="flex aspect-[3/2] items-center justify-center rounded-xl border border-dashed bg-muted/30 p-4 text-xs text-muted-foreground"
              >
                {partner}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
