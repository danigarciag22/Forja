import { CAROUSEL_BOOKS, type CarouselBook } from "@/lib/products";
import type { ProductContent } from "./types";
import { volumenLimpio } from "./volumen-limpio";

/** Books with a fully-authored content file. Others fall back to a template. */
const REGISTRY: Record<string, ProductContent> = {
  [volumenLimpio.slug]: volumenLimpio,
};

/**
 * Default template content for books not yet fully authored — derived from the
 * carousel catalog so every book has a working PDP until its real copy + art land.
 */
function buildDefault(book: CarouselBook): ProductContent {
  const shortTitle = book.title.split(/[:—-]/)[0].trim();
  return {
    slug: book.slug,
    eyebrow: `Arsenal · ${book.kicker}`,
    title: book.title,
    shortTitle,
    description: `${book.title} — guía táctica de FORJA. Protocolos sin relleno, descarga inmediata y garantía de 30 días.`,
    rating: { value: 4.8, count: 320 },
    priceCents: book.priceCents,
    anchorCents: book.priceCents * 2,
    currency: "usd",
    urgency: "Edición de lanzamiento a precio reducido",
    gallery: [
      { src: "/assets/titan-cover.png", alt: `Portada de ${shortTitle}`, w: 1408, h: 3008 },
      { src: "/assets/titan-hero.png", alt: "El Titán — vista de la edición", w: 1536, h: 2752 },
      { src: "/assets/titan-video.png", alt: "Vista previa del contenido", w: 2752, h: 1536 },
      { src: "/assets/titan-cover.png", alt: "Contraportada del e-book", w: 1408, h: 3008 },
    ],
    variants: [
      { id: "estandar", label: "Edición Estándar", note: "El sistema completo", mark: "▲" },
    ],
    benefits: [
      "Protocolo paso a paso, sin relleno",
      "Aplicable desde principiante a avanzado",
      "Descarga inmediata en PDF y EPUB",
      "Acceso de por vida + actualizaciones",
    ],
    format: {
      pages: 96,
      formats: ["PDF", "EPUB"],
      delivery: ["Descarga inmediata", "Acceso de por vida", "Actualizaciones gratis"],
    },
    chapters: [
      { n: "01", title: "Fundamentos y Mentalidad" },
      { n: "02", title: "El Protocolo Central" },
      { n: "03", title: "Ejecución Semana a Semana" },
      { n: "04", title: "Métricas y Progreso" },
      { n: "05", title: "Errores Comunes a Evitar" },
    ],
    valueStack: [
      { n: "Vol. 01", title: "Manual Base", was: "$40", tag: "INCLUIDO" },
      { n: "Vol. 02", title: "Plantillas de Seguimiento", was: "$20", tag: "GRATIS" },
      { n: "Vol. 03", title: "Guía de Arranque", was: "$10", tag: "GRATIS" },
    ],
    valueTotalWas: "$70",
    testimonials: [
      { name: "Recluta verificado", quote: "Directo al grano. Resultados medibles desde la primera semana." },
      { name: "Recluta verificado", quote: "Sin paja, sin excusas. Justo lo que necesitaba." },
    ],
    guarantee: {
      days: 30,
      title: "Garantía Táctica de 30 Días",
      copy: "Si no te funciona, escríbenos dentro de 30 días y te devolvemos el 100%. El riesgo lo asumimos nosotros.",
    },
    faq: [
      { q: "¿En qué formato lo recibo?", a: "PDF y EPUB, con descarga inmediata tras la compra." },
      { q: "¿En qué dispositivos puedo leerlo?", a: "En cualquiera: móvil, tablet, e-reader o computadora." },
      { q: "¿Tengo acceso de por vida?", a: "Sí, pago único con acceso permanente y actualizaciones gratis." },
      { q: "¿Y si no me convence?", a: "Tienes 30 días de garantía. Reembolso íntegro, sin preguntas incómodas." },
    ],
  };
}

/** PDP content for a slug, or null if the slug is not a known product. */
export function getProductContent(slug: string): ProductContent | null {
  if (REGISTRY[slug]) return REGISTRY[slug];
  const book = CAROUSEL_BOOKS.find((b) => b.slug === slug);
  return book ? buildDefault(book) : null;
}

/** Every catalog slug gets a statically-generated PDP. */
export function listProductSlugs(): string[] {
  return CAROUSEL_BOOKS.map((b) => b.slug);
}
