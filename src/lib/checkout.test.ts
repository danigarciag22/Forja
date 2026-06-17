import { test } from "node:test";
import assert from "node:assert/strict";
import {
  parseCheckoutRequest,
  buildCheckoutParams,
  CheckoutValidationError,
  type CheckoutProduct,
} from "./checkout.ts";

test("parseCheckoutRequest accepts a valid slug and trims it", () => {
  assert.deepEqual(parseCheckoutRequest({ slug: "  volumen-limpio " }), {
    slug: "volumen-limpio",
  });
});

test("parseCheckoutRequest rejects missing/empty/non-string slug", () => {
  for (const bad of [null, undefined, {}, { slug: "" }, { slug: "   " }, { slug: 5 }]) {
    assert.throws(() => parseCheckoutRequest(bad), CheckoutValidationError);
  }
});

test("parseCheckoutRequest rejects an over-long slug", () => {
  assert.throws(
    () => parseCheckoutRequest({ slug: "x".repeat(81) }),
    CheckoutValidationError,
  );
});

const product: CheckoutProduct = {
  slug: "volumen-limpio",
  title: "Protocolo: Volumen Limpio",
  price_cents: 4900,
  currency: "usd",
};

test("buildCheckoutParams uses the DB price and product metadata", () => {
  const params = buildCheckoutParams(product, "https://forja.gym");
  assert.equal(params.mode, "payment");
  const item = params.line_items?.[0];
  assert.equal(item?.quantity, 1);
  assert.equal(item?.price_data?.unit_amount, 4900);
  assert.equal(item?.price_data?.currency, "usd");
  assert.equal(item?.price_data?.product_data?.name, "Protocolo: Volumen Limpio");
  assert.equal(params.metadata?.slug, "volumen-limpio");
});

test("buildCheckoutParams strips trailing slash and embeds the session template", () => {
  const params = buildCheckoutParams(product, "https://forja.gym/");
  assert.equal(
    params.success_url,
    "https://forja.gym/compra/exito?session_id={CHECKOUT_SESSION_ID}",
  );
  assert.equal(params.cancel_url, "https://forja.gym/compra/cancelada");
});
