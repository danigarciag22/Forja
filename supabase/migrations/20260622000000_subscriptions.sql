-- Subscriptions entitlement table.
-- Web checkout (Stripe) writes here via the webhook (service role); the mobile
-- apps read a user's premium status with the user's JWT (RLS-scoped).

create table if not exists public.subscriptions (
  id                     uuid primary key default gen_random_uuid(),
  user_id                uuid not null references auth.users(id) on delete cascade,
  plan                   text not null check (plan in ('fitness', 'nutricion', 'combo')),
  interval               text check (interval in ('monthly', 'yearly')),
  status                 text not null,
  stripe_customer_id     text,
  stripe_subscription_id text unique,
  current_period_end     timestamptz,
  created_at             timestamptz not null default now(),
  updated_at             timestamptz not null default now()
);

create index if not exists subscriptions_user_id_idx on public.subscriptions (user_id);

alter table public.subscriptions enable row level security;

-- A user can read only their own subscriptions. Writes are service-role only
-- (the webhook), which bypasses RLS — so no insert/update/delete policy exists.
drop policy if exists "subscriptions_select_own" on public.subscriptions;
create policy "subscriptions_select_own"
  on public.subscriptions
  for select
  using (auth.uid() = user_id);
