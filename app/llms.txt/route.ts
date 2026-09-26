import { buildLlmsTxt } from "@/lib/llms-content";
import { fetchSocialGroups, socialGroupsMarkdown } from "@/lib/social-groups";

export const revalidate = 300;

export async function GET() {
  const groups = await fetchSocialGroups();
  return new Response(buildLlmsTxt() + socialGroupsMarkdown(groups), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
