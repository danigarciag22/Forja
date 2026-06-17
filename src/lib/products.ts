/**
 * FORJA catalog. Single source of truth for the carousel display, the
 * featured product detail page, the Supabase seed, and checkout pricing.
 *
 * The design routes every carousel "Adquirir" to ONE product page showing
 * the featured "Volumen Limpio" funnel ($120 → $49). That featured product
 * is the one purchasable item end-to-end.
 */

export type CarouselBook = {
  slug: string;
  title: string;
  kicker: string;
  price: string;
  priceCents: number;
  best?: boolean;
};

/** Verbatim placeholder catalog from the design carousel (display). */
export const CAROUSEL_BOOKS: CarouselBook[] = [
  { slug: "hierro", title: "Protocolo Hipertrofia: 6 Días de Hierro", kicker: "Entrenamiento · Nº1", price: "$19", priceCents: 1900, best: true },
  { slug: "volumen-limpio", title: "Volumen Limpio: Construyendo la Máquina de 95kg", kicker: "Volumen · Nº2", price: "$19", priceCents: 1900 },
  { slug: "lookmaxxing", title: "Lookmaxxing: Evolución y Postura", kicker: "Estética · Nº3", price: "$17", priceCents: 1700 },
  { slug: "combustible", title: "Combustible Diario: Shots de Jengibre, Cúrcuma y Recuperación", kicker: "Nutrición · Nº4", price: "$15", priceCents: 1500 },
  { slug: "boxeo", title: "Acondicionamiento Físico y Boxeo de Combate", kicker: "Combate · Nº5", price: "$21", priceCents: 2100 },
  { slug: "macros", title: "Recetario de Macros y Sobrecarga Progresiva", kicker: "Nutrición · Nº6", price: "$15", priceCents: 1500 },
];

/** The featured, purchasable product (the designed PDP funnel). */
export const FEATURED_PRODUCT = {
  slug: "volumen-limpio",
  title: "Protocolo: Volumen Limpio y Construcción Sólida",
  priceCents: 4900,
  anchorCents: 12000,
  currency: "usd",
} as const;

export const FEATURED_SLUG = FEATURED_PRODUCT.slug;

/** All products seeded into Supabase (featured price wins for the shared slug). */
export const SEED_PRODUCTS = CAROUSEL_BOOKS.map((b) =>
  b.slug === FEATURED_PRODUCT.slug
    ? {
        slug: b.slug,
        title: FEATURED_PRODUCT.title,
        price_cents: FEATURED_PRODUCT.priceCents,
        currency: FEATURED_PRODUCT.currency,
      }
    : { slug: b.slug, title: b.title, price_cents: b.priceCents, currency: "usd" },
);
