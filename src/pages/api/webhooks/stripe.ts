/**
 * /api/webhooks/stripe — Agent D owns this file. Task D5.
 *
 * Handles Stripe webhook events. Verifies signature with STRIPE_SIGNING_SECRET.
 *
 * Events handled:
 *   - checkout.session.completed → sends confirmation email via Resend (D6)
 *   - payment_intent.succeeded   → logged only (can duplicate checkout events)
 *
 * Cross-agent contract:
 *   - GET → 405 (enforced by Agent E smoke tests)
 *   - POST → processes webhook, returns { received: true } or error response
 *   - Raw body must not be parsed before stripe.webhooks.constructEvent()
 */

import type { APIRoute } from "astro";
import Stripe from "stripe";
import { sendConfirmationEmail } from "@/utils/sendConfirmationEmail";

export const prerender = false;

const STRIPE_SECRET_KEY = import.meta.env.STRIPE_SECRET_KEY as string;
const STRIPE_SIGNING_SECRET = import.meta.env.STRIPE_SIGNING_SECRET as string;

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
  if (!STRIPE_SECRET_KEY || !STRIPE_SIGNING_SECRET) {
    // eslint-disable-next-line no-console
    console.error("[stripe-webhook] Missing Stripe env vars");
    return new Response(
      JSON.stringify({ error: "Webhook service not configured." }),
      { status: 503, headers: { "Content-Type": "application/json" } }
    );
  }

  const stripe = new Stripe(STRIPE_SECRET_KEY, {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    apiVersion: "2025-03-31.basil" as any,
  });

  // Read raw body text — MUST happen before any JSON.parse
  let rawBody: string;
  try {
    rawBody = await request.text();
  } catch {
    return new Response(
      JSON.stringify({ error: "Could not read request body." }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  const sig = request.headers.get("stripe-signature");
  if (!sig) {
    return new Response(
      JSON.stringify({ error: "Missing stripe-signature header." }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, STRIPE_SIGNING_SECRET);
  } catch (err) {
    const message =
      err instanceof Error
        ? err.message
        : "Webhook signature verification failed.";
    // eslint-disable-next-line no-console
    console.error("[stripe-webhook] Signature error:", message);
    return new Response(JSON.stringify({ error: message }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        // eslint-disable-next-line no-console
        console.log("[stripe-webhook] checkout.session.completed:", session.id);
        await sendConfirmationEmail(session);
        break;
      }

      case "payment_intent.succeeded": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        // eslint-disable-next-line no-console
        console.log(
          "[stripe-webhook] payment_intent.succeeded:",
          paymentIntent.id
        );
        // No email — PI succeeded events can duplicate checkout.session.completed
        break;
      }

      default:
        // eslint-disable-next-line no-console
        console.log(`[stripe-webhook] Unhandled event type: ${event.type}`);
    }

    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("[stripe-webhook] Handler error:", err);
    return new Response(
      JSON.stringify({ error: "Internal server error processing event." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
