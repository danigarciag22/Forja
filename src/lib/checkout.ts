import type Stripe from "stripe";

/** Pure checkout logic — no Stripe/Supabase I/O, so it is unit-testable. */

export type CheckoutInput = { slug: string };

export class CheckoutValidationError extends Error {}

/** Validate the POST /api/checkout body. Throws CheckoutValidationError. */
export function parseCheckoutRequest(body: unknown): CheckoutInput {
  if (!body || typeof body !== "object") {
    throw new CheckoutValidationError("body must be an object");
  }
  const slug = (body as Record<string, unknown>).slug;
  if (typeof slug !== "string" || slug.trim() === "") {
    throw new CheckoutValidationError("slug is required");
  }
  if (slug.length > 80) {
    throw new CheckoutValidationError("slug too long");
  }
  return { slug: slug.trim() };
}

export type CheckoutProduct = {
  slug: string;
  title: string;
  price_cents: number;
  currency: string;
};

/** Build the Stripe Checkout Session params. Price always comes from the DB row. */
export function buildCheckoutParams(
  product: CheckoutProduct,
  siteUrl: string,
): Stripe.Checkout.SessionCreateParams {
  const base = siteUrl.replace(/\/+$/, "");
  return {
    mode: "payment",
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: product.currency,
          unit_amount: product.price_cents,
          product_data: {
            name: product.title,
            metadata: { slug: product.slug },
          },
        },
      },
    ],
    success_url: `${base}/compra/exito?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${base}/compra/cancelada`,
    metadata: { slug: product.slug },
  };
}
