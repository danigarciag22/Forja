import "server-only";
import { getSupabaseAdmin } from "./supabase/admin";
import type { RecentPostRow } from "./supabase/database.types";

/**
 * Latest social posts for the "Transmisiones Recientes" grid, written by the
 * n8n workflow. Ordered by platform then display position so the consumer can
 * fill its slots in order.
 *
 * Returns [] on ANY error or empty table — this read must never break the
 * landing render, which falls back to static tiles when there are no rows.
 */
export async function getRecentPosts(): Promise<RecentPostRow[]> {
  try {
    const supa = getSupabaseAdmin();
    const { data, error } = await supa
      .from("recent_posts")
      .select("*")
      .order("platform", { ascending: true })
      .order("kind", { ascending: true })
      .order("position", { ascending: true });
    if (error) throw error;
    return data ?? [];
  } catch (err) {
    console.error("[recent-posts] read failed", err);
    return [];
  }
}
