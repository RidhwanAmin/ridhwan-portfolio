/**
 * /api/contact — Agent B owns this file. Task B7.
 *
 * Accepts POST {name, email, message} from ContactSection.astro
 * and sends a transactional email via the Resend API.
 *
 * Cross-agent contract (CLAUDE.md):
 *   - Request body: { name: string, email: string, message: string }
 *   - Response:     { success: boolean, error?: string }
 *   - GET requests must return HTTP 405 (required by Agent E smoke tests)
 *
 * Runs as a Vercel serverless function (hybrid mode — B6).
 */
export const prerender = false;

import type { APIRoute } from "astro";

/** Resend API endpoint for sending emails */
const RESEND_ENDPOINT = "https://api.resend.com/emails";

/** Basic email address validator — good enough for server-side pre-check */
function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/** Return 405 Method Not Allowed for any non-POST verb */
export const GET: APIRoute = () => {
  return new Response(JSON.stringify({ error: "Method Not Allowed" }), {
    status: 405,
    headers: {
      "Content-Type": "application/json",
      Allow: "POST",
    },
  });
};

export const PUT: APIRoute = () => {
  return new Response(JSON.stringify({ error: "Method Not Allowed" }), {
    status: 405,
    headers: {
      "Content-Type": "application/json",
      Allow: "POST",
    },
  });
};

export const DELETE: APIRoute = () => {
  return new Response(JSON.stringify({ error: "Method Not Allowed" }), {
    status: 405,
    headers: {
      "Content-Type": "application/json",
      Allow: "POST",
    },
  });
};

export const PATCH: APIRoute = () => {
  return new Response(JSON.stringify({ error: "Method Not Allowed" }), {
    status: 405,
    headers: {
      "Content-Type": "application/json",
      Allow: "POST",
    },
  });
};

export const POST: APIRoute = async ({ request }) => {
  // ── 1. Parse body ────────────────────────────────────────────────────────
  let name: string;
  let email: string;
  let message: string;

  try {
    const body = await request.json();
    name = String(body?.name ?? "").trim();
    email = String(body?.email ?? "").trim();
    message = String(body?.message ?? "").trim();
  } catch {
    return new Response(
      JSON.stringify({ success: false, error: "Invalid JSON body." }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  // ── 2. Validate inputs ───────────────────────────────────────────────────
  if (!name || !email || !message) {
    return new Response(
      JSON.stringify({
        success: false,
        error: "All fields (name, email, message) are required.",
      }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  if (!isValidEmail(email)) {
    return new Response(
      JSON.stringify({ success: false, error: "Invalid email address." }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  // ── 3. Send via Resend ───────────────────────────────────────────────────
  const apiKey = import.meta.env.RESEND_API_KEY;

  if (!apiKey) {
    // Fail gracefully in local dev if key is not set
    // eslint-disable-next-line no-console
    console.warn("[api/contact] RESEND_API_KEY not set — email not sent.");
    return new Response(
      JSON.stringify({
        success: false,
        error: "Email service is not configured.",
      }),
      { status: 503, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    const res = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "ridhwan.dev contact form <contact@ridhwan.dev>",
        to: ["ridhwan@ridhwan.dev"],
        reply_to: email,
        subject: `New contact message from ${name}`,
        html: `
          <h2>New message via ridhwan.dev/contact</h2>
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Message:</strong></p>
          <blockquote style="border-left:3px solid #1D9E75;padding:0 1em;margin:1em 0;">
            ${escapeHtml(message).replace(/\n/g, "<br>")}
          </blockquote>
        `.trim(),
        text: `New message via ridhwan.dev/contact\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      }),
    });

    if (!res.ok) {
      const errBody = await res.text();
      // eslint-disable-next-line no-console
      console.error("[api/contact] Resend error:", res.status, errBody);
      return new Response(
        JSON.stringify({
          success: false,
          error: "Failed to send message. Please try again later.",
        }),
        { status: 502, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("[api/contact] Unexpected error:", err);
    return new Response(
      JSON.stringify({
        success: false,
        error: "An unexpected error occurred.",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};

/** Minimal HTML escaper to prevent XSS in email body */
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
