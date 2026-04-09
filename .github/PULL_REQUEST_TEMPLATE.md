## Summary

<!-- What does this PR do? One or two sentences. -->

## Agent ownership

<!-- Which agent(s) own the changed files? -->

- [ ] A — Frontend (`.astro` components, layouts, pages, styles, vanilla JS)
- [ ] B — Backend (content schemas, MDX, API endpoints, Resend, SEO, RSS)
- [ ] C — Deployment (Vercel, DNS, env vars, vercel.json crons/framework keys)
- [ ] D — Payment (Stripe Checkout, webhooks, legal pages)
- [ ] E — CI/CD (vercel.json headers/routes, Lighthouse CI, bundle check, smoke tests)

## Checklist

- [ ] `npm run build` passes locally (runs validate-env.mjs then Astro build)
- [ ] `npx astro check` returns 0 errors
- [ ] No raster hero images added (CSS-only decorative backgrounds per CLAUDE.md)
- [ ] All new icons use `astro-icon` Lucide set only (`lucide:*`)
- [ ] Animated elements use `transform` + `opacity` only; `prefers-reduced-motion` respected
- [ ] No React islands introduced (vanilla JS in `<script>` tags only)
- [ ] New API routes have `export const prerender = false`
- [ ] Cross-agent interface contracts respected (see CLAUDE.md — Cross-agent interfaces)
- [ ] `.env.example` updated if new env vars were added (Agent B maintains)
- [ ] `vercel.json` keys respected: Agent C owns `crons`/`framework`; Agent E owns `headers`/`routes`/`trailingSlash`

## Cross-agent impact

<!-- Does this PR affect another agent's boundary? List the contract and confirm it is honoured. -->

## Test evidence

<!-- Screenshot, `astro check` output, or smoke test result -->

## Related task(s)

<!-- e.g. A6, B1, C7 from subagent_work_breakdown.md -->
