import { NextResponse } from "next/server";

import { buildAppleAppSiteAssociation } from "@/lib/mobile-app-links";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

/** iOS Universal Links — required for TikTok Login Kit redirect into the app. */
export async function GET() {
  const body = buildAppleAppSiteAssociation();

  return new NextResponse(JSON.stringify(body), {
    status: 200,
    headers: {
      // Apple CDN expects JSON (no file extension on this path).
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=300, must-revalidate",
    },
  });
}
