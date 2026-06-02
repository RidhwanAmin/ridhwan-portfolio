---
name: Ridhwan Amin — Portfolio
description: Monochrome engineering portfolio where precise black-and-white type meets engineered motion.
colors:
  ink-white: "#ffffff"
  true-black: "#000000"
  surface-black: "#111111"
  surface-raised: "#1a1a1a"
  grey-mid: "#888888"
  grey-dim: "#555555"
  border-hairline: "#ffffff14"
  border-strong: "#ffffff26"
typography:
  display:
    fontFamily: "Sora Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.8rem, 7vw, 5.5rem)"
    fontWeight: 700
    lineHeight: 0.95
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Sora Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.75rem, 4vw, 2.5rem)"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Inter Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  label:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "0.2em"
rounded:
  none: "0"
  sm: "0.375rem"
  md: "0.5rem"
  lg: "0.75rem"
  pill: "9999px"
spacing:
  xs: "0.75rem"
  sm: "1.25rem"
  md: "1.75rem"
  section: "6rem"
components:
  cta-primary:
    backgroundColor: "{colors.ink-white}"
    textColor: "{colors.true-black}"
    rounded: "{rounded.none}"
    padding: "0.75rem 1.5rem"
  cta-primary-hover:
    backgroundColor: "{colors.true-black}"
    textColor: "{colors.ink-white}"
    rounded: "{rounded.none}"
  cta-ghost:
    backgroundColor: "{colors.true-black}"
    textColor: "{colors.ink-white}"
    rounded: "{rounded.none}"
    padding: "0.75rem 1.5rem"
  input:
    backgroundColor: "{colors.surface-black}"
    textColor: "{colors.ink-white}"
    rounded: "{rounded.md}"
    padding: "0.75rem 1rem"
  card:
    backgroundColor: "{colors.surface-black}"
    textColor: "{colors.ink-white}"
    rounded: "{rounded.lg}"
  nav:
    backgroundColor: "{colors.surface-black}"
    textColor: "{colors.ink-white}"
    height: "4rem"
  tag-pill:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.ink-white}"
    rounded: "{rounded.pill}"
    padding: "0.125rem 0.625rem"
---

# Design System: Ridhwan Amin — Portfolio

## 1. Overview

**Creative North Star: "The Engineered Stage"**

A monochrome surface that behaves like a precision instrument and performs like a
showreel. The palette is pure black and white with two greys and hairline rules —
zero hue, zero decoration. That austerity is deliberate: it is the matte stage on
which the real expression happens, which is **engineered motion**. A cursor-reactive
2D canvas — the *Agent Loop* (a central agent core dispatching tool-calls to a ring
of tool nodes in a perpetual plan/act/observe cycle) — anchors the hero;
GSAP/ScrollTrigger choreographs reveals; Lenis carries the scroll. The thesis of the whole site is the
North Star itself: a builder who is
both rigorous (the monochrome, the mono labels, the evidence) and capable of
crafted motion (the kinetic layer). Color says "serious engineer"; motion says
"and I can make it move."

This system explicitly rejects the **generic dev-portfolio** (typed-tagline hero,
skill bars, identical project cards), the **corporate-SaaS marketing page**
(gradient hero, three equal feature cards, buzzword copy), and **decoration for
its own sake**. Motion here is not flash — every animation shows craft, runs on
`transform`/`opacity`, and degrades to a static state under
`prefers-reduced-motion`. The line is sharp: engineered motion is the brand;
gratuitous motion is the anti-reference.

Density is editorial and unhurried — generous vertical rhythm (`6rem` section
spacing), a `max-w-6xl` measure, content that breathes. Reading is the
conversion: type legibility and a clear path to the writing always win over
ornament.

**Key Characteristics:**
- Zero-hue monochrome: black, white, two greys, hairline borders. No accent color.
- The accent *is* maximum contrast — pure inversion of the background.
- JetBrains Mono as a recurring voice for labels, eyebrows, indices, and the logo.
- Engineered motion (canvas Agent Loop + GSAP + Lenis) as the single expressive layer.
- Flat by default; depth comes from surface-tone steps and hairline rules.

## 2. Colors

A zero-chroma monochrome system. There is no brand hue; "color" is luminance and
contrast alone. Values below are the **dark theme (default)**; the light theme is
an exact inversion (white bg, black text, black accent) via `data-theme="light"`.

