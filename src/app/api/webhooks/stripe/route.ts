import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import { orderFromSession } from "@/lib/orders-map";
import { getProductIdBySlug, insertOrderIdempotent } from "@/lib/orders-repo";
import { sendOrderConfirmation } from "@/lib/email";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) {
    console.error("[webhook] STRIPE_WEBHOOK_SECRET not configured");
    return NextResponse.json({ error: "not configured" }, { status: 500 });
  }

  const signature = req.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "missing signature" }, { status: 400 });
  }

  // Raw body is required for signature verification.
  const raw = await req.text();
  let event: Stripe.Event;
  try {
    event = await getStripe().webhooks.constructEventAsync(raw, signature, secret);
  } catch (err) {
    console.error("[webhook] signature verification failed", err);
    return NextResponse.json({ error: "invalid signature" }, { status: 400 });
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      if (session.payment_status === "paid") {
        const slug = session.metadata?.slug ?? null;
        const productId = slug ? await getProductIdBySlug(slug) : null;
        const order = orderFromSession(session, productId);
        const { inserted } = await insertOrderIdempotent(order);

        // Send the confirmation only on the first (non-duplicate) insert.
        if (inserted) {
          await sendOrderConfirmation({
            email: order.email,
            slug,
            amountCents: order.amount_cents,
            currency: order.currency ?? "usd",
          }).catch((err) => console.error("[webhook] email send failed", err));
        }
      }
    }
    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("[webhook] handler error", err);
    return NextResponse.json({ error: "handler error" }, { status: 500 });
  }
}
