"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { GA_TRACKING_ID } from "@/lib/analytics";

export function GoogleAnalytics() {
  const pathname = usePathname();
  const isFirstRender = useRef(true);

  // Theo dõi chuyển trang nội bộ (Clent-side routing trong Next.js)
  useEffect(() => {
    // gtag('config') đã tự động gửi page_view ở lần tải trang đầu tiên.
    // Bỏ qua lần render đầu để tránh bị đếm trùng (duplicate page_view).
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("event", "page_view", {
        page_path: pathname,
        page_location: window.location.href,
        page_title: typeof document !== "undefined" ? document.title : "",
      });
    }
  }, [pathname]);

  if (!GA_TRACKING_ID) return null;

  return (
    <>
      {/* Google tag (gtag.js) */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        strategy="afterInteractive"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${GA_TRACKING_ID}');
          `,
        }}
      />
    </>
  );
}
