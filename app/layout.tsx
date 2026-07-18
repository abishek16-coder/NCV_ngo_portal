import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://ncvtrust.org";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "NCV Trust | Empowering Communities, Transforming Lives",
    template: "%s | NCV Trust",
  },
  description:
    "NCV Trust is a non-profit organization dedicated to education, community development, and social welfare. Join us in making a difference.",
  keywords: [
    "NGO",
    "NCV Trust",
    "non-profit",
    "education",
    "community development",
    "social welfare",
    "charity",
    "volunteer",
    "donate",
  ],
  authors: [{ name: "NCV Trust" }],
  creator: "NCV Trust",
  publisher: "NCV Trust",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "NCV Trust",
    title: "NCV Trust | Empowering Communities, Transforming Lives",
    description:
      "NCV Trust is a non-profit organization dedicated to education, community development, and social welfare.",
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "NCV Trust",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NCV Trust | Empowering Communities, Transforming Lives",
    description:
      "NCV Trust is a non-profit organization dedicated to education, community development, and social welfare.",
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
              name: "NCV Trust",
              url: siteUrl,
              logo: `${siteUrl}/logo.png`,
              description:
                "NCV Trust is a non-profit organization dedicated to education, community development, and social welfare.",
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
