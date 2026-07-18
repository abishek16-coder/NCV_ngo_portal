import Link from "next/link";
import { Heart } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const footerLinks = {
  organization: [
    { href: "/about", label: "About Us" },
    { href: "/projects", label: "Our Projects" },
    { href: "/events", label: "Events" },
    { href: "/contact", label: "Contact" },
  ],
  support: [
    { href: "/donate", label: "Donate" },
    { href: "/volunteer", label: "Volunteer" },
    { href: "/partners", label: "Partners" },
    { href: "/faq", label: "FAQ" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-3">
            <Link href="/" className="flex items-center gap-2 text-lg font-bold">
              <span className="flex size-7 items-center justify-center rounded-lg bg-blue-600 text-white">
                <Heart className="size-3.5" />
              </span>
              NCV Trust
            </Link>
            <p className="text-sm text-muted-foreground">
              Empowering communities through education, development, and social welfare since 2014.
            </p>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold">Organization</h4>
            <ul className="space-y-2">
              {footerLinks.organization.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold">Support</h4>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold">Contact</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>123 NGO Street, New Delhi, India</li>
              <li>info@ncvtrust.org</li>
              <li>+91 98765 43210</li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col items-center justify-between gap-2 text-xs text-muted-foreground sm:flex-row">
          <p>&copy; {new Date().getFullYear()} NCV Trust. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-foreground">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-foreground">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
