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
import { Skeleton } from "@/components/ui/skeleton";
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
} from "lucide-react";

const stats = [
  { label: "Years of Service", value: "10+", icon: Clock },
  { label: "Projects Completed", value: "50+", icon: FolderOpen },
  { label: "Lives Impacted", value: "5000+", icon: Heart },
  { label: "Volunteers", value: "200+", icon: Users },
];

const projects = [
  {
    title: "Digital Literacy for Rural Schools",
    description:
      "Equipping rural schools with computers and internet access to bridge the digital divide and empower students with essential technology skills.",
    image: "https://placehold.co/800x500/2563EB/ffffff?text=Digital+Literacy",
    status: "Active",
    statusVariant: "default" as const,
    href: "/projects/digital-literacy",
  },
  {
    title: "Clean Water Initiative",
    description:
      "Installing water purification systems in underserved villages to provide safe drinking water and reduce waterborne diseases.",
    image: "https://placehold.co/800x500/059669/ffffff?text=Clean+Water",
    status: "Completed",
    statusVariant: "secondary" as const,
    href: "/projects/clean-water",
  },
  {
    title: "Women Empowerment Program",
    description:
      "Providing skill development training and micro-loans to women in rural communities to foster financial independence and leadership.",
    image: "https://placehold.co/800x500/F59E0B/ffffff?text=Women+Empowerment",
    status: "Active",
    statusVariant: "default" as const,
    href: "/projects/women-empowerment",
  },
];

const projectSkeletons = [1, 2, 3];

const events = [
  {
    title: "Annual Charity Gala 2026",
    description:
      "Join us for an evening of inspiration, music, and fundraising to support our education initiatives across rural India.",
    date: "August 15, 2026",
    location: "The Grand Hall, New Delhi",
    href: "/events/charity-gala-2026",
  },
  {
    title: "Community Health Camp",
    description:
      "Free health check-ups, dental screenings, and medical consultations for underserved communities in Rajasthan.",
    date: "September 2, 2026",
    location: "Community Center, Jaipur",
    href: "/events/health-camp",
  },
  {
    title: "Volunteer Orientation Workshop",
    description:
      "Learn about our ongoing projects and discover how you can make a difference. Open to all prospective volunteers.",
    date: "September 20, 2026",
    location: "NCV Trust Office, New Delhi",
    href: "/events/volunteer-orientation",
  },
];

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Teacher, Rural School",
    avatar: "https://placehold.co/100x100/2563EB/ffffff?text=PS",
    initials: "PS",
    quote:
      "NCV Trust transformed our school completely. The students now have access to computers and the internet for the first time. Their enthusiasm for learning has skyrocketed.",
  },
  {
    name: "Rajesh Kumar",
    role: "Village Leader",
    avatar: "https://placehold.co/100x100/059669/ffffff?text=RK",
    initials: "RK",
    quote:
      "The clean water project brought safe drinking water to our village of 2,000 people. We no longer worry about waterborne diseases. NCV Trust truly cares about communities.",
  },
  {
    name: "Anita Devi",
    role: "Program Beneficiary",
    avatar: "https://placehold.co/100x100/F59E0B/ffffff?text=AD",
    initials: "AD",
    quote:
      "Thanks to the women empowerment program, I started my own tailoring business. I can now support my family independently. This organization changed my life.",
  },
];

const partners = [
  "Partner Logo 1",
  "Partner Logo 2",
  "Partner Logo 3",
  "Partner Logo 4",
  "Partner Logo 5",
  "Partner Logo 6",
];

