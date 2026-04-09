/**
 * env.d.ts — Agent E owns the ImportMetaEnv block (task E2).
 *            The Window interface below was pre-existing (AstroPaper theme).
 *
 * TypeScript ambient declarations for all environment variables used in this
 * project. These extend ImportMeta so that `import.meta.env.FOO` is typed.
 *
 * All vars listed here must also be present in .env.example (Agent B keeps
 * that file current) and are validated at build time by
 * scripts/validate-env.mjs (Agent E, task E3).
 *
 * Server-only vars (STRIPE_*, RESEND_*) are available only in server-side
 * Astro files and API routes (output: "hybrid"). They are NOT exposed to the
 * client bundle.
 */

/// <reference types="astro/client" />

// ── Pre-existing AstroPaper Window declarations ──────────────────────────────
interface Window {
  theme?: {
    themeValue: string;
    setPreference: () => void;
    reflectPreference: () => void;
    getTheme: () => string;
    setTheme: (val: string) => void;
  };
}

// ── Environment variable types (Agent E, E2) ─────────────────────────────────
interface ImportMetaEnv {
  // ── Site ──────────────────────────────────────────────────────────────────
  /** Canonical site URL — e.g. https://ridhwan.dev */
  readonly SITE_URL: string;

  // ── Substack RSS ──────────────────────────────────────────────────────────
  /** Substack RSS feed URL, fetched at build time by feedLoader */
  readonly SUBSTACK_RSS_URL: string;

  // ── Resend (email) ────────────────────────────────────────────────────────
  /** Resend API key — server-only; used in /api/contact (Agent B, B7) */
  readonly RESEND_API_KEY: string;

  // ── Stripe (payments) ────────────────────────────────────────────────────
  /** Stripe secret key — server-only; used in /api/checkout (Agent D) */
  readonly STRIPE_SECRET_KEY: string;
  /** Stripe publishable key — safe to expose; used in client checkout script */
  readonly STRIPE_PUBLISHABLE_KEY: string;
  /** Stripe webhook signing secret — server-only; used in /api/webhooks/stripe (Agent D) */
  readonly STRIPE_SIGNING_SECRET: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
