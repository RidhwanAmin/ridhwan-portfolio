/**
 * /og/projects/[slug].png — Agent B owns this file. Task B10.
 *
 * Generates a 1200x630 OG image PNG for each case study at build time.
 * URL pattern: /og/projects/{slug}.png
 *
 * Uses amber (#EF9F27) accent to distinguish case studies from blog posts.
 */

import type { APIRoute } from "astro";
import { getCollection, type CollectionEntry } from "astro:content";
import { SITE } from "@/config";
import { generateOgImageForCaseStudy } from "@/utils/generatePortfolioOgImage";

export async function getStaticPaths() {
  if (!SITE.dynamicOgImage) {
    return [];
  }

  const studies = await getCollection("case-studies").then(s =>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    s.filter(({ data }) => !(data as any).draft && !(data as any).ogImage)
  );

  return studies.map(study => ({
    params: { slug: study.id },
    props: study,
  }));
}

export const GET: APIRoute = async ({ props }) => {
  if (!SITE.dynamicOgImage) {
    return new Response(null, { status: 404 });
  }

  const buffer = await generateOgImageForCaseStudy(
    props as CollectionEntry<"case-studies">
  );
  return new Response(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
};
