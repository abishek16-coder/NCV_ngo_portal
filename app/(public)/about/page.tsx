import { PublicPageShell } from "@/components/public/page-shell";

export default function AboutPage() {
  return (
    <PublicPageShell
      eyebrow="About NCV"
      title="Serving communities through wellness and service"
      description="NCV Trust is committed to holistic well-being through yoga, education, positive thinking, and compassionate community programs. This page is now live so the About link in the navbar works seamlessly."
      primaryHref="/"
      primaryLabel="Back to home"
      secondaryHref="/volunteer"
      secondaryLabel="Join a volunteer program"
    />
  );
}
