import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { JsonLd, buildHomeJsonLd } from "@/components/json-ld";
import { LandingPage } from "@/components/landing-page";
import { APP_NAME } from "@/lib/brand";
import { fetchWebMarketingPayload } from "@/lib/marketing-api";
import { fetchSocialGroups } from "@/lib/social-groups";
import {
  absoluteLocaleUrl,
  absoluteUrl,
  hreflangAlternates,
  llmAlternateTypes,
  OG_IMAGE,
  openGraphAlternateLocales,
  openGraphLocale,
} from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: {
      absolute: t("titleDefault"),
    },
    description: t("description"),
    alternates: {
      canonical: absoluteLocaleUrl(locale),
      languages: hreflangAlternates(),
      types: llmAlternateTypes(),
    },
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
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
          alt: t("ogImageAlt"),
          type: OG_IMAGE.type,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("twitterTitle"),
      description: t("twitterDescription"),
      images: [
        {
          url: absoluteUrl(OG_IMAGE.path),
          width: OG_IMAGE.width,
          height: OG_IMAGE.height,
          alt: t("ogImageAlt"),
        },
      ],
    },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "Metadata" });
  const tLanding = await getTranslations({ locale, namespace: "Landing" });
  const faqItems = (tLanding.raw("faqSection.items") as Array<{
    question: string;
    answer: string;
  }>) || [];
  const sponsorsSection = tLanding.raw("sponsorsSection") as {
    processTitle: string;
    process: Array<{ title: string; desc: string }>;
  };
  const servicesSection = tLanding.raw("servicesSection") as {
    titleLead: string;
    titleAccent: string;
    items: Array<{ title: string; desc: string }>;
  };
  const [{ stripSlides, popupSlides }, socialGroups] = await Promise.all([
    fetchWebMarketingPayload(locale),
    fetchSocialGroups(),
  ]);

  return (
    <>
      <JsonLd
        data={buildHomeJsonLd(locale, t("description"), faqItems, {
          howToName: sponsorsSection?.processTitle,
          steps: (sponsorsSection?.process || []).map((step) => ({
            name: step.title,
            text: step.desc,
          })),
          features: (servicesSection?.items || []).map((service) => service.title),
          servicesName: servicesSection
            ? `${servicesSection.titleLead} ${servicesSection.titleAccent}`
            : undefined,
          services: (servicesSection?.items || []).map((service) => ({
            name: service.title,
            description: service.desc,
          })),
        })}
      />
      <LandingPage
        stripBanners={stripSlides}
        popupBanners={popupSlides}
        socialGroups={socialGroups}
      />
    </>
  );
}
