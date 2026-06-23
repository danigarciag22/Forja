import type Stripe from "stripe";
import { TRIAL_DAYS, type Interval, type PlanId } from "./plans.ts";

/** Pure subscription-checkout logic — no Stripe/Supabase I/O, unit-testable. */

export type SubscriptionCheckoutInput = {
  priceId: string;
  plan: PlanId;
  interval: Interval;
  userId: string;
  customerEmail?: string;
  siteUrl: string;
};

/**
 * Build the Stripe Checkout Session params for a subscription with a free trial.
 * user_id/plan/interval are stamped on both the session and the subscription so
 * the webhook can attribute the entitlement to the right account.
 */
export function buildSubscriptionParams(
  input: SubscriptionCheckoutInput,
): Stripe.Checkout.SessionCreateParams {
  const base = input.siteUrl.replace(/\/+$/, "");
  const metadata = {
    user_id: input.userId,
    plan: input.plan,
    interval: input.interval,
  };
  return {
    mode: "subscription",
    line_items: [{ price: input.priceId, quantity: 1 }],
    client_reference_id: input.userId,
    customer_email: input.customerEmail,
    subscription_data: {
      trial_period_days: TRIAL_DAYS,
      metadata,
    },
    metadata,
    success_url: `${base}/compra/exito?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${base}/precios`,
  };
}
