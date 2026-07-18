import { PublicPageShell } from "@/components/public/page-shell";

export default function ContactPage() {
  return (
    <PublicPageShell
      eyebrow="Contact"
      title="Let’s connect"
      description="Reach out to NCV Trust for inquiries, collaborations, volunteering, or support. We’re always happy to hear from those who want to make a positive impact."
      primaryHref="/"
      primaryLabel="Back to home"
      secondaryHref="/volunteer"
      secondaryLabel="Volunteer with us"
    />
  );
}
