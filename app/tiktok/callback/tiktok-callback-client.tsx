"use client";

import { useEffect, useMemo, useState } from "react";

import { APP_NAME } from "@/lib/brand";

type Props = {
  appScheme: string;
  code?: string;
  state?: string;
  error?: string;
  errorDescription?: string;
  scopes?: string;
};

function buildAppDeepLink(schemeBase: string, props: Omit<Props, "appScheme">): string {
  const base = schemeBase.includes("://")
    ? schemeBase
    : `fivecutpro://${schemeBase.replace(/^\/+/, "")}`;
  const url = new URL(base);
  if (props.code) url.searchParams.set("code", props.code);
  if (props.state) url.searchParams.set("state", props.state);
  if (props.scopes) url.searchParams.set("scopes", props.scopes);
  if (props.error) url.searchParams.set("error", props.error);
  if (props.errorDescription) {
    url.searchParams.set("error_description", props.errorDescription);
  }
  return url.toString();
}

export function TikTokCallbackClient({
  appScheme,
  code,
  state,
  error,
  errorDescription,
  scopes,
}: Props) {
  const [triedOpen, setTriedOpen] = useState(false);
  const deepLink = useMemo(
    () =>
      buildAppDeepLink(appScheme, {
        code,
        state,
        error,
        errorDescription,
        scopes,
      }),
    [appScheme, code, state, error, errorDescription, scopes],
  );
  const ok = Boolean(code) && !error;

  useEffect(() => {
    // Universal / App Links normally open the native app before this page paints.
    // Custom-scheme fallback for browsers / when links are not verified yet.
    const timer = window.setTimeout(() => {
      setTriedOpen(true);
      window.location.href = deepLink;
    }, 250);
    return () => window.clearTimeout(timer);
  }, [deepLink]);

  return (
    <main
      style={{
        minHeight: "100dvh",
        margin: 0,
        display: "grid",
        placeItems: "center",
        padding: 24,
        background: "#030305",
        color: "#f4f4f5",
        fontFamily:
          'Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif',
      }}
    >
      <div style={{ maxWidth: 420, width: "100%", textAlign: "center" }}>
        <p
          style={{
            margin: "0 0 8px",
            fontSize: 13,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#18E299",
            fontWeight: 700,
          }}
        >
          {APP_NAME}
        </p>
        <h1 style={{ margin: "0 0 12px", fontSize: 24, lineHeight: 1.3 }}>
          {ok
            ? "Đăng nhập TikTok thành công"
            : error
              ? "Đăng nhập thất bại"
              : "Đang mở ứng dụng…"}
        </h1>
        <p style={{ margin: "0 0 20px", fontSize: 15, lineHeight: 1.6, color: "#a1a1aa" }}>
          {ok
            ? "Nếu app chưa tự mở, bấm nút bên dưới để quay lại Five Cut Pro."
            : error
              ? errorDescription || error
              : "Đang chuyển kết quả đăng nhập TikTok về ứng dụng."}
        </p>

        <a
          href={deepLink}
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: 44,
            padding: "0 18px",
            borderRadius: 12,
            background: "#18E299",
            color: "#052e1c",
            fontWeight: 700,
            fontSize: 15,
            textDecoration: "none",
          }}
        >
          Mở {APP_NAME}
        </a>

        {triedOpen ? (
          <p style={{ marginTop: 16, fontSize: 12, color: "#71717a" }}>
            Chưa cài app? Tải Five Cut Pro rồi thử đăng nhập lại từ trong ứng dụng.
          </p>
        ) : null}
      </div>
    </main>
  );
}
