import type { Metadata } from "next";
import "./globals.css";
import "@/styles/forja/index.css";
import { ForjaShell } from "@/components/landing/ForjaShell";
import {
  SITE_URL,
  SITE_NAME,
  SITE_TITLE,
  SITE_DESCRIPTION,
  SITE_LOCALE,
} from "@/lib/site";

// Force dynamic rendering app-wide so the per-request CSP nonce (middleware.ts)
// is stamped onto every page's inline scripts. Without this, statically baked
// pages ship nonce-less inline scripts that the strict CSP would block.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "fitness",
    "hipertrofia",
    "e-books fitness",
    "entrenamiento",
    "nutrición",
    "lookmaxxing",
    "FORJA",
    "comunidad fitness",
  ],
  authors: [{ name: SITE_NAME }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: SITE_LOCALE,
    url: SITE_URL,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Anton&family=Bangers&family=Space+Grotesk:wght@300;400;500;700&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ForjaShell>{children}</ForjaShell>
      </body>
    </html>
  );
}
