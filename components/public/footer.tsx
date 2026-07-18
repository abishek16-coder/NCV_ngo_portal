import Link from "next/link";
import { Heart, MapPin, Phone } from "lucide-react";
import { Separator } from "@/components/ui/separator";

// Inline SVGs for brand icons not available in lucide-react v1.x
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

const footerLinks = [
  { href: "/about", label: "About Us" },
  { href: "/projects", label: "Projects & Events" },
  { href: "/gallery", label: "Gallery" },
  { href: "/volunteer", label: "Volunteer" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-3">
            <Link href="/" className="flex items-center gap-2 text-lg font-bold text-white">
              <span className="flex size-7 items-center justify-center rounded-lg bg-orange-600 text-white">
                <Heart className="size-3.5" />
              </span>
              NCV
            </Link>
            <p className="text-sm text-gray-400">
              Narchinthanai Vattam (NCV) &ndash; A registered charitable trust
              dedicated to promoting holistic health, yoga, positive thinking,
              education, and community welfare.
            </p>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold text-white">Quick Links</h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 transition-colors hover:text-orange-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold text-white">Programs</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Daily Yoga Classes</li>
              <li>Free Online Yoga Sessions</li>
              <li>Positive Thinking Workshops</li>
              <li>Health Awareness Campaigns</li>
              <li>Community Service Activities</li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold text-white">Contact</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 size-4 shrink-0 text-orange-400" />
                <span>
                  87, 4th St, West Kamakoti Nagar,
                  <br />
                  Valasaravakkam, Chennai,
                  <br />
                  Tamil Nadu 600095, India
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="size-4 shrink-0 text-orange-400" />
                <span>9003075333</span>
              </li>
              <li className="flex items-center gap-2">
                <InstagramIcon className="size-4 shrink-0 text-orange-400" />
                <span>ncv_speaks</span>
              </li>
              <li className="flex items-center gap-2">
                <FacebookIcon className="size-4 shrink-0 text-orange-400" />
                <span>Narchinthanai Vattam</span>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-gray-800" />

        <div className="flex flex-col items-center justify-between gap-2 text-xs text-gray-500 sm:flex-row">
          <p>
            &copy; {new Date().getFullYear()} Narchinthanai Vattam (NCV). All
            rights reserved.
          </p>
          <p className="text-center text-gray-600">
            Health &bull; Yoga &bull; Positive Thinking
          </p>
        </div>
      </div>
    </footer>
  );
}
