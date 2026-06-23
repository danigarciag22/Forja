"use client";

import { useState } from "react";
import { Button, ComicPanel } from "@/components/ds";

/** Only follow an https Stripe portal URL. */
function isStripeUrl(url: unknown): url is string {
  if (typeof url !== "string") return false;
  try {
    const u = new URL(url);
    return u.protocol === "https:" && u.hostname.endsWith(".stripe.com");
  } catch {
    return false;
  }
}

export function AccountPanel({ email, hasSubscription }: { email: string; hasSubscription: boolean }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function openPortal() {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/portal", { method: "POST" });
      if (!res.ok) throw new Error(`portal ${res.status}`);
      const data = (await res.json()) as { url?: string };
      if (!isStripeUrl(data.url)) throw new Error("invalid url");
      window.location.href = data.url;
    } catch {
      setError("No se pudo abrir el portal.");
      setBusy(false);
    }
  }

  return (
    <ComicPanel weight="frame" padded caption="Mi cuenta">
      <p className="lp-account__email">{email}</p>

      {hasSubscription ? (
        <Button variant="primary" size="lg" full onClick={openPortal} disabled={busy}>
          {busy ? "Abriendo…" : "Gestionar suscripción"}
        </Button>
      ) : (
        <Button variant="primary" size="lg" full as="a" href="/precios">
          Ver planes premium
        </Button>
      )}

      <form action="/api/auth/signout" method="post" className="lp-account__signout">
        <Button variant="ghost" size="md" full type="submit">
          Cerrar sesión
        </Button>
      </form>

      {error ? <p className="lp-authcard__error" role="alert">{error}</p> : null}
    </ComicPanel>
  );
}
