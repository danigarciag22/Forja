"use client";

import { useState } from "react";
import { getPlan, FREE_PLAN, type Interval, type Plan } from "@/lib/plans";

/** Only follow an https Stripe checkout URL (poisoned-response guard). */
function isStripeUrl(url: unknown): url is string {
  if (typeof url !== "string") return false;
  try {
    const u = new URL(url);
    return u.protocol === "https:" && u.hostname.endsWith(".stripe.com");
  } catch {
    return false;
  }
}

export function PricingPlans() {
  const [interval, setInterval] = useState<Interval>("yearly");
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // ---- PRESERVED BACKEND LOGIC (unchanged): subscribe → /api/subscribe → Stripe.
  async function subscribe(planId: string) {
    setPendingId(planId);
    setError(null);
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ plan: planId, interval }),
      });
      if (res.status === 401) {
        window.location.href = "/cuenta?next=/precios";
        return;
      }
      if (!res.ok) throw new Error(`subscribe ${res.status}`);
      const data = (await res.json()) as { url?: string };
      if (!isStripeUrl(data.url)) throw new Error("invalid url");
      window.location.href = data.url;
    } catch {
      setError("No se pudo iniciar el pago. Inténtalo de nuevo.");
      setPendingId(null);
    }
  }

  // Free tier is UI-only: no Stripe, just route to account/register.
  function chooseFree() {
    window.location.href = "/cuenta?next=/precios";
  }

  const hierro = getPlan("fitness")!;
  const combo = getPlan("combo")!;
  const combustible = getPlan("nutricion")!;
  const annual = interval === "yearly";

  return (
    <div className="lp-plans">
      <div className="lp-plans__head">
        <span className="lp-chip">Cap. 05 — Membresías</span>
        <h1 className="lp-plans__title">Elige tu Arsenal</h1>
        <p className="lp-plans__sub">
          7 días de premium gratis. Sin tarjeta hoy si eliges Free.
        </p>
        <div className="lp-toggle" role="group" aria-label="Periodo de facturación">
          <button
            type="button"
            className={`lp-toggle__seg${!annual ? " is-active" : ""}`}
            aria-pressed={!annual}
            onClick={() => setInterval("monthly")}
          >
            Mensual
          </button>
          <button
            type="button"
            className={`lp-toggle__seg${annual ? " is-active" : ""}`}
            aria-pressed={annual}
            onClick={() => setInterval("yearly")}
          >
            Anual <span className="lp-toggle__save">-20%</span>
          </button>
        </div>
      </div>

      <div className="lp-plans__grid">
        {/* FREE — UI-only */}
        <article className="lp-plan">
          <div className="lp-plan__head">
            <div className="lp-plan__name">{FREE_PLAN.name}</div>
            <div className="lp-plan__kicker">{FREE_PLAN.kicker}</div>
            <div className="lp-plan__price">{FREE_PLAN.price}</div>
            <div className="lp-plan__billed">{FREE_PLAN.billed}</div>
          </div>
          <ul className="lp-plan__features">
            {FREE_PLAN.features.map((f) => (
              <li key={f.label} className={f.off ? "is-off" : ""}>
                <b aria-hidden="true">{f.off ? "✕" : "✓"}</b> {f.label}
              </li>
            ))}
          </ul>
          <div className="lp-plan__foot">
            <button type="button" className="lp-plan__btn lp-plan__btn--outline" onClick={chooseFree}>
              Empezar gratis
            </button>
          </div>
        </article>

        <PlanCard plan={hierro} interval={interval} pending={pendingId === hierro.id} onChoose={subscribe} />
        <PlanCard plan={combo} interval={interval} pending={pendingId === combo.id} onChoose={subscribe} />
        <PlanCard plan={combustible} interval={interval} pending={pendingId === combustible.id} onChoose={subscribe} />
      </div>

      {error ? (
        <p className="lp-plans__error" role="alert">
          {error}
        </p>
      ) : null}

      <p className="lp-plans__foot">
        Pago seguro vía Stripe · 7 días gratis · Cancela cuando quieras · Sin permanencia
      </p>
    </div>
  );
}

function PlanCard({
  plan,
  interval,
  pending,
  onChoose,
}: {
  plan: Plan;
  interval: Interval;
  pending: boolean;
  onChoose: (id: string) => void;
}) {
  const featured = Boolean(plan.highlight);
  return (
    <article className={`lp-plan${featured ? " lp-plan--featured" : ""}`}>
      {featured ? <div className="lp-plan__ribbon">Mejor valor</div> : null}
      <div className="lp-plan__head">
        <div className="lp-plan__name">{plan.name}</div>
        <div className="lp-plan__kicker">{plan.kicker}</div>
        <div className="lp-plan__price">
          {plan.price[interval]}
          <span className="lp-plan__per">/mes</span>
        </div>
        <div className="lp-plan__billed">{plan.billed[interval]}</div>
      </div>
      <ul className="lp-plan__features">
        {plan.features.map((f) => (
          <li key={f}>
            <b aria-hidden="true">✓</b> {f}
          </li>
        ))}
      </ul>
      <div className="lp-plan__foot">
        <button
          type="button"
          className="lp-plan__btn"
          disabled={pending}
          onClick={() => onChoose(plan.id)}
        >
          {pending ? "Procesando…" : "Probar 7 días"}
        </button>
      </div>
    </article>
  );
}
