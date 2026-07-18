import { PublicPageShell } from "@/components/public/page-shell";

export default function EventsPage() {
  return (
    <PublicPageShell
      eyebrow="Events"
      title="Join our wellness gatherings and community sessions"
      description="Stay connected with yoga workshops, meditation camps, and special community events hosted by NCV Trust throughout the year."
      primaryHref="/"
      primaryLabel="Back to home"
      secondaryHref="/contact"
      secondaryLabel="Contact the team"
    />
  );
}
