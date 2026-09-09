import { IBM_Plex_Mono, Inter } from "next/font/google";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { GoogleAnalytics } from "@/components/google-analytics";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { routing } from "@/i18n/routing";
import { APP_NAME } from "@/lib/brand";
import {
  absoluteLocaleUrl,
  absoluteUrl,
  getSiteUrl,
  hreflangAlternates,
  OG_IMAGE,
  OG_VI,
  openGraphAlternateLocales,
  openGraphLocale,
  SITE,
} from "@/lib/site";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext", "vietnamese"],
  weight: ["400", "500", "600"],
});

/** Labels/code captions — Geist Mono has no Vietnamese glyphs on Google Fonts. */
const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin", "latin-ext", "vietnamese"],
  weight: ["400", "500", "600"],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  const siteUrl = getSiteUrl();
  const keywords = t.raw("keywords") as string[];

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: t("titleDefault"),
      template: `%s · ${APP_NAME}`,
    },
    description: t("description"),
    applicationName: t("applicationName"),
    authors: [{ name: SITE.copyrightHolder, url: absoluteLocaleUrl(locale) }],
    creator: t("creator"),
    publisher: SITE.copyrightHolder,
    category: t("category"),
    keywords,
    referrer: "origin-when-cross-origin",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    icons: {
      // Google Search requires favicon ≥ 48×48 (multiples of 48).
      icon: [
        {
          url: absoluteUrl("/icon-48.png"),
          type: "image/png",
          sizes: "48x48",
        },
        {
          url: absoluteUrl("/icon.png"),
          type: "image/png",
          sizes: "512x512",
        },
        {
          url: absoluteUrl("/favicon.ico"),
          type: "image/x-icon",
          sizes: "48x48",
        },
      ],
      apple: [
        {
          url: absoluteUrl("/apple-icon.png"),
          type: "image/png",
          sizes: "180x180",
        },
      ],
    },
    manifest: "/manifest.webmanifest",
    alternates: {
      canonical: absoluteLocaleUrl(locale),
      languages: hreflangAlternates(),
    },
    openGraph: {
      title: t("ogTitle") || OG_VI.title,
      description: t("ogDescription") || OG_VI.description,
      url: absoluteLocaleUrl(locale),
      siteName: APP_NAME,
      locale: openGraphLocale(locale),
      alternateLocale: openGraphAlternateLocales(locale),
      type: "website",
      images: [
        {
          url: absoluteUrl(OG_IMAGE.path),
          secureUrl: absoluteUrl(OG_IMAGE.path),
          width: OG_IMAGE.width,
          height: OG_IMAGE.height,
          alt: t("ogImageAlt") || OG_VI.imageAlt,
          type: OG_IMAGE.type,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("twitterTitle") || OG_VI.title,
      description: t("twitterDescription") || OG_VI.twitterDescription,
      images: [
        {
          url: absoluteUrl(OG_IMAGE.path),
          width: OG_IMAGE.width,
          height: OG_IMAGE.height,
          alt: t("ogImageAlt") || OG_VI.imageAlt,
        },
      ],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    appleWebApp: {
      capable: true,
      title: APP_NAME,
      statusBarStyle: "black-translucent",
    },
    other: {
      "theme-color": "#050507",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`dark ${inter.variable} ${ibmPlexMono.variable} h-full scroll-smooth antialiased`}
    >
      <body
        className="flex min-h-full flex-col bg-background font-sans text-foreground"
        suppressHydrationWarning
      >
        <GoogleAnalytics />
        <NextIntlClientProvider messages={messages}>
          <SiteHeader />
          <main className="flex min-w-0 flex-1 flex-col overflow-x-clip pt-[64px]">
            {children}
          </main>
          <SiteFooter />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
