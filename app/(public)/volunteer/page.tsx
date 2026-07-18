import { PublicPageShell } from "@/components/public/page-shell";

export default function VolunteerPage() {
  return (
    <PublicPageShell
      eyebrow="Volunteer"
      title="Become part of the change"
      description="Join NCV Trust as a volunteer and contribute to wellness programs, outreach initiatives, and community service efforts that make a lasting difference."
      primaryHref="/"
      primaryLabel="Back to home"
      secondaryHref="/contact"
      secondaryLabel="Get in touch"
    />
  );
}
