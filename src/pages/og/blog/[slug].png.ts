/**
 * /og/blog/[slug].png — Agent B owns this file. Task B10.
 *
 * Generates a 1200x630 OG image PNG for each blog post at build time.
 * URL pattern: /og/blog/{slug}.png
 *
 * Wired into BaseLayout via the ogImage prop on each blog post page.
 * Only generates for posts without an explicit ogImage override.
 */

import type { APIRoute } from "astro";
import { getCollection, type CollectionEntry } from "astro:content";
import { SITE } from "@/config";
import { generateOgImageForBlogPost } from "@/utils/generatePortfolioOgImage";
import { getPath } from "@/utils/getPath";

export async function getStaticPaths() {
  if (!SITE.dynamicOgImage) {
    return [];
  }

  const posts = await getCollection("blog").then(p =>
    p.filter(({ data }) => !data.draft && !data.ogImage)
  );

  return posts.map(post => ({
    params: { slug: getPath(post.id, post.filePath, false) },
    props: post,
  }));
}

export const GET: APIRoute = async ({ props }) => {
  if (!SITE.dynamicOgImage) {
    return new Response(null, { status: 404 });
  }

  const buffer = await generateOgImageForBlogPost(
    props as CollectionEntry<"blog">
  );
  return new Response(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
};
