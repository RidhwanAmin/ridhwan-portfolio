# Product

## Register

brand

## Users

Software engineers and AI/LLM-agent integrators — practitioners who build with
LLMs, RAG, and agentic systems and read deep technical writing. They arrive from
a post, a search, or a referral, scanning to decide one thing: "is this person
worth following?" A secondary audience of prospective collaborators and
consulting clients (healthcare-tech and Malaysia/SEA builders) passes through the
same surfaces, but the design optimizes for the practitioner-reader first.

## Product Purpose

A personal site for Ridhwan Amin (AI/ML researcher and engineer, UTP) that doubles
as a portfolio and a content hub. It exists to **build a following**: turn a
first-time reader into someone who subscribes, returns for the writing, and trusts
the work. Shipped projects (healthcare-tech products, hybrid RAG pipelines),
publications, and case studies are the proof; the blog and Substack feed are the
relationship. Success is measured in returning readers and subscribers, not
one-off visits. The consulting/services tier is present but subordinate — it
should never make the site read as a sales funnel.

## Brand Personality

Precise and technical. Quiet, earned confidence — the voice of an engineer who
ships and writes about it honestly, practitioner to practitioner. Assumes
fluency; respects the reader's time; explains the hard parts without hype.
Three words: **precise, candid, unhurried.** The emotional goal is trust through
restraint — a reader should feel they've found a real builder, not a personal
brand.

## Anti-references

- **Generic dev-portfolio.** The cookie-cutter dark template: hero with a typed
  tagline, skill bars, a grid of identical project cards, a contact form at the
  bottom. The default this site must not collapse into.
- **Corporate-SaaS marketing page.** Gradient hero, three equal feature cards,
  buzzword copy ("transform", "supercharge", "seamless"), CTA-stacked sections.
  Too salesy for a researcher building a readership.
- **Over-designed / flashy.** Heavy WebGL, aggressive scroll-jacking, motion as
  spectacle, style over substance. Decoration that distracts from the work and
  the writing is a failure here, not a flourish.

## Design Principles

- **The work is the argument.** Show shipped products, real publications, and
  honest writing. No claims the projects don't back up; no buzzwords standing in
  for evidence.
- **Restraint is the signal.** The black-and-white minimalism is the brand, not a
  placeholder. Confidence reads as what's left out. Any effect must earn its place
  against the "precise & technical" positioning, or it undercuts it.
- **Reading is the conversion.** Every surface should make the writing easy to
  find, easy to read, and easy to subscribe to. Long-form legibility and a clear
  path to the feed beat decoration.
- **Practitioner to practitioner.** Write and design for engineers who build with
  LLMs and agents. Assume competence, reward depth, never condescend or pad.
- **Motion clarifies, never performs.** Scroll animation reveals structure and
  rhythm; it never demands attention for itself. Always paired with a
  reduced-motion alternative.

## Accessibility & Inclusion

Target **WCAG 2.1 AA**. Body text ≥4.5:1 and large text ≥3:1 against background in
both the dark (default) and light themes — verify the muted text tokens
(`--color-text-secondary`, `--color-text-muted`) actually clear AA, since the
B&W palette pushes greys toward the low-contrast edge. Full keyboard navigation
with visible focus rings (already present via `focus-visible` dashed outline).
Honor `prefers-reduced-motion` for all GSAP/Lenis scroll animation (alternative:
instant or crossfade reveal). Semantic landmarks and headings; every icon and
image carries an accessible label or `alt`.
