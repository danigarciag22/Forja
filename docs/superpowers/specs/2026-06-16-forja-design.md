# FORJA — Comic-Fitness Landing + Buy Flow — Design Spec

_Date: 2026-06-16 · Source design: Claude Design kit `forja-comic-fitness-design-system` (ui_kits/landing)_

## Goal
Port the FORJA landing (strict B&W comic/manga fitness brand selling tactical e-books)
to a production-ready Next.js full-stack app, pixel-faithful at 375px and 1440px, plus a
real test-mode buy flow: button → Stripe Checkout → webhook → Supabase order → Resend email.

## Stack
- Next.js (App Router) + TypeScript + Tailwind CSS v4
- Supabase (Postgres) — products + orders, RLS on
- Stripe Checkout + webhooks (TEST mode)
- Resend — transactional confirmation email
- Deploy: Vercel. VCS: GitHub. (both behind STOP-gates)

## Porting strategy (faithful + fast)
The design's value is ~30KB bespoke comic CSS: halftone screentone, zero-blur offset
shadows, clip-path price bursts, infinite scroll carousel, `filter: invert(1)` yin-yang
dark mode. Re-expressing as Tailwind utilities would be slow and lossy.

- Bring authored CSS over verbatim into `app/globals.css` via @import chain:
  `tokens/colors.css, typography.css, spacing.css, effects.css` + `base.css` +
  extracted component CSS + `landing.css`. No token changes.
- DS primitives become real `.tsx` (Button, SpeechBubble, ComicPanel, Badge, Input,
  PlayButton, ChapterTitle, CultModal) reusing the exact class names; the per-component
  CSS currently injected via JS `<style>` moves into real stylesheets.
- Tailwind used only for app-shell/layout utility, not for the comic system.
- Fonts: Google (Anton, Bangers, Space Grotesk, Space Mono) via `next/font` (or link).
- Assets copied to `public/`: `titan-hero.png`, `titan-cover.png`, `titan-video.png`,
  `lp-img-mono` filter preserved; dark-mode counter-invert preserved.

## Surfaces → real Next routes (replace the kit's hash routing)
| Route | Component | Notes |
|---|---|---|
| `/` | LandingPage | Navbar · Hero · Products (carousel) · ContentLoop · Footer · ModeToggle · CultModal |
| `/producto/[slug]` | ProductPage | buy-box; featured `volumen-limpio` renders exact design copy ($120→$49). Other slugs reuse template with their own title/price |
| `/terminos`, `/privacidad`, `/reembolsos` | LegalPage | "Archivo Táctico" dossiers |

- Dark mode: client wrapper toggling `lp-invert`/`is-dark`, persisted to `localStorage` (`forja-mode`). Lives above the routed content; toggle button outside the inverted layer.
- Client components: ModeToggle, Products carousel (scroll-loop effect), CultModal, the PDP variant/thumb state, checkout buttons. Everything else Server Components.
- "Adquirir" (carousel) → `/producto/[slug]`. PDP CTA → checkout.

## Data model (Supabase, RLS enabled)
**products**
- `id` uuid pk, `slug` text unique, `title` text, `price_cents` int, `currency` text default 'usd',
  `stripe_price_id` text null, `active` bool default true, `created_at` timestamptz default now()
- Seed: 6 carousel books (Hierro $19, Volumen Limpio $49 featured, Lookmaxxing $17,
  Combustible $15, Boxeo $21, Macros $15) — `volumen-limpio` price set to featured $49 to
  match PDP funnel. RLS: public SELECT of `active=true` only.

**orders**
- `id` uuid pk, `product_id` uuid fk→products, `email` text, `stripe_session_id` text unique,
  `stripe_payment_intent` text, `amount_cents` int, `currency` text, `status` text default 'paid',
  `created_at` timestamptz default now()
- RLS: NO anon select/insert/update. Writes only via service-role (webhook). Idempotent on `stripe_session_id`.

Generate TS types from schema (`generate_typescript_types`) → `lib/database.types.ts`.

## Buy flow (TDD: checkout + webhook)
1. Client checkout button → `POST /api/checkout` `{ slug }`.
2. Server: look up product in Supabase, build Stripe Checkout Session with price derived
   from DB (never client), `mode=payment`, success/cancel URLs. Return session URL → redirect.
3. Stripe → `POST /api/webhooks/stripe`: verify signature with `STRIPE_WEBHOOK_SECRET`
   (raw body). On `checkout.session.completed`: upsert `orders` (service-role, idempotent on
   session id), then send Resend confirmation email. Return 200 fast; tolerate retries.
4. Routes: `/compra/exito` (success), `/compra/cancelada` (cancel) — comic-styled.

Validation: zod on `/api/checkout` body. Errors handled explicitly, no secret leakage.

## Secrets — `.env.example` (names only, no values)
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
RESEND_API_KEY=
RESEND_FROM_EMAIL=
NEXT_PUBLIC_SITE_URL=
```

## Out of scope (per brief — do NOT build)
auth, dashboards, i18n, dark-mode beyond the yin-yang toggle, newsletter backend,
CultModal email capture backend (stays visual: shows code CULTO10). Animations only on
transform/opacity. Images carry explicit width/height. Files < 800 lines, organized by feature.

## STOP-gates (confirm before)
Create Supabase project · apply migrations / touch existing schema · create/delete GitHub
repo / force push · create Vercel project / deploy · add any non-stack dependency · Stripe
live mode or real charges. Local scaffold/port/build need none of these.

## Done when
- Landing matches design at 375 + 1440.
- Test purchase end-to-end: Stripe test → orders row → Resend email.
- GitHub repo with clean history + Vercel deploy reachable.
- context7 consulted for each library before use.

## Phases
1. Spec ✓ → 2. Scaffold Next+Tailwind → 3. Port design (pixel-check 375/1440) →
4. Supabase schema + types → 5. Stripe checkout + webhook (TDD) → 6. Resend →
7. GitHub commits (atomic per phase) → 8. Vercel deploy.
