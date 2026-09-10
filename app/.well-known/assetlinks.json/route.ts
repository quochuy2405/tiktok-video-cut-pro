import { NextResponse } from "next/server";

import { buildAndroidAssetLinks } from "@/lib/mobile-app-links";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

/** Android App Links — required for TikTok Login Kit redirect into the app. */
export async function GET() {
  const body = buildAndroidAssetLinks();

  return NextResponse.json(body, {
    status: 200,
    headers: {
      "Cache-Control": "public, max-age=300, must-revalidate",
      "Content-Type": "application/json; charset=utf-8",
    },
  });
}
