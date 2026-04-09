# Launch Checklist — ridhwan.dev

Use this checklist to move from the development/test state to a live production deployment.

---

## D11 — Stripe Live Mode Switchover

Before going live, you must replace all three Stripe keys with live-mode equivalents.
All of these are set in the **Vercel dashboard** under Project > Settings > Environment Variables.

### Step 1 — Create Stripe products and prices (Stripe Dashboard)

1. Go to https://dashboard.stripe.com/products and switch to **Live mode** (toggle top-left).
2. Create product: **"Consulting Call"**
   - Price type: One time
   - Currency: MYR
   - Amount: 150.00
   - After saving, copy the Price ID (e.g. `price_1AbcXXXXXXXXXXXX`).
3. Create product: **"Advisory Retainer"**
   - Price type: One time (current mode) — later can be recurring if desired
   - Currency: MYR
   - Amount: 3000.00
   - After saving, copy the Price ID.

### Step 2 — Update Price IDs in the codebase

File: `src/pages/services/index.astro`

Replace the placeholder Price IDs:
- `"price_consulting_call"` → your real Consulting Call Price ID
- `"price_advisory_retainer"` → your real Advisory Retainer Price ID

These are in the `tiers` array at the top of the file (lines 36 and 54).

### Step 3 — Update environment variables in Vercel

Go to https://vercel.com/dashboard > your project > Settings > Environment Variables.
Update the following for the **Production** environment:

| Variable | Value | Where to find it |
|---|---|---|
| `STRIPE_SECRET_KEY` | `sk_live_...` | Stripe Dashboard > Developers > API keys |
| `STRIPE_PUBLISHABLE_KEY` | `pk_live_...` | Stripe Dashboard > Developers > API keys |
| `STRIPE_SIGNING_SECRET` | `whsec_...` | Stripe Dashboard > Developers > Webhooks (after step 4) |

### Step 4 — Register the Stripe webhook endpoint

1. In Stripe Dashboard (Live mode), go to Developers > Webhooks > Add endpoint.
2. Endpoint URL: `https://ridhwan.dev/api/webhooks/stripe`
3. Select events:
   - `checkout.session.completed`
   - `payment_intent.succeeded`
4. After creating, reveal the **Signing secret** (`whsec_...`) and copy it.
5. Set it as `STRIPE_SIGNING_SECRET` in Vercel (step 3 above).

### Step 5 — Redeploy on Vercel

After updating all environment variables, trigger a new deployment:
- Push a commit, or
- Go to Vercel Dashboard > Deployments > Redeploy latest.

### Step 6 — End-to-end smoke test in live mode

1. Navigate to https://ridhwan.dev/services.
2. Click "Book a call" — you should be redirected to a real Stripe Checkout page in live mode.
3. Complete a test purchase using a real card (or use Stripe's live test card `4242...` only works in test mode — use a real card here).
4. Verify the confirmation email arrives via Resend.
5. Check the Stripe Dashboard > Payments to confirm the payment was recorded.

---

## C6 — GitHub Branch Protection (Lighthouse CI required check)

The Lighthouse CI workflow (`.github/workflows/lighthouse-ci.yml`) must be added as a required status check on the `main` branch.

**Steps (requires admin access to the GitHub repo):**

1. Go to: `https://github.com/<your-org>/ridhwan-portfolio/settings/branches`
2. Under **Branch protection rules**, click **Edit** next to `main`.
3. Check **Require status checks to pass before merging**.
4. In the search box, type `lighthouse` and select: **Lighthouse CI / lighthouse**
5. Also confirm these checks are required (set in Wave 3/4):
   - `Bundle size check` (from `bundle-size.yml`)
   - `Smoke tests` (from `smoke-tests.yml` — triggers on deploy)
6. Click **Save changes**.

Note: The `Lighthouse CI / lighthouse` check only appears in the search box after the workflow has run at least once on a PR. Merge one PR first if the check doesn't appear.

---

## Pre-Launch Verification Checklist

- [ ] `npm run build` passes with 0 errors locally (with `.env` populated)
- [ ] `npx astro check` reports 0 errors
- [ ] Stripe Price IDs in `src/pages/services/index.astro` are real live IDs (not placeholders)
- [ ] `STRIPE_SECRET_KEY` in Vercel is `sk_live_...` (not `sk_test_...`)
- [ ] `STRIPE_PUBLISHABLE_KEY` in Vercel is `pk_live_...`
- [ ] `STRIPE_SIGNING_SECRET` in Vercel matches the live webhook endpoint
- [ ] `RESEND_API_KEY` is set and sending from `ridhwan@ridhwan.dev` domain
- [ ] `SITE_URL=https://ridhwan.dev` (not localhost)
- [ ] DNS: `ridhwan.dev` A record points to Vercel
- [ ] SSL certificate is issued (Vercel handles this automatically)
- [ ] `/terms` page is accessible at https://ridhwan.dev/terms
- [ ] `/refund-policy` page is accessible at https://ridhwan.dev/refund-policy
- [ ] Footer links to `/terms` and `/refund-policy` work
- [ ] Lighthouse CI workflow is set as a required GitHub branch protection check
- [ ] Substack RSS URL is set: `SUBSTACK_RSS_URL=https://ridhwanamin.substack.com/feed`
- [ ] Vercel Analytics is enabled in the Vercel dashboard
- [ ] Profile photo added (currently showing "RA" SVG placeholder in About section)

---

## Notes

- The Advisory Retainer tier uses `mode: "payment"` (one-time) in the Stripe session. If you want recurring billing, change to `mode: "subscription"` and create a recurring Price in Stripe. This requires code changes to the webhook handler too.
- The `currency: "myr"` field in `src/pages/api/checkout.ts` sets MYR as the default display currency. Stripe's Adaptive Pricing will show local currencies to international customers if enabled in your Stripe settings.
- Cal.com booking widget is a placeholder in `ContactSection.astro` — replace with a real Cal.com embed when ready.
