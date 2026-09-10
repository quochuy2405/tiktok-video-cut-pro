import type { Metadata } from "next";

import { TIKTOK_APP_SCHEME } from "@/lib/mobile-app-links";

import { TikTokCallbackClient } from "./tiktok-callback-client";

export const metadata: Metadata = {
  title: "TikTok Login — Five Cut Pro",
  robots: { index: false, follow: false },
};

type SearchParams = Record<string, string | string[] | undefined>;

function first(value: string | string[] | undefined): string | undefined {
  if (Array.isArray(value)) return value[0];
  return value;
}

export default async function TikTokCallbackPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const code = first(params.code);
  const state = first(params.state);
  const error = first(params.error);
  const errorDescription = first(params.error_description);
  const scopes = first(params.scopes);

  return (
    <TikTokCallbackClient
      appScheme={TIKTOK_APP_SCHEME}
      code={code}
      state={state}
      error={error}
      errorDescription={errorDescription}
      scopes={scopes}
    />
  );
}
