import type Stripe from "stripe";
import type { OrderInsert } from "./supabase/database.types";

/** Pure mapping of a completed Checkout Session → an orders row. Unit-testable. */
export function orderFromSession(
  session: Stripe.Checkout.Session,
  productId: string | null,
): OrderInsert {
  const email = session.customer_details?.email ?? session.customer_email ?? null;
  if (!email) {
    throw new Error("checkout session has no email");
  }
  const paymentIntent =
    typeof session.payment_intent === "string"
      ? session.payment_intent
      : (session.payment_intent?.id ?? null);

  return {
    product_id: productId,
    email,
    stripe_session_id: session.id,
    stripe_payment_intent: paymentIntent,
    amount_cents: session.amount_total ?? 0,
    currency: session.currency ?? "usd",
    status: "paid",
  };
}
