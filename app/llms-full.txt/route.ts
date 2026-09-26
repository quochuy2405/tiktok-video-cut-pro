import { buildLlmsFullTxt } from "@/lib/llms-content";

export const dynamic = "force-static";
export const revalidate = 86400;

export function GET() {
  return new Response(buildLlmsFullTxt(), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
      "X-Content-Type-Options": "nosniff",
      Link: '</llms.txt>; rel="describedby"',
    },
  });
}
