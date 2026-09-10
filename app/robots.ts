import type { MetadataRoute } from "next";

import { absoluteUrl, getSiteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  const host = getSiteUrl();

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/callback/", "/tiktok/", "/_next/"],
      },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host,
  };
}
