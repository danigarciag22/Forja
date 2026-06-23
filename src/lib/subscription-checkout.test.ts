import { test } from "node:test";
import assert from "node:assert/strict";
import { buildSubscriptionParams } from "./subscription-checkout.ts";
import { TRIAL_DAYS, getPlan, isInterval } from "./plans.ts";

test("buildSubscriptionParams sets subscription mode, price and trial", () => {
  const params = buildSubscriptionParams({
    priceId: "price_123",
    plan: "combo",
    interval: "yearly",
    userId: "user-abc",
    customerEmail: "r@forja.gym",
    siteUrl: "https://forja.gym",
  });
  assert.equal(params.mode, "subscription");
  assert.equal(params.line_items?.[0]?.price, "price_123");
  assert.equal(params.line_items?.[0]?.quantity, 1);
  assert.equal(params.subscription_data?.trial_period_days, TRIAL_DAYS);
  assert.equal(params.client_reference_id, "user-abc");
  assert.equal(params.customer_email, "r@forja.gym");
});

test("buildSubscriptionParams stamps user_id/plan/interval on session and subscription", () => {
  const params = buildSubscriptionParams({
    priceId: "price_x",
    plan: "fitness",
    interval: "monthly",
    userId: "u1",
    siteUrl: "https://forja.gym/",
  });
  for (const md of [params.metadata, params.subscription_data?.metadata]) {
    assert.equal(md?.user_id, "u1");
    assert.equal(md?.plan, "fitness");
    assert.equal(md?.interval, "monthly");
  }
});

test("buildSubscriptionParams strips trailing slash in URLs", () => {
  const params = buildSubscriptionParams({
    priceId: "p",
    plan: "nutricion",
    interval: "monthly",
    userId: "u",
    siteUrl: "https://forja.gym/",
  });
  assert.equal(
    params.success_url,
    "https://forja.gym/compra/exito?session_id={CHECKOUT_SESSION_ID}",
  );
  assert.equal(params.cancel_url, "https://forja.gym/precios");
});

test("plan registry resolves each plan + interval to a price env name", () => {
  for (const id of ["fitness", "nutricion", "combo"] as const) {
    const plan = getPlan(id);
    assert.ok(plan, `plan ${id} exists`);
    assert.match(plan.priceEnv.monthly, /^STRIPE_PRICE_/);
    assert.match(plan.priceEnv.yearly, /^STRIPE_PRICE_/);
  }
  assert.equal(getPlan("nope"), undefined);
});

test("isInterval narrows only valid intervals", () => {
  assert.ok(isInterval("monthly"));
  assert.ok(isInterval("yearly"));
  assert.ok(!isInterval("weekly"));
  assert.ok(!isInterval(undefined));
});
