import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import {
  parseCheckoutRequest,
  buildCheckoutParams,
  CheckoutValidationError,
} from "@/lib/checkout";
import { getProductBySlug } from "@/lib/orders-repo";

export const runtime = "nodejs";

// ponytail: in-memory limiter, per-instance only. On Vercel serverless each
// function instance keeps its own Map and cold starts reset it, so this caps a
// single hot instance, not the whole fleet. No KV/Upstash is configured; swap to
// Upstash/Vercel KV for multi-instance correctness when traffic justifies it.
const RATE_LIMIT = 10; // requests
const RATE_WINDOW_MS = 60_000; // per minute, per IP
const hits = new Map<string, { count: number; resetAt: number }>();

function clientIp(req: Request): string {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}

/** True when this IP has exceeded RATE_LIMIT in the current window. */
function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now > entry.resetAt) {
    if (hits.size > 5000) {
      for (const [k, v] of hits) if (now > v.resetAt) hits.delete(k);
    }
    hits.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }
  hits.set(ip, { count: entry.count + 1, resetAt: entry.resetAt });
  return entry.count + 1 > RATE_LIMIT;
}

export async function POST(req: Request) {
  // 0. Rate limit (unauthenticated public endpoint).
  if (isRateLimited(clientIp(req))) {
    return NextResponse.json(
      { error: "Demasiadas solicitudes" },
      { status: 429, headers: { "Retry-After": String(RATE_WINDOW_MS / 1000) } },
    );
  }

  // 1. Validate input.
  let slug: string;
  try {
    const body = await req.json().catch(() => null);
    ({ slug } = parseCheckoutRequest(body));
  } catch (err) {
    if (err instanceof CheckoutValidationError) {
      return NextResponse.json({ error: "Solicitud inválida" }, { status: 400 });
    }
    return NextResponse.json({ error: "Solicitud inválida" }, { status: 400 });
  }

  // 2. Authoritative product + price from the DB (never trust the client).
  try {
    const product = await getProductBySlug(slug);
    if (!product) {
      return NextResponse.json({ error: "Producto no encontrado" }, { status: 404 });
    }

    const siteUrl =
      process.env.NEXT_PUBLIC_SITE_URL || new URL(req.url).origin;
    const session = await getStripe().checkout.sessions.create(
      buildCheckoutParams(product, siteUrl),
    );

    if (!session.url) {
      return NextResponse.json({ error: "No se pudo iniciar el pago" }, { status: 502 });
    }
    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("[checkout] failed", err);
    return NextResponse.json({ error: "No se pudo iniciar el pago" }, { status: 500 });
  }
}
