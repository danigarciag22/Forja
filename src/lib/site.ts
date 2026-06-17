/** Canonical site config for metadata, OG, sitemap, robots, JSON-LD. */

function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit && explicit.startsWith("https://")) return explicit.replace(/\/+$/, "");
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;
  return "https://forja-danigarciag22s-projects.vercel.app";
}

export const SITE_URL = resolveSiteUrl();
export const SITE_NAME = "FORJA";
export const SITE_TITLE = "FORJA — Forja tu físico. Domina el sistema.";
export const SITE_TAGLINE = "Forja tu físico. Domina el sistema.";
export const SITE_DESCRIPTION =
  "Protocolos sin relleno, guías tácticas y una comunidad que entrena en serio. E-books de entrenamiento, estética y nutrición. Cero excusas.";
export const SITE_LOCALE = "es_ES";