### Primary
- **Ink White** (#ffffff): Primary text and the sole "accent." Used for headlines,
  body text on dark, the filled primary CTA, focus rings, and the active-nav
  underline. In light mode this role flips to true black. Its power is that it is
  the highest-contrast value available, never a hue.

### Neutral
- **True Black** (#000000): The page background. The matte stage.
- **Surface Black** (#111111): Raised surfaces — cards, inputs, nav bar, the glass
  utility. One luminance step off the background.
- **Surface Raised** (#1a1a1a): Hover/second-level surface — tag pills, hovered
  cards. The next step up.
- **Grey Mid** (#888888): Secondary text — descriptions, sub-labels, metadata that
  supports the primary line.
- **Grey Dim** (#555555): Muted text — timestamps, faint indices, decorative
  labels. **Use with care: #555 on #000 is ~4.0:1, below the AA 4.5:1 floor for
  body text.** Reserve it for large or non-essential text only.
- **Border Hairline** (rgba 255,255,255,0.08): Default 1px dividers and card
  borders. The primary structural line of the whole system.
- **Border Strong** (rgba 255,255,255,0.15): Emphasis borders — ghost CTAs,
  focused inputs, dashed empty-state containers.

### Named Rules
**The Zero-Hue Rule.** No color carries a hue. If a value has saturation, it does
not belong. Legacy `--color-teal` / `--color-amber` tokens exist only as aliases
that resolve to white/grey — never introduce a literal saturated value
(`amber-400`, `text-white` + colored shadow, `#ff5f57`) outside the documented
exceptions below.

**The Inversion Rule.** The accent is always the inverse of the background:
white-on-black in dark, black-on-white in light. There is no third color to reach
for. Emphasis comes from weight, scale, and motion — not hue.

## 3. Typography

**Display Font:** Sora Variable (with `ui-sans-serif`, `system-ui` fallback)
**Body Font:** Inter Variable (with `ui-sans-serif`, `system-ui` fallback)
**Label/Mono Font:** JetBrains Mono (with `ui-monospace` fallback)

**Character:** A geometric-grotesque display (Sora) paired against a neutral
workhorse body (Inter), with a monospace (JetBrains Mono) carrying the
"engineer's voice." The pairing reads precise and contemporary; the mono is the
signature that ties the system to its practitioner audience.

### Hierarchy
- **Display** (Sora, 700, `clamp(2.8rem, 7vw, 5.5rem)`, line-height 0.95,
  tracking -0.025em): Hero headline only. Tight, large, confident. Capped under
  the 6rem ceiling at the top of its clamp.
- **Headline** (Sora, 600, `clamp(1.75rem, 4vw, 2.5rem)`, line-height 1.1):
  Section titles. Use `font-display` utility.
- **Body** (Inter, 400, 1rem, line-height 1.6): Paragraphs and prose. Cap measure
  at 65–75ch (`max-w-md`/`max-w-xl` on hero copy; `app-prose` for long-form).
- **Label** (JetBrains Mono, 500, 0.75rem, letter-spacing 0.2em, UPPERCASE): Mono
  eyebrows, the `R. AMIN` logo, the `01/02` card indices, the faux-browser URL
  bar, availability status. The recurring signature element.

### Named Rules
**The Mono-Voice Rule.** JetBrains Mono is reserved for short structural labels —
eyebrows, indices, status, logo — never body copy or headlines. It is the
engineer's annotation layer over the type system, not a third body face.

**The Balance Rule.** Apply `text-wrap: balance` to display and section headings;
`text-wrap: pretty` to long prose. Headlines must not overflow at any breakpoint —
test the longest section title at tablet width.

## 4. Elevation

**Flat by default.** This system uses no ambient shadows. Depth is conveyed
entirely through surface-tone layering (#000 → #111 → #1a1a1a) and 1px hairline
borders. The `glass` utility is intentionally blur-free: a `surface-black`
background plus a hairline border, nothing more. Interactive feedback comes from
border-strengthening, surface-tone shift, and motion — not from lifting shadows.

### Named Rules
**The No-Shadow Rule.** Surfaces sit flat on the stage. The lone `shadow-lg` on the
contact submit button is a legacy inconsistency, not a pattern — remove it.
Elevation reads through tone and line, never through a drop shadow.

## 5. Components

### Buttons
- **Shape:** Square (0 radius) for primary actions and CTAs; the squared edge is
  part of the precise, instrument-like feel. Utility buttons (theme toggle) use
  6px (`rounded-md`); the contact form's buttons use 8px (`rounded-md`/`lg`) and
  are a softer legacy variant — prefer the squared CTA going forward.
- **Primary (CTA):** Filled — `ink-white` background, `true-black` text, square,
  `0.75rem 1.5rem` padding, `font-semibold`, with a Lucide arrow. **Hover inverts:**
  background goes transparent, text and border become `ink-white`. The inversion
  is the interaction.
- **Ghost:** Transparent with a `border-strong` outline and `ink-white` text;
  hover strengthens the border to full `ink-white`.
- **Inline (LinkButton):** Text link, `inline-flex` with a gap; `hover:text-accent`
  (i.e. brightens to full white). No background.

### Inputs / Fields
- **Style:** `surface-black` background, 1px `border-hairline`, `rounded-md` (8px),
  `0.75rem 1rem` padding, `text-sm`.
- **Focus:** Border shifts to the accent and a matching `ring-1` appears
  (white in dark, black in light). No glow.
- **Placeholder:** Currently `grey-dim` (#555) — below AA; bump toward `grey-mid`
  for placeholder legibility.

### Cards / Containers
- **Corner Style:** 12px (`rounded-lg` / `--radius-card`).
- **Background:** `surface-black`; hover steps to `surface-raised`.
- **Shadow Strategy:** None — see Elevation. Separation via `border-hairline`.
- **Internal Padding:** `1.25rem`–`1.75rem` (the `sm`/`md` spacing steps).

### Navigation
- **Style:** Fixed top, full-width, `glass` (surface + hairline bottom border, no
  blur), `4rem` tall, `max-w-6xl` inner. Logo is mono uppercase (`R. AMIN`, the
  `R.` at 50% opacity).
- **Links:** `text-secondary`, hover/active brighten to `ink-white`; the active
  link gets `font-weight: 600` and the accent underline (`.active-nav`).
- **Mobile:** Links collapse below `md`; theme toggle and menu persist.

### Faux-Browser ProjectCard (signature)
- A featured-project card whose image sits under a simulated browser chrome: three
  traffic-light dots (the one place literal red/amber/green `#ff5f57 / #febc2e /
  #28c840` is permitted, as an OS-mimicking affordance) and a mono URL bar. A mono
  `01/02` index sits beside the title at 50% opacity, brightening on hover; the
  screenshot scales to 1.04 on hover over 700ms. This is the most distinctive
  component — treat the chrome as a fixed motif, not decoration to vary per card.

### Agent Loop (signature, hero background)
- A full-bleed `<canvas>` behind the hero, right-weighted so it sits clear of the
  headline on the left. A central **agent core** runs a perpetual plan/act/observe
  cycle: it emits expanding "act" pulse rings, dispatches **tool-call packets** out
  along spokes to a ring of six labelled tool nodes (`plan / search / call / read /
  write / observe`) and receives returns, inside a slowly rotating dashed "context
  window" ring. The cursor is **attended to** (the core draws a line to it and the
  nearest tool lights up). It speaks directly to the audience: an agent orchestrating
  tools, which is what they build. Strokes read the live theme via the inversion rule
  (white on black, black on white). It replaced an external Spline 3D iframe (and an
  earlier 2D constellation): lighter, no third-party dependency, CSP-clean.
  **Reduced motion:** one static frame, no animation or cursor reactivity.
  **Performance:** fixed small node count, pauses off-screen (IntersectionObserver)
  and when the tab is hidden. Treat this as the brand's hero motif; do not swap it
  for a generic particle network.

### Tag / Credential Pills
- `rounded-pill`, `surface-raised` background, small mono/medium text. **Legacy
  amber pills (`amber-500/10` bg, `amber-400` text) violate the Zero-Hue Rule —
  recolor to the monochrome surface/text tokens.**

## 6. Do's and Don'ts

### Do:
- **Do** keep the palette zero-hue: black, white, `#888`, `#555`, and hairline
  borders only. Emphasis through weight, scale, and motion.
- **Do** treat engineered motion as the signature expressive layer: the
  cursor-reactive canvas Agent Loop in the hero, GSAP reveals, Lenis
  scroll. Make every motion show craft.
- **Do** keep DOM motion to `transform`/`opacity` (exponential ease-out, never
  bounce); the hero paints on `<canvas>` instead. Ship a `prefers-reduced-motion`
  fallback for every animation — the Agent Loop renders a single static frame and
  drops its cursor reactivity.
- **Do** use JetBrains Mono for short labels/eyebrows/indices only — the
  engineer's annotation voice.
- **Do** keep surfaces flat; convey depth with the #000 → #111 → #1a1a1a tone steps
  and 1px hairlines.
- **Do** verify body text clears AA 4.5:1 in both themes; lift `grey-dim` text
  toward `grey-mid` when it carries meaning.

### Don't:
- **Don't** introduce any saturated/hued color outside the OS traffic-light dots.
  No `amber-400` tag pills, no `text-white` + `shadow-teal-500/20` button, no
  colored gradients. (The Zero-Hue Rule.)
- **Don't** add drop shadows for elevation — remove the stray contact-button
  `shadow-lg`. (The No-Shadow Rule.)
- **Don't** let motion become spectacle without substance — no scroll-jacking, no
  motion that doesn't demonstrate engineering craft. Engineered motion is the
  brand; gratuitous motion is the anti-reference.
- **Don't** drift toward the **generic dev-portfolio** (typed-tagline hero, skill
  bars, identical card grids) or the **corporate-SaaS page** (gradient hero, three
  equal feature cards, "transform/supercharge/seamless" copy).
- **Don't** use side-stripe borders, gradient text, or decorative glassmorphism;
  the `glass` utility stays blur-free by design.
- **Don't** let display headings exceed the 5.5rem clamp max or overflow their
  container at any breakpoint.
