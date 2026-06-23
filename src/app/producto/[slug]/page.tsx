import type { Metadata } from "next";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { ProductPage } from "@/components/landing/ProductPage";
import { getProductContent, listProductSlugs } from "@/content/products";
import { SITE_URL } from "@/lib/site";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return listProductSlugs().map((slug) => ({ slug }));
}

// Only catalog slugs prerender; anything else 404s.
export const dynamicParams = false;

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const c = getProductContent(slug);
  if (!c) return {};
  const title = `${c.title} — FORJA`;
  return {
    title,
    description: c.description,
    alternates: { canonical: `/producto/${slug}` },
    openGraph: {
      type: "website",
      url: `${SITE_URL}/producto/${slug}`,
      title,
      description: c.description,
    },
  };
}

const escapeJson = (o: unknown) => JSON.stringify(o).replace(/</g, "\\u003c");

export default async function ProductoSlug({ params }: Params) {
  const { slug } = await params;
  const content = getProductContent(slug);
  if (!content) notFound();

  // CSP nonce (from middleware) so the JSON-LD scripts pass a strict policy.
  const nonce = (await headers()).get("x-nonce") ?? undefined;
  // Guard against an empty/missing gallery so the schema image never crashes.
  const heroSrc = content.gallery?.[0]?.src ?? "";

  const productLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: content.title,
    description: content.description,
    image: `${SITE_URL}${heroSrc}`,
    brand: { "@type": "Brand", name: "FORJA" },
    offers: {
      "@type": "Offer",
      price: (content.priceCents / 100).toFixed(2),
      priceCurrency: content.currency.toUpperCase(),
      availability: "https://schema.org/InStock",
      url: `${SITE_URL}/producto/${slug}`,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: content.rating.value.toString(),
      reviewCount: content.rating.count.toString(),
    },
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: content.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        nonce={nonce}
        dangerouslySetInnerHTML={{ __html: escapeJson(productLd) }}
      />
      <script
        type="application/ld+json"
        nonce={nonce}
        dangerouslySetInnerHTML={{ __html: escapeJson(faqLd) }}
      />
      <ProductPage key={content.slug} content={content} />
    </>
  );
}
