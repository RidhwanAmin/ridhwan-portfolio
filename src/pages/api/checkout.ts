/**
 * /api/checkout — Agent D owns this file. Task D3.
 *
 * Creates a Stripe Checkout Session for one-time payments.
 *
 * D2 — Stripe product setup note:
 *   Before going live, create the following products in the Stripe dashboard:
 *     1. "Consulting Call" — $150 USD one-time price → copy Price ID → set as data-price-id in services page
 *     2. "Advisory Retainer" — $500 USD one-time price → copy Price ID → set as data-price-id in services page
 *   The values "price_consulting_call" and "price_advisory_retainer" in services/index.astro are
 *   PLACEHOLDER IDs used for UI development only. Replace them with the real Stripe Price IDs (e.g.
 *   "price_1Abc123...") once products are created in the Stripe dashboard.
 *
 *   Required env vars (set in Vercel dashboard + local .env):
 *     STRIPE_SECRET_KEY=sk_live_...       (server-side only)
 *     STRIPE_PUBLISHABLE_KEY=pk_live_...  (can be exposed client-side)
 *     STRIPE_SIGNING_SECRET=whsec_...     (webhook secret — see /api/webhooks/stripe.ts)
 *
 * Cross-agent contract:
 *   - GET → 405 (enforced by Agent E smoke tests)
 *   - POST → { priceId: string } → { url: string } | { error: string }
 *   - success_url: /checkout/return?session_id={CHECKOUT_SESSION_ID}
 *   - cancel_url: /services
 */

import type { APIRoute } from "astro";
import Stripe from "stripe";

export const prerender = false;

const STRIPE_SECRET_KEY = import.meta.env.STRIPE_SECRET_KEY as string;
const SITE_URL =
  (import.meta.env.SITE_URL as string | undefined) ?? "https://ridhwan.dev";

function methodNotAllowed(): Response {
  return new Response(JSON.stringify({ error: "Method Not Allowed" }), {
    status: 405,
    headers: {
      "Content-Type": "application/json",
      Allow: "POST",
    },
  });
}

export const GET: APIRoute = () => methodNotAllowed();
export const PUT: APIRoute = () => methodNotAllowed();
export const PATCH: APIRoute = () => methodNotAllowed();
export const DELETE: APIRoute = () => methodNotAllowed();

export const POST: APIRoute = async ({ request }) => {
  // Guard: STRIPE_SECRET_KEY must be set
  if (!STRIPE_SECRET_KEY) {
    // eslint-disable-next-line no-console
    console.error("[checkout] STRIPE_SECRET_KEY is not set");
    return new Response(
      JSON.stringify({ error: "Payment service is not configured." }),
      { status: 503, headers: { "Content-Type": "application/json" } }
    );
  }

  // Parse request body
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON body." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { priceId } = body as Record<string, unknown>;

  if (!priceId || typeof priceId !== "string" || !priceId.trim()) {
    return new Response(
      JSON.stringify({ error: "Missing or invalid priceId." }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const stripe = new Stripe(STRIPE_SECRET_KEY, {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    apiVersion: "2025-03-31.basil" as any,
  });

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [{ price: priceId.trim(), quantity: 1 }],
      success_url: `${SITE_URL}/checkout/return?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${SITE_URL}/services`,
      allow_promotion_codes: true,
      billing_address_collection: "auto",
      // D10: Accept both MYR (Malaysian Ringgit) and USD.
      // Stripe uses the currency defined on the Price object when currency_options
      // is not set. Listing MYR here enables currency conversion via Stripe's
      // Adaptive Pricing — customers in Malaysia see prices in MYR.
      currency: "myr",
    });

    if (!session.url) {
      throw new Error("Stripe did not return a checkout URL.");
    }

    return new Response(JSON.stringify({ url: session.url }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    const message =
      err instanceof Stripe.errors.StripeError
        ? err.message
        : "Failed to create checkout session.";
    const status =
      err instanceof Stripe.errors.StripeInvalidRequestError ? 400 : 500;

    // eslint-disable-next-line no-console
    console.error("[checkout] Stripe error:", err);
    return new Response(JSON.stringify({ error: message }), {
      status,
      headers: { "Content-Type": "application/json" },
    });
  }
};
