import { PublicPageShell } from "@/components/public/page-shell";

export default function GalleryPage() {
  return (
    <PublicPageShell
      eyebrow="Gallery"
      title="Moments from our programs and community outreach"
      description="Browse highlights from yoga sessions, workshops, volunteer efforts, and social welfare activities carried out by NCV Trust."
      primaryHref="/"
      primaryLabel="Back to home"
      secondaryHref="/projects"
      secondaryLabel="View our projects"
    />
  );
}