export default function HomePage() {
  return (
    <>
      {/* ── Hero Banner ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-teal-600">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{
            backgroundImage:
              "url('https://placehold.co/1600x900/1e3a5f/ffffff?text=NCV+Trust+Hero')",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
          <div className="max-w-3xl">
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl xl:text-6xl">
              Empowering Communities, Transforming Lives
            </h1>
            <p className="mt-4 text-base text-blue-100 sm:mt-6 sm:text-lg lg:text-xl">
              NCV Trust is dedicated to creating lasting change through education,
              community development, and social welfare programs that uplift
              underserved communities across India.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:mt-10">
              <Button
                size="lg"
                render={<Link href="/donate" />}
                className="bg-white text-blue-700 hover:bg-blue-50"
              >
                <Heart className="mr-1.5 size-4" />
                Donate Now
              </Button>
              <Button
                size="lg"
                variant="outline"
                render={<Link href="/about" />}
                className="border-white/30 text-white hover:bg-white/10 hover:text-white"
              >
                Learn More
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
                About NCV Trust
              </h2>
              <p className="mt-4 text-muted-foreground sm:text-lg">
                Founded in 2014, NCV Trust has been at the forefront of community
                development and social welfare. We believe that every individual
                deserves access to quality education, clean water, and opportunities
                for economic growth.
              </p>
              <p className="mt-4 text-muted-foreground">
                Our team of dedicated professionals and volunteers work tirelessly
                across rural and underserved areas to implement sustainable programs
                that create measurable, long-term impact. From digital literacy
                initiatives to women&apos;s empowerment programs, we address the
                most pressing challenges facing communities today.
              </p>
              <div className="mt-8">
                <Button variant="outline" render={<Link href="/about" />}>
                  Read Our Story
                  <ChevronRight className="ml-1 size-4" />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat) => (
                <Card key={stat.label} className="text-center">
                  <CardContent className="flex flex-col items-center gap-2 pt-6">
                    <div className="flex size-12 items-center justify-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-950">
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
            <Card className="border-l-4 border-l-blue-600">
              <CardHeader>
                <div className="mb-2 flex size-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-950">
                  <Target className="size-5" />
                </div>
                <CardTitle className="text-xl">Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed text-muted-foreground">
                  To empower underserved communities through sustainable
                  education, health, and livelihood programs. We are committed to
                  creating equitable opportunities that enable individuals and
                  families to break the cycle of poverty and build brighter
                  futures.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-teal-600">
              <CardHeader>
                <div className="mb-2 flex size-10 items-center justify-center rounded-lg bg-teal-50 text-teal-600 dark:bg-teal-950">
                  <Eye className="size-5" />
                </div>
                <CardTitle className="text-xl">Our Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed text-muted-foreground">
                  A world where every community has access to quality education,
                  clean water, and sustainable livelihoods. We envision
                  self-reliant villages where people are empowered to lead
                  dignified lives and contribute meaningfully to society.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ── Impact Counter ── */}
      <section className="bg-gradient-to-r from-blue-600 to-teal-600 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center sm:mb-12">
            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
              Our Impact in Numbers
            </h2>
            <p className="mt-2 text-blue-100 sm:text-lg">
              Measurable change, one life at a time
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {[
              { value: "5000+", label: "Lives Impacted", icon: Heart },
              { value: "50+", label: "Projects Completed", icon: FolderOpen },
              { value: "200+", label: "Volunteers", icon: Users },
              { value: "10+", label: "Years of Service", icon: Clock },
            ].map((item) => (
              <div
                key={item.label}
                className="flex flex-col items-center rounded-xl bg-white/10 p-6 text-center backdrop-blur-sm sm:p-8"
              >
                <item.icon className="mb-3 size-8 text-white/80" />
                <p className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
                  {item.value}
                </p>
                <p className="mt-1 text-sm text-blue-100 sm:text-base">
                  {item.label}
                </p>
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
                Latest Projects
              </h2>
              <p className="mt-2 max-w-xl text-muted-foreground">
                Explore our ongoing initiatives that are making a real difference
                in communities across India.
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
                    className="px-0 text-blue-600"
                  >
                    Learn More
                    <ChevronRight className="ml-0.5 size-3.5" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* Skeleton Loading Variant */}
          <div className="mt-10">
            <p className="mb-4 text-sm font-medium text-muted-foreground">
              Loading state preview:
            </p>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {projectSkeletons.map((i) => (
                <Card key={i} className="overflow-hidden">
                  <Skeleton className="aspect-video w-full rounded-none" />
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <Skeleton className="h-5 w-48" />
                      <Skeleton className="h-5 w-16 rounded-full" />
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </CardContent>
                  <CardFooter>
                    <Skeleton className="h-4 w-24" />
                  </CardFooter>
                </Card>
              ))}
            </div>
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
                What&apos;s Happening
              </Badge>
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
                Upcoming Events
              </h2>
              <p className="mt-2 max-w-xl text-muted-foreground">
                Join us at our upcoming events and be part of the change.
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
                  <div className="mb-1 flex items-center gap-2 text-sm text-blue-600">
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
                    className="px-0 text-blue-600"
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
              Hear from the communities and individuals whose lives have been
              touched by our work.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t) => (
              <Card key={t.name}>
                <CardContent className="pt-6">
                  <Quote className="mb-3 size-8 text-blue-200 dark:text-blue-800" />
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
      <section className="bg-gradient-to-r from-blue-600 to-teal-600 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <HandHeart className="mx-auto mb-4 size-12 text-white/80" />
          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
            Join Us in Making a Difference
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-blue-100 sm:text-lg">
            Your support can change lives. Whether you donate, volunteer, or spread
            the word, every action counts towards building stronger, more
            resilient communities.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              size="lg"
              render={<Link href="/donate" />}
              className="bg-white text-blue-700 hover:bg-blue-50"
            >
              <Heart className="mr-1.5 size-4" />
              Donate Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              render={<Link href="/volunteer" />}
              className="border-white/30 text-white hover:bg-white/10 hover:text-white"
            >
              Become a Volunteer
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
              vision for a better world.
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
