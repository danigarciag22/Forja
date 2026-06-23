/**
 * Subscription plan registry — single source of truth for the pricing UI and
 * the subscription checkout. Stripe price IDs are NOT here; they live in
 * server-only env vars named below and are resolved at request time.
 *
 * Display names follow the comic design: Hierro (entrenamiento), Combustible
 * (nutrición), Combo Titán (ambas). Backend plan IDs stay fitness/nutricion/combo.
 * Display prices are placeholders — adjust freely without touching Stripe.
 */

export type PlanId = "fitness" | "nutricion" | "combo";
export type Interval = "monthly" | "yearly";

export type Plan = {
  id: PlanId;
  name: string;
  /** Small uppercase label under the name. */
  kicker: string;
  features: string[];
  highlight?: boolean;
  /** Display-only placeholder price per month (USD), by billing interval. */
  price: Record<Interval, string>;
  /** Billed-as sublabel by interval. */
  billed: Record<Interval, string>;
  /** Names of the server-only env vars holding the Stripe recurring price IDs. */
  priceEnv: Record<Interval, string>;
};

// ponytail: trial length is one constant shared by the UI and Stripe params.
// If it ever needs to vary per environment, lift to STRIPE_TRIAL_DAYS env.
export const TRIAL_DAYS = 7;

export const PLANS: Plan[] = [
  {
    id: "fitness",
    name: "Hierro",
    kicker: "App Entrenamiento",
    features: [
      "Biblioteca de hipertrofia completa",
      "Progresión y registro de cargas",
      "Protocolos ilimitados",
      "Sin anuncios",
    ],
    price: { monthly: "$9.99", yearly: "$7.99" },
    billed: { monthly: "facturado cada mes", yearly: "facturado $95.88/año" },
    priceEnv: {
      monthly: "STRIPE_PRICE_FITNESS_MONTHLY",
      yearly: "STRIPE_PRICE_FITNESS_YEARLY",
    },
  },
  {
    id: "combo",
    name: "Combo Titán",
    kicker: "Ambas Apps",
    highlight: true,
    features: [
      "HIERRO premium completo",
      "COMBUSTIBLE premium completo",
      "Sincronía entreno + nutrición",
      "Acceso al Culto",
    ],
    price: { monthly: "$14.99", yearly: "$11.99" },
    billed: { monthly: "facturado cada mes", yearly: "facturado $143.88/año" },
    priceEnv: {
      monthly: "STRIPE_PRICE_COMBO_MONTHLY",
      yearly: "STRIPE_PRICE_COMBO_YEARLY",
    },
  },
  {
    id: "nutricion",
    name: "Combustible",
    kicker: "App Nutrición",
    features: [
      "Planes de macros a medida",
      "Recetas tácticas ilimitadas",
      "Seguimiento diario",
      "Sin anuncios",
    ],
    price: { monthly: "$9.99", yearly: "$7.99" },
    billed: { monthly: "facturado cada mes", yearly: "facturado $95.88/año" },
    priceEnv: {
      monthly: "STRIPE_PRICE_NUTRICION_MONTHLY",
      yearly: "STRIPE_PRICE_NUTRICION_YEARLY",
    },
  },
];

/** Free tier — UI-only, no Stripe. CTA routes to account/register. */
export const FREE_PLAN = {
  name: "Free",
  kicker: "Freemium",
  price: "$0",
  billed: "gratis para siempre",
  features: [
    { label: "Rutinas y recetas básicas", off: false },
    { label: "1 protocolo activo", off: false },
    { label: "Biblioteca completa", off: true },
    { label: "Sin anuncios", off: true },
  ],
} as const;

export function getPlan(id: string): Plan | undefined {
  return PLANS.find((p) => p.id === id);
}

export function isInterval(value: unknown): value is Interval {
  return value === "monthly" || value === "yearly";
}
