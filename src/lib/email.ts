import "server-only";
import { Resend } from "resend";
import { CAROUSEL_BOOKS, FEATURED_PRODUCT } from "./products";

export type OrderEmail = {
  email: string;
  slug: string | null;
  amountCents: number;
  currency: string;
};

function titleForSlug(slug: string | null): string {
  if (!slug) return "tu e-book del Arsenal";
  if (slug === FEATURED_PRODUCT.slug) return FEATURED_PRODUCT.title;
  return CAROUSEL_BOOKS.find((b) => b.slug === slug)?.title ?? "tu e-book del Arsenal";
}

function formatAmount(cents: number, currency: string): string {
  return new Intl.NumberFormat("es", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(cents / 100);
}

function buildHtml(title: string, amount: string): string {
  return `<!doctype html><html lang="es"><body style="margin:0;background:#fff;color:#000;font-family:'Space Grotesk',Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;margin:0 auto;border:6px solid #000;">
    <tr><td style="background:#000;color:#fff;padding:16px 22px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;font-size:12px;">FORJA · Archivo de Reclutamiento</td></tr>
    <tr><td style="padding:28px 30px;">
      <div style="display:inline-block;border:3px solid #000;padding:6px 14px;font-weight:700;text-transform:uppercase;letter-spacing:.14em;font-size:12px;transform:rotate(-3deg);">Acceso concedido</div>
      <h1 style="font-family:Anton,Arial,sans-serif;text-transform:uppercase;font-size:40px;line-height:.95;margin:18px 0 8px;">Pago Confirmado</h1>
      <p style="font-size:15px;line-height:1.5;margin:0 0 18px;">Bienvenido al Arsenal, recluta. Tu orden está registrada y tu acceso a <b>${title}</b> está activo.</p>
      <table role="presentation" cellpadding="0" cellspacing="0" style="border:3px solid #000;width:100%;">
        <tr><td style="background:#000;color:#fff;padding:8px 14px;font-weight:700;text-transform:uppercase;letter-spacing:.12em;font-size:11px;">Producto</td><td style="padding:8px 14px;font-size:14px;">${title}</td></tr>
        <tr><td style="background:#000;color:#fff;padding:8px 14px;font-weight:700;text-transform:uppercase;letter-spacing:.12em;font-size:11px;">Total</td><td style="padding:8px 14px;font-family:Anton,Arial,sans-serif;font-size:20px;">${amount}</td></tr>
      </table>
      <p style="font-size:13px;line-height:1.5;margin:20px 0 0;opacity:.7;">Si tienes dudas, transmite a soporte@forja.gym. Forja tu físico, domina el sistema.</p>
    </td></tr>
    <tr><td style="background:#000;color:#fff;padding:14px 22px;font-family:Bangers,Arial,sans-serif;letter-spacing:.06em;font-size:20px;">FORJA</td></tr>
  </table></body></html>`;
}

/**
 * Send the post-purchase confirmation email via Resend. Called by the webhook
 * after the order is persisted. Never throws on missing config (the order is
 * already saved) but surfaces real send errors for logging + alerting.
 */
export async function sendOrderConfirmation(order: OrderEmail): Promise<void> {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  if (!key || !from) {
    console.error("[email] Resend not configured (RESEND_API_KEY / RESEND_FROM_EMAIL)");
    return;
  }
  const resend = new Resend(key);
  const title = titleForSlug(order.slug);
  const amount = formatAmount(order.amountCents, order.currency);
  const { error } = await resend.emails.send({
    from,
    to: order.email,
    subject: "FORJA · Acceso concedido al Arsenal",
    html: buildHtml(title, amount),
  });
  if (error) {
    throw new Error(`Resend send failed: ${error.message}`);
  }
}
