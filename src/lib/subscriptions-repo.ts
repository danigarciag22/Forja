import "server-only";
import type Stripe from "stripe";
import { getSupabaseAdmin } from "./supabase/admin";
import { isInterval, type PlanId } from "./plans";

const VALID_PLANS: readonly PlanId[] = ["fitness", "nutricion", "combo"];

/**
 * Upsert the entitlement row from a Stripe subscription. Keyed on
 * stripe_subscription_id so created/updated/deleted events all converge.
 * Returns false (no-op) when the subscription lacks our user_id metadata.
 */
export async function upsertSubscriptionFromStripe(
  sub: Stripe.Subscription,
): Promise<boolean> {
  const md = sub.metadata ?? {};
  const userId = md.user_id;
  if (!userId) {
    console.error("[subscriptions] missing user_id metadata on", sub.id);
    return false;
  }

  const plan = VALID_PLANS.includes(md.plan as PlanId)
    ? (md.plan as PlanId)
    : "combo";
  const interval = isInterval(md.interval) ? md.interval : null;
  const customerId =
    typeof sub.customer === "string" ? sub.customer : sub.customer.id;
  const periodEnd = sub.items.data[0]?.current_period_end ?? null;

  const { error } = await getSupabaseAdmin()
    .from("subscriptions")
    .upsert(
      {
        user_id: userId,
        plan,
        interval,
        status: sub.status,
        stripe_customer_id: customerId,
        stripe_subscription_id: sub.id,
        current_period_end: periodEnd
          ? new Date(periodEnd * 1000).toISOString()
          : null,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "stripe_subscription_id" },
    );

  if (error) throw error;
  return true;
}

/** The Stripe customer id for a user's most recent subscription, if any. */
export async function getCustomerIdForUser(
  userId: string,
): Promise<string | null> {
  const { data, error } = await getSupabaseAdmin()
    .from("subscriptions")
    .select("stripe_customer_id")
    .eq("user_id", userId)
    .not("stripe_customer_id", "is", null)
    .order("updated_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) throw error;
  return data?.stripe_customer_id ?? null;
}
