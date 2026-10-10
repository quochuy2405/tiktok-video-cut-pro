import type { MetadataRoute } from "next";

import { absoluteUrl, getSiteUrl } from "@/lib/site";

const PRIVATE_PATHS = ["/api/", "/callback/", "/tiktok/", "/_next/"];

/** Crawlers that read pages for answers, training, or citations. */
const AI_AGENTS = [
  "GPTBot",
  "ChatGPT-User",
  "OAI-SearchBot",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "GoogleOther",
  "Applebot-Extended",
  "Amazonbot",
  "Bytespider",
  "CCBot",
  "Meta-ExternalAgent",
  "FacebookBot",
  "cohere-ai",
  "YouBot",
  "DuckAssistBot",
  "MistralAI-User",
  "Diffbot",
  "AI2Bot",
] as const;

export default function robots(): MetadataRoute.Robots {
  const host = getSiteUrl();
  const allow = ["/", "/llms.txt", "/llms-full.txt",];

  return {
    rules: [
      // Empty Disallow lets Google-adstxt read /app-ads.txt. Next drops a
      // blank string, so the empty path has to be an array item.
      {
        userAgent: "Google-adstxt",
        disallow: [""],
      },
      ...AI_AGENTS.map((userAgent) => ({
        userAgent,
        allow,
        disallow: PRIVATE_PATHS,
      })),
      {
        userAgent: "*",
        allow,
        disallow: PRIVATE_PATHS,
      },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host,
  };
}
