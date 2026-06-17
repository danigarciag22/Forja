import "server-only";
import Stripe from "stripe";

let cached: Stripe | null = null;

/** Lazily-constructed Stripe client (TEST mode key from env). Server only. */
export function getStripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY not configured");
  if (!cached) {
    cached = new Stripe(key, { typescript: true });
  }
  return cached;
}
