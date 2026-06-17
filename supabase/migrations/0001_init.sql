-- FORJA — products + orders
-- Strict RLS: products are publicly readable (active only); orders are
-- writable only by the service role (the Stripe webhook). No anon access to orders.

create extension if not exists "pgcrypto";

-- ----------------------------------------------------------------------------
-- products
-- ----------------------------------------------------------------------------
create table if not exists public.products (
  id              uuid primary key default gen_random_uuid(),
  slug            text not null unique,
  title           text not null,
  price_cents     integer not null check (price_cents >= 0),
  currency        text not null default 'usd',
  stripe_price_id text,
  active          boolean not null default true,
  created_at      timestamptz not null default now()
);

-- ----------------------------------------------------------------------------
-- orders
-- ----------------------------------------------------------------------------
create table if not exists public.orders (
  id                     uuid primary key default gen_random_uuid(),
  product_id             uuid references public.products(id),
  email                  text not null,
  stripe_session_id      text not null unique,
  stripe_payment_intent  text,
  amount_cents           integer not null check (amount_cents >= 0),
  currency               text not null default 'usd',
  status                 text not null default 'paid',
  created_at             timestamptz not null default now()
);

create index if not exists orders_product_id_idx on public.orders (product_id);
create index if not exists orders_email_idx on public.orders (email);

-- ----------------------------------------------------------------------------
-- Row Level Security
-- ----------------------------------------------------------------------------
alter table public.products enable row level security;
alter table public.orders   enable row level security;

-- products: anyone may read ACTIVE rows; no public writes.
drop policy if exists "products_public_read_active" on public.products;
create policy "products_public_read_active" on public.products
  for select to anon, authenticated
  using (active = true);

-- orders: no policies for anon/authenticated => fully denied. The service
-- role bypasses RLS, so only the server (webhook) can read/write orders.
revoke all on public.orders from anon, authenticated;

-- ----------------------------------------------------------------------------
-- Seed catalog (idempotent). Featured 'volumen-limpio' priced at the PDP funnel.
-- ----------------------------------------------------------------------------
insert into public.products (slug, title, price_cents, currency) values
  ('hierro',         'Protocolo Hipertrofia: 6 Días de Hierro',                       1900, 'usd'),
  ('volumen-limpio', 'Protocolo: Volumen Limpio y Construcción Sólida',               4900, 'usd'),
  ('lookmaxxing',    'Lookmaxxing: Evolución y Postura',                              1700, 'usd'),
  ('combustible',    'Combustible Diario: Shots de Jengibre, Cúrcuma y Recuperación', 1500, 'usd'),
  ('boxeo',          'Acondicionamiento Físico y Boxeo de Combate',                   2100, 'usd'),
  ('macros',         'Recetario de Macros y Sobrecarga Progresiva',                   1500, 'usd')
on conflict (slug) do nothing;
