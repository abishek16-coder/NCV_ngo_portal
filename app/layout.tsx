import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://ncvtrust.org";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "NCV | Health • Yoga • Positive Thinking",
    template: "%s | Narchinthanai Vattam",
  },
  description:
    "Narchinthanai Vattam (NCV) is a registered charitable trust dedicated to promoting holistic health, yoga, positive thinking, education, and community welfare.",
  keywords: [
    "NCV",
    "Narchinthanai Vattam",
    "yoga",
    "positive thinking",
    "health",
    "wellness",
    "meditation",
    "charitable trust",
    "Chennai",
    "community service",
  ],
  authors: [{ name: "Narchinthanai Vattam" }],
  creator: "Narchinthanai Vattam",
  publisher: "Narchinthanai Vattam",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Narchinthanai Vattam",
    title: "NCV | Health • Yoga • Positive Thinking",
    description:
      "Narchinthanai Vattam (NCV) is a registered charitable trust dedicated to promoting holistic health, yoga, positive thinking, education, and community welfare.",
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Narchinthanai Vattam",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NCV | Health • Yoga • Positive Thinking",
    description:
      "Narchinthanai Vattam (NCV) is a registered charitable trust dedicated to promoting holistic health, yoga, positive thinking, education, and community welfare.",
    images: [`${siteUrl}/og-image.jpg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={cn("font-sans", inter.variable)}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "NGO",
              name: "Narchinthanai Vattam (NCV)",
              url: siteUrl,
              logo: `${siteUrl}/logo.png`,
              description:
                "Narchinthanai Vattam is a registered charitable trust dedicated to promoting holistic health, yoga, positive thinking, education, and community welfare.",
              address: {
                "@type": "PostalAddress",
                addressCountry: "IN",
              },
              sameAs: [
                `${siteUrl}/about`,
                `${siteUrl}/contact`,
              ],
            }),
          }}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
