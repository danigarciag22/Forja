/**
 * PDP content model. One typed object per book drives the entire product page,
 * so adding a book = adding a `<slug>.ts` content file (+ a Supabase row + real
 * images). The page layout is identical for every book; only this data changes.
 */

export type GalleryImage = { src: string; alt: string; w: number; h: number };
export type PdpVariant = { id: string; label: string; note: string; mark: string };
export type Chapter = { n: string; title: string };
export type ValueStackItem = { n: string; title: string; was: string; tag: string };
export type Testimonial = { name: string; quote: string };
export type FaqItem = { q: string; a: string };

export type ProductContent = {
  slug: string;
  eyebrow: string; // "Arsenal · Edición Nº2"
  title: string; // H1
  shortTitle: string; // breadcrumb + sticky bar
  description: string; // meta + intro
  rating: { value: number; count: number };
  priceCents: number; // sale price (must match the Supabase products row)
  anchorCents: number; // struck-through "before" price
  currency: string; // "usd"
  urgency?: string; // ribbon copy
  gallery: GalleryImage[]; // [main, ...thumbs]
  variants: PdpVariant[];
  benefits: string[];
  format: { pages: number; formats: string[]; delivery: string[] };
  chapters: Chapter[]; // "¿Qué incluye?" / Índice del Sistema
  valueStack: ValueStackItem[];
  valueTotalWas: string; // "$105"
  testimonials: Testimonial[];
  guarantee: { days: number; title: string; copy: string };
  faq: FaqItem[];
};
