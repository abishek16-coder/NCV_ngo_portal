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
    <section className="min-h-[72vh] bg-[linear-gradient(135deg,#fff7ed_0%,#fffbeb_40%,#fef3c7_100%)] py-20 sm:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border border-orange-100 bg-white/80 p-8 shadow-[0_20px_80px_rgba(249,115,22,0.12)] backdrop-blur-xl sm:p-10 lg:p-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-3 py-1.5 text-sm font-semibold text-orange-700">
            <HandHeart className="size-4" />
            <span>{eyebrow}</span>
          </div>

          <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            {title}
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
            {description}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={primaryHref}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-200 transition-transform hover:scale-[1.02]"
            >
              {primaryLabel}
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href={secondaryHref}
              className="inline-flex items-center rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-orange-200 hover:text-orange-600"
            >
              {secondaryLabel}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
