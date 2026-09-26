import { buildLlmsFullTxt } from "@/lib/llms-content";
import { fetchSocialGroups, socialGroupsMarkdown } from "@/lib/social-groups";

export const revalidate = 300;

export async function GET() {
  const groups = await fetchSocialGroups();
  return new Response(buildLlmsFullTxt() + socialGroupsMarkdown(groups), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
      "X-Content-Type-Options": "nosniff",
      Link: '</llms.txt>; rel="describedby"',
    },
  });
}
