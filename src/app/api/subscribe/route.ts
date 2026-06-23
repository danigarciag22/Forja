import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { getSupabaseServer } from "@/lib/supabase/server";
import { getPlan, isInterval } from "@/lib/plans";
import { buildSubscriptionParams } from "@/lib/subscription-checkout";
import { isRateLimited, clientIp, RATE_RETRY_AFTER } from "@/lib/rate-limit";

export const runtime = "nodejs";

export async function POST(req: Request) {
  // 1. Rate limit per IP.
  if (isRateLimited(`subscribe:${clientIp(req)}`)) {
    return NextResponse.json(
      { error: "Demasiadas solicitudes" },
      { status: 429, headers: { "Retry-After": String(RATE_RETRY_AFTER) } },
    );
  }

  // 2. Auth required — account before checkout.
  const supabase = await getSupabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  // 3. Validate plan + interval.
  const body = (await req.json().catch(() => null)) as {
    plan?: string;
    interval?: string;
  } | null;
  const plan = body?.plan ? getPlan(body.plan) : undefined;
  if (!plan || !isInterval(body?.interval)) {
    return NextResponse.json({ error: "Plan inválido" }, { status: 400 });
  }
  const interval = body.interval;

  // 4. Resolve the Stripe price id from server env (fail fast if unset).
  const priceId = process.env[plan.priceEnv[interval]];
  if (!priceId) {
    console.error(`[subscribe] missing price env ${plan.priceEnv[interval]}`);
    return NextResponse.json({ error: "Plan no disponible" }, { status: 503 });
  }

  // 5. Create the subscription checkout session.
  try {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || new URL(req.url).origin;
    const session = await getStripe().checkout.sessions.create(
      buildSubscriptionParams({
        priceId,
        plan: plan.id,
        interval,
        userId: user.id,
        customerEmail: user.email ?? undefined,
        siteUrl,
      }),
    );
    if (!session.url) {
      return NextResponse.json(
        { error: "No se pudo iniciar el pago" },
        { status: 502 },
      );
    }
    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("[subscribe] failed", err);
    return NextResponse.json(
      { error: "No se pudo iniciar el pago" },
      { status: 500 },
    );
  }
}
