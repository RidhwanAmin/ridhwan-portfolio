/**
 * generatePortfolioOgImage.ts — Agent B owns this file. Task B10.
 *
 * Converts the portfolio satori SVG to a PNG buffer using resvg-js.
 * Mirrors the existing generateOgImages.ts pattern for AstroPaper posts.
 */

import { Resvg } from "@resvg/resvg-js";
import type { CollectionEntry } from "astro:content";
import {
  generatePortfolioOgSvg,
  type PortfolioOgOptions,
} from "./og-templates/portfolio";

function svgToPng(svg: string): Buffer {
  const resvg = new Resvg(svg, {
    fitTo: { mode: "width", value: 1200 },
  });
  return resvg.render().asPng();
}

/** Generate OG image PNG for a blog post */
export async function generateOgImageForBlogPost(
  post: CollectionEntry<"blog">
): Promise<Buffer> {
  const opts: PortfolioOgOptions = {
    title: post.data.title,
    description: post.data.description,
    label: "Blog",
  };
  const svg = await generatePortfolioOgSvg(opts);
  return svgToPng(svg);
}

/** Generate OG image PNG for a case study */
export async function generateOgImageForCaseStudy(
  study: CollectionEntry<"case-studies">
): Promise<Buffer> {
  const opts: PortfolioOgOptions = {
    title: study.data.title,
    description: study.data.description,
    label: "Case Study",
    accent: "#EF9F27", // amber for case studies
  };
  const svg = await generatePortfolioOgSvg(opts);
  return svgToPng(svg);
}

/** Generate OG image PNG for a generic static page */
export async function generateOgImageForPage(
  opts: PortfolioOgOptions
): Promise<Buffer> {
  const svg = await generatePortfolioOgSvg(opts);
  return svgToPng(svg);
}
