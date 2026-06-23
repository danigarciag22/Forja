import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import {
  parseCheckoutRequest,
  buildCheckoutParams,
  CheckoutValidationError,
} from "@/lib/checkout";
import { getProductBySlug } from "@/lib/orders-repo";
import { isRateLimited, clientIp, RATE_RETRY_AFTER } from "@/lib/rate-limit";

export const runtime = "nodejs";

export async function POST(req: Request) {
  // 0. Rate limit (unauthenticated public endpoint).
  if (isRateLimited(`checkout:${clientIp(req)}`)) {
    return NextResponse.json(
      { error: "Demasiadas solicitudes" },
      { status: 429, headers: { "Retry-After": String(RATE_RETRY_AFTER) } },
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
