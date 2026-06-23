import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { getSupabaseServer } from "@/lib/supabase/server";
import { getCustomerIdForUser } from "@/lib/subscriptions-repo";

export const runtime = "nodejs";

/** Opens a Stripe Billing Portal session so the user can manage/cancel. */
export async function POST(req: Request) {
  const supabase = await getSupabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  try {
    const customerId = await getCustomerIdForUser(user.id);
    if (!customerId) {
      return NextResponse.json({ error: "Sin suscripción" }, { status: 404 });
    }
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || new URL(req.url).origin;
    const session = await getStripe().billingPortal.sessions.create({
      customer: customerId,
      return_url: `${siteUrl}/cuenta`,
    });
    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("[portal] failed", err);
    return NextResponse.json(
      { error: "No se pudo abrir el portal" },
      { status: 500 },
    );
  }
}
