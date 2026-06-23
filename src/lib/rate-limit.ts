// ponytail: in-memory limiter, per-instance only. On Vercel serverless each
// function instance keeps its own Map and cold starts reset it, so this caps a
// single hot instance, not the whole fleet. Swap to Upstash/Vercel KV for
// multi-instance correctness when traffic justifies it.

const RATE_WINDOW_MS = 60_000; // per minute, per key
export const RATE_RETRY_AFTER = RATE_WINDOW_MS / 1000;

const hits = new Map<string, { count: number; resetAt: number }>();

export function clientIp(req: Request): string {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}

/** True when `key` has exceeded `limit` requests in the current window. */
export function isRateLimited(key: string, limit = 10): boolean {
  const now = Date.now();
  const entry = hits.get(key);
  if (!entry || now > entry.resetAt) {
    if (hits.size > 5000) {
      for (const [k, v] of hits) if (now > v.resetAt) hits.delete(k);
    }
    hits.set(key, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }
  hits.set(key, { count: entry.count + 1, resetAt: entry.resetAt });
  return entry.count + 1 > limit;
}
