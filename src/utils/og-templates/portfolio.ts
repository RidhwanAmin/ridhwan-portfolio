/**
 * portfolio.ts — Agent B owns this file. Task B10.
 *
 * Satori OG image template for ridhwan.dev portfolio pages.
 * Uses design tokens: #0A0A0F bg, #1D9E75 teal, #EF9F27 amber.
 * Generates 1200x630 PNG for blog posts, case studies, and static pages.
 *
 * This template is called by generatePortfolioOgImage.ts.
 * Fonts are loaded from Google Fonts at build time (same pattern as AstroPaper templates).
 */

import satori, { type Font } from "satori";
import { SITE } from "@/config";
import loadGoogleFonts from "../loadGoogleFont";

export interface PortfolioOgOptions {
  title: string;
  description?: string;
  /** Optional tag or category label shown above the title (e.g. "Blog", "Case Study") */
  label?: string;
  /** Accent colour override — defaults to teal #1D9E75 */
  accent?: string;
}

export async function generatePortfolioOgSvg(
  options: PortfolioOgOptions
): Promise<string> {
  const { title, description, label, accent = "#1D9E75" } = options;

  // Truncate title and description for layout safety
  const safeTitle = title.length > 80 ? title.slice(0, 77) + "…" : title;
  const safeDesc = description
    ? description.length > 140
      ? description.slice(0, 137) + "…"
      : description
    : null;

  const allText =
    safeTitle + (safeDesc ?? "") + (label ?? "") + SITE.author + "ridhwan.dev";

  // loadGoogleFonts returns { weight: number } but satori expects Weight literal union.
  // Cast is safe because Google Fonts only returns valid CSS numeric weights.
  const fonts = (await loadGoogleFonts(allText)) as Font[];

  return satori(
    {
      type: "div",
      props: {
        style: {
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#0A0A0F",
          position: "relative",
          overflow: "hidden",
        },
        children: [
          // Teal accent bar on the left edge
          {
            type: "div",
            props: {
              style: {
                position: "absolute",
                top: 0,
                left: 0,
                width: "6px",
                height: "100%",
                background: accent,
              },
            },
          },

          // Subtle corner glow top-right
          {
            type: "div",
            props: {
              style: {
                position: "absolute",
                top: "-120px",
                right: "-120px",
                width: "400px",
                height: "400px",
                borderRadius: "50%",
                background: `${accent}18`,
              },
            },
          },

          // Main content column
          {
            type: "div",
            props: {
              style: {
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                padding: "52px 60px 48px 72px",
                width: "100%",
                height: "100%",
              },
              children: [
                // Top area: label + title + description
                {
                  type: "div",
                  props: {
                    style: {
                      display: "flex",
                      flexDirection: "column",
                      gap: "20px",
                      flex: "1",
                      justifyContent: "center",
                    },
                    children: [
                      // Label pill (optional)
                      ...(label
                        ? [
                            {
                              type: "div",
                              props: {
                                style: {
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "8px",
                                  marginBottom: "4px",
                                },
                                children: {
                                  type: "span",
                                  props: {
                                    style: {
                                      fontSize: 16,
                                      fontWeight: 600,
                                      color: accent,
                                      textTransform: "uppercase",
                                      letterSpacing: "0.1em",
                                    },
                                    children: label,
                                  },
                                },
                              },
                            },
                          ]
                        : []),

                      // Title
                      {
                        type: "h1",
                        props: {
                          style: {
                            fontSize: safeTitle.length > 50 ? 44 : 56,
                            fontWeight: 700,
                            color: "#F9FAFB",
                            lineHeight: 1.2,
                            margin: 0,
                            maxWidth: "900px",
                          },
                          children: safeTitle,
                        },
                      },

                      // Description
                      ...(safeDesc
                        ? [
                            {
                              type: "p",
                              props: {
                                style: {
                                  fontSize: 22,
                                  color: "#9CA3AF",
                                  lineHeight: 1.5,
                                  margin: 0,
                                  maxWidth: "820px",
                                },
                                children: safeDesc,
                              },
                            },
                          ]
                        : []),
                    ],
                  },
                },

                // Bottom area: author + site URL
                {
                  type: "div",
                  props: {
                    style: {
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      borderTop: "1px solid #1F2937",
                      paddingTop: "20px",
                    },
                    children: [
                      // Author
                      {
                        type: "div",
                        props: {
                          style: {
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                          },
                          children: [
                            // Avatar circle
                            {
                              type: "div",
                              props: {
                                style: {
                                  width: "36px",
                                  height: "36px",
                                  borderRadius: "50%",
                                  background: `${accent}33`,
                                  border: `2px solid ${accent}`,
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                },
                                children: {
                                  type: "span",
                                  props: {
                                    style: {
                                      fontSize: 16,
                                      fontWeight: 700,
                                      color: accent,
                                    },
                                    children: "R",
                                  },
                                },
                              },
                            },
                            {
                              type: "span",
                              props: {
                                style: {
                                  fontSize: 18,
                                  fontWeight: 600,
                                  color: "#E5E7EB",
                                },
                                children: SITE.author,
                              },
                            },
                          ],
                        },
                      },

                      // Site URL
                      {
                        type: "span",
                        props: {
                          style: {
                            fontSize: 16,
                            fontWeight: 500,
                            color: accent,
                            letterSpacing: "0.02em",
                          },
                          children: new URL(SITE.website).hostname,
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      width: 1200,
      height: 630,
      embedFont: true,
      fonts,
    }
  );
}
