import Link from "next/link";
import { ArrowRight, HandHeart } from "lucide-react";

export function PublicPageShell({
  title,
  description,
  eyebrow,
  primaryHref = "/",
  primaryLabel = "Back to home",
  secondaryHref = "/volunteer",
  secondaryLabel = "Join a program",
}: {
  title: string;
  description: string;
  eyebrow: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
}) {
  return (
    <section className="min-h-[72vh] bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border border-[#1B8271]/20 bg-white p-8 shadow-[0_20px_80px_rgba(27,130,113,0.12)] sm:p-10 lg:p-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#1B8271]/20 bg-[#1B8271]/5 px-3 py-1.5 text-sm font-semibold text-[#1B8271]">
            <HandHeart className="size-4" />
            <span>{eyebrow}</span>
          </div>

          <h1 className="mt-6 text-4xl font-bold tracking-tight text-[#1B8271] sm:text-5xl">
            {title}
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-[#1B8271]">
            {description}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={primaryHref}
              className="inline-flex items-center gap-2 rounded-full bg-[#FF6B35] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[#FF6B35]/20 transition-transform hover:scale-[1.02] hover:bg-[#FF6B35]/90"
            >
              {primaryLabel}
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href={secondaryHref}
              className="inline-flex items-center rounded-full border border-[#1B8271]/20 bg-white px-5 py-3 text-sm font-semibold text-[#1B8271] transition-colors hover:border-[#1B8271]/30"
            >
              {secondaryLabel}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
