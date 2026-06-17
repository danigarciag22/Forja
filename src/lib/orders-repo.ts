import "server-only";
import { getSupabaseAdmin } from "./supabase/admin";
import type { CheckoutProduct } from "./checkout";
import type { OrderInsert } from "./supabase/database.types";

/** Active product by slug, or null. Used by checkout for authoritative pricing. */
export async function getProductBySlug(slug: string): Promise<CheckoutProduct | null> {
  const supa = getSupabaseAdmin();
  const { data, error } = await supa
    .from("products")
    .select("slug, title, price_cents, currency")
    .eq("slug", slug)
    .eq("active", true)
    .maybeSingle();
  if (error) throw error;
  return data;
}

/** Product id by slug (any active state), or null. Used by the webhook. */
export async function getProductIdBySlug(slug: string): Promise<string | null> {
  const supa = getSupabaseAdmin();
  const { data, error } = await supa
    .from("products")
    .select("id")
    .eq("slug", slug)
    .maybeSingle();
  if (error) throw error;
  return data?.id ?? null;
}

/**
 * Insert an order, idempotent on stripe_session_id (Stripe retries webhooks).
 * Returns whether this call performed the insert (so the caller sends the email once).
 */
export async function insertOrderIdempotent(
  order: OrderInsert,
): Promise<{ inserted: boolean }> {
  const supa = getSupabaseAdmin();
  const { error } = await supa.from("orders").insert(order);
  if (error) {
    // 23505 = unique_violation on stripe_session_id => already processed.
    if (error.code === "23505") return { inserted: false };
    throw error;
  }
  return { inserted: true };
}
