import type { MetadataRoute } from "next";

import { APP_NAME } from "@/lib/brand";
import { absoluteUrl } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: APP_NAME,
    short_name: "Five",
    description:
      "Five Cut Pro — tạo video bán hàng dễ dàng, chuyên nghiệp cho nhà bán hàng, KOC và KOL.",
    start_url: "/vi",
    display: "standalone",
    background_color: "#050507",
    theme_color: "#18E299",
    lang: "vi",
    icons: [
      {
        src: absoluteUrl("/icon.png"),
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: absoluteUrl("/apple-icon.png"),
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
