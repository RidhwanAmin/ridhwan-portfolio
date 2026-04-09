/**
 * content.config.ts — Agent B owns this file.
 *
 * Defines three Astro 5 content collections with Zod validation:
 *   - blog           : local MDX posts at src/content/blog/
 *   - case-studies   : project MDX at src/content/case-studies/
 *   - substackPosts  : Substack RSS via @ascorbic/feed-loader (build-time fetch)
 *
 * Cross-agent contract (CLAUDE.md):
 *   Agent A queries with getCollection() using these shapes.
 *   ProjectCard.astro expects: slug, title, tagline, tags, thumbnail, featured
 *   — all matched by the case-studies schema below.
 *
 * BLOG_PATH is exported for use by src/utils/getPath.ts (AstroPaper utility
 * that constructs edit-post URLs from the file path).
 */
import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";
import { feedLoader } from "@ascorbic/feed-loader";
import { SITE } from "@/config";

/** Path prefix for local blog MDX files — used by getPath.ts for edit URLs */
export const BLOG_PATH = "src/content/blog";

// ── Blog collection ──────────────────────────────────────────────────────────
const blog = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: `./${BLOG_PATH}` }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubDatetime: z.date(),
      modDatetime: z.date().optional().nullable(),
      author: z.string().default(SITE.author),
      featured: z.boolean().optional(),
      draft: z.boolean().optional(),
      tags: z.array(z.string()).default(["others"]),
      ogImage: image().or(z.string()).optional(),
      canonicalURL: z.string().optional(),
      /** AstroPaper: hides the "Edit this post" link for a specific post */
      hideEditPost: z.boolean().optional(),
      /** AstroPaper: IANA timezone string for display (e.g. "Asia/Kuala_Lumpur") */
      timezone: z.string().optional(),
    }),
});

// ── Case studies collection ───────────────────────────────────────────────────
const caseStudies = defineCollection({
  loader: glob({
    pattern: "**/[^_]*.{md,mdx}",
    base: "./src/content/case-studies",
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      /** One-sentence summary — used in ProjectCard tagline prop */
      tagline: z.string(),
      /** Longer description for SEO and case study intro */
      description: z.string(),
      pubDatetime: z.date(),
      tags: z.array(z.string()).default([]),
      /** Optional hero/thumbnail image (Astro Image-compatible) */
      thumbnail: image().optional(),
      featured: z.boolean().optional(),
      draft: z.boolean().optional(),
      status: z.enum(["published", "draft", "archived"]).default("published"),
    }),
});

// ── Substack RSS collection ───────────────────────────────────────────────────
// feedLoader fetches the RSS at build time. No Zod schema needed — feedLoader
// provides its own typing. The URL falls back to the canonical feed if the
// env var is not set (e.g. during local dev without a .env file).
//
// The loader is wrapped to catch network/parse failures gracefully so that
// `astro check` and local dev builds succeed even when the Substack feed is
// unreachable (e.g. before the Substack account is live, or in CI without
// network access). In that case the collection will be empty — the /blog page
// will simply show no Substack teasers until the feed becomes available.
const feedUrl =
  (import.meta.env.SUBSTACK_RSS_URL as string | undefined) ??
  "https://ridhwanamin.substack.com/feed";

const baseFeedLoader = feedLoader({ url: feedUrl });

const substackPosts = defineCollection({
  loader: {
    ...baseFeedLoader,
    load: async ctx => {
      try {
        await baseFeedLoader.load(ctx);
      } catch (err) {
        ctx.logger.warn(
          `[substackPosts] Feed unavailable — collection will be empty. Reason: ${err instanceof Error ? err.message : String(err)}`
        );
      }
    },
  },
});

export const collections = {
  blog,
  "case-studies": caseStudies,
  substackPosts,
};
