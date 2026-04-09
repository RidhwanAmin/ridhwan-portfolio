/**
 * sendConfirmationEmail — Agent D owns this file. Task D6.
 *
 * Sends a branded payment confirmation email to the customer via Resend.
 * Called by /api/webhooks/stripe.ts on checkout.session.completed.
 *
 * Cross-agent contract:
 *   - Called by Agent D's webhook handler (D5) — not called by Agent A or B
 *   - Uses RESEND_API_KEY (maintained by Agent B in .env.example)
 */

import { Resend } from "resend";
import type Stripe from "stripe";

const RESEND_API_KEY = import.meta.env.RESEND_API_KEY as string | undefined;

function formatCurrency(amountCents: number | null, currency: string): string {
  if (amountCents == null) return "—";
  const amount = amountCents / 100;
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency.toUpperCase(),
    }).format(amount);
  } catch {
    return `${currency.toUpperCase()} ${amount.toFixed(2)}`;
  }
}

export async function sendConfirmationEmail(
  session: Stripe.Checkout.Session
): Promise<void> {
  if (!RESEND_API_KEY) {
    // eslint-disable-next-line no-console
    console.warn(
      "[sendConfirmationEmail] RESEND_API_KEY is not set — skipping email"
    );
    return;
  }

  const customerEmail =
    session.customer_details?.email ?? session.customer_email;

  if (!customerEmail) {
    // eslint-disable-next-line no-console
    console.warn(
      "[sendConfirmationEmail] No customer email on session:",
      session.id
    );
    return;
  }

  const customerName = session.customer_details?.name ?? "there";
  const amountPaid = formatCurrency(
    session.amount_total,
    session.currency ?? "usd"
  );

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Booking confirmed — Ridhwan Amin</title>
</head>
<body style="margin:0;padding:0;background:#0A0A0F;font-family:'Inter',Arial,sans-serif;color:#E5E7EB;">
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:#0A0A0F;padding:40px 0;">
    <tr>
      <td align="center">
        <table role="presentation" cellpadding="0" cellspacing="0" width="600" style="max-width:600px;width:100%;background:#111118;border-radius:12px;border:1px solid #1F2937;overflow:hidden;">

          <!-- Header -->
          <tr>
            <td style="background:#0D1A14;padding:32px 40px;border-bottom:1px solid #1D9E7533;">
              <p style="margin:0;font-size:13px;font-weight:600;color:#1D9E75;text-transform:uppercase;letter-spacing:0.08em;">
                ridhwan.dev
              </p>
              <h1 style="margin:8px 0 0;font-size:22px;font-weight:700;color:#F9FAFB;line-height:1.3;">
                Booking confirmed
              </h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:36px 40px;">
              <p style="margin:0 0 20px;font-size:15px;line-height:1.6;color:#D1D5DB;">
                Hi ${customerName},
              </p>
              <p style="margin:0 0 20px;font-size:15px;line-height:1.6;color:#D1D5DB;">
                Your payment has been received — thank you for booking. Here's a summary:
              </p>

              <!-- Summary box -->
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:#0A0A0F;border-radius:8px;border:1px solid #1F2937;margin:0 0 28px;">
                <tr>
                  <td style="padding:20px 24px;">
                    <p style="margin:0 0 4px;font-size:12px;font-weight:600;color:#6B7280;text-transform:uppercase;letter-spacing:0.06em;">Amount paid</p>
                    <p style="margin:0;font-size:24px;font-weight:700;color:#1D9E75;">${amountPaid}</p>
                  </td>
                </tr>
              </table>

              <p style="margin:0 0 20px;font-size:15px;line-height:1.6;color:#D1D5DB;">
                I'll be in touch within 24 hours to schedule our session and share any preparation materials.
              </p>
              <p style="margin:0 0 28px;font-size:15px;line-height:1.6;color:#D1D5DB;">
                If you have any questions in the meantime, just reply to this email.
              </p>

              <!-- CTA -->
              <table role="presentation" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="border-radius:8px;background:#1D9E75;">
                    <a href="https://ridhwan.dev" style="display:inline-block;padding:12px 28px;font-size:14px;font-weight:600;color:#ffffff;text-decoration:none;border-radius:8px;">
                      Visit ridhwan.dev
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:20px 40px 28px;border-top:1px solid #1F2937;">
              <p style="margin:0;font-size:12px;color:#6B7280;line-height:1.6;">
                Ridhwan Amin — AI/ML Researcher &amp; Consultant<br />
                <a href="https://ridhwan.dev" style="color:#1D9E75;text-decoration:none;">ridhwan.dev</a> &nbsp;·&nbsp;
                <a href="mailto:ridhwan@ridhwan.dev" style="color:#1D9E75;text-decoration:none;">ridhwan@ridhwan.dev</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  const resend = new Resend(RESEND_API_KEY);

  try {
    const { error } = await resend.emails.send({
      from: "Ridhwan Amin <ridhwan@ridhwan.dev>",
      to: [customerEmail],
      replyTo: "ridhwan@ridhwan.dev",
      subject: "Booking confirmed — Ridhwan Amin",
      html,
    });

    if (error) {
      // eslint-disable-next-line no-console
      console.error("[sendConfirmationEmail] Resend error:", error);
    } else {
      // eslint-disable-next-line no-console
      console.log("[sendConfirmationEmail] Email sent to:", customerEmail);
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("[sendConfirmationEmail] Unexpected error:", err);
  }
}
