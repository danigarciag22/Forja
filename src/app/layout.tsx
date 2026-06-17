import type { Metadata } from "next";
import "./globals.css";
import "@/styles/forja/index.css";
import { ForjaShell } from "@/components/landing/ForjaShell";

export const metadata: Metadata = {
  title: "FORJA — Forja tu físico. Domina el sistema.",
  description:
    "Protocolos sin relleno, guías tácticas y una comunidad que entrena en serio. E-books de entrenamiento, estética y nutrición.",
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
