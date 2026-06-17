import { test } from "node:test";
import assert from "node:assert/strict";
import type Stripe from "stripe";
import { orderFromSession } from "./orders-map.ts";

function session(overrides: Record<string, unknown>): Stripe.Checkout.Session {
  return {
    id: "cs_test_123",
    customer_details: { email: "recluta@forja.gym" },
    customer_email: null,
    payment_intent: "pi_test_123",
    amount_total: 4900,
    currency: "usd",
    ...overrides,
  } as unknown as Stripe.Checkout.Session;
}

test("orderFromSession maps a paid session to an orders row", () => {
  const order = orderFromSession(session({}), "prod-uuid");
  assert.equal(order.product_id, "prod-uuid");
  assert.equal(order.email, "recluta@forja.gym");
  assert.equal(order.stripe_session_id, "cs_test_123");
  assert.equal(order.stripe_payment_intent, "pi_test_123");
  assert.equal(order.amount_cents, 4900);
  assert.equal(order.currency, "usd");
  assert.equal(order.status, "paid");
});

test("orderFromSession falls back to customer_email", () => {
  const order = orderFromSession(
    session({ customer_details: null, customer_email: "fallback@forja.gym" }),
    null,
  );
  assert.equal(order.email, "fallback@forja.gym");
  assert.equal(order.product_id, null);
});

test("orderFromSession reads payment_intent when expanded to an object", () => {
  const order = orderFromSession(session({ payment_intent: { id: "pi_obj_999" } }), null);
  assert.equal(order.stripe_payment_intent, "pi_obj_999");
});

test("orderFromSession defaults amount/currency when absent", () => {
  const order = orderFromSession(
    session({ amount_total: null, currency: null }),
    null,
  );
  assert.equal(order.amount_cents, 0);
  assert.equal(order.currency, "usd");
});

test("orderFromSession throws when the session has no email", () => {
  assert.throws(
    () => orderFromSession(session({ customer_details: null, customer_email: null }), null),
    /no email/,
  );
});
