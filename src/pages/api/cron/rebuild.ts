// API route: /api/cron/rebuild
// Called by Vercel cron every 6 hours (see vercel.json) to trigger a redeploy
// and pull in the latest Substack RSS posts via feedLoader.
//
// TODO (Agent B): Hook this endpoint to any cache-bust or notification logic needed.
// For now it returns 200 so Vercel cron does not treat it as failed.
//
// Note: The actual RSS rebuild is triggered by the Vercel deploy hook
// (see .github/workflows/scheduled-rebuild.yml) which triggers a full rebuild.
// This endpoint exists to satisfy the vercel.json cron path requirement.

export const prerender = false;

import type { APIRoute } from "astro";

export const GET: APIRoute = async () => {
  return new Response(
    JSON.stringify({ ok: true, message: "Rebuild cron ping received" }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
};

// Return 405 on non-GET methods (required by Agent E smoke tests)
export const POST: APIRoute = async () =>
  new Response(null, { status: 405, headers: { Allow: "GET" } });
