import { PublicPageShell } from "@/components/public/page-shell";

export default function ProjectsPage() {
  return (
    <PublicPageShell
      eyebrow="Our projects"
      title="Impact-focused programs for health and upliftment"
      description="From daily yoga initiatives to community welfare outreach, NCV designs projects that bring tangible value to families, students, and senior citizens alike."
      primaryHref="/"
      primaryLabel="Back to home"
      secondaryHref="/events"
      secondaryLabel="See upcoming events"
    />
  );
}
