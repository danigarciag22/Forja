import type { Metadata } from "next";
import { ProductPage } from "@/components/landing/ProductPage";
import { SITE_URL } from "@/lib/site";

const TITLE = "Protocolo: Volumen Limpio y Construcción Sólida — FORJA";
const DESCRIPTION =
  "El sistema de volumen limpio de FORJA: hipertrofia, sobrecarga progresiva y rutinas de 1 hora. Garantía táctica de 30 días.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/producto" },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/producto`,
    title: TITLE,
    description: DESCRIPTION,
  },
};

const productJsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Protocolo: Volumen Limpio y Construcción Sólida",
  description: DESCRIPTION,
  image: `${SITE_URL}/assets/titan-cover.png`,
  brand: { "@type": "Brand", name: "FORJA" },
  offers: {
    "@type": "Offer",
    price: "49.00",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
    url: `${SITE_URL}/producto`,
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "1240",
  },
};

export default function Producto() {
  return (
    <>
      <script
        type="application/ld+json"
        // Static, trusted data; escape `<` to prevent any </script> breakout.
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <ProductPage />
    </>
  );
}
