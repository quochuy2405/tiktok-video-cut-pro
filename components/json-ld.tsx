import { APP_NAME } from "@/lib/brand";
import {
  DEFAULT_ANDROID_STORE_URL,
  DEFAULT_IOS_STORE_URL,
  DISPLAY_APP_VERSION,
} from "@/lib/downloads";
import {
  absoluteUrl,
  allLocaleTags,
  localeTag,
  SITE,
  SOCIAL_LINKS,
} from "@/lib/site";

type JsonLd = Record<string, unknown>;

export function JsonLd({ data }: { data: JsonLd | JsonLd[] }) {
  const payload = Array.isArray(data) ? data : [data];
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(
          payload.length === 1 ? payload[0] : payload,
        ).replace(/</g, "\\u003c"),
      }}
    />
  );
}

export type HomeJsonLdExtras = {
  /** Steps from the "how it works" section, in order. */
  steps?: Array<{ name: string; text: string }>;
  /** Headline for the HowTo entity — falls back to the section title. */
  howToName?: string;
  /** Feature titles shown on the page. */
  features?: string[];
};

export function buildHomeJsonLd(
  locale: string,
  description: string,
  faqItems?: Array<{ question: string; answer: string }>,
  extras: HomeJsonLdExtras = {},
): JsonLd[] {
  const pageUrl = absoluteUrl(`/${locale}`);
  const logoUrl = absoluteUrl("/logo.png");
  const siteUrl = absoluteUrl(`/${SITE.defaultLocale}`);
  const pageLanguage = localeTag(locale);

  const organization: JsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.copyrightHolder,
    email: SITE.email,
    url: siteUrl,
    logo: logoUrl,
    brand: {
      "@type": "Brand",
      name: APP_NAME,
    },
    sameAs: [
      SOCIAL_LINKS.instagram,
      SOCIAL_LINKS.threads,
      SOCIAL_LINKS.youtube,
      DEFAULT_IOS_STORE_URL,
      DEFAULT_ANDROID_STORE_URL,
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: SITE.email,
        availableLanguage: allLocaleTags(),
      },
      {
        "@type": "ContactPoint",
        contactType: "sales",
        email: SITE.partnerEmail,
        availableLanguage: ["vi-VN", "en-US"],
      },
    ],
  };

  const software: JsonLd = {
    "@context": "https://schema.org",
    "@type": ["SoftwareApplication", "MobileApplication"],
    name: APP_NAME,
    applicationCategory: "MultimediaApplication",
    applicationSubCategory: "Video Editing",
    operatingSystem: "iOS, Android",
    softwareVersion: DISPLAY_APP_VERSION,
    description,
    url: pageUrl,
    image: logoUrl,
    downloadUrl: [DEFAULT_IOS_STORE_URL, DEFAULT_ANDROID_STORE_URL],
    installUrl: DEFAULT_IOS_STORE_URL,
    sameAs: [DEFAULT_IOS_STORE_URL, DEFAULT_ANDROID_STORE_URL],
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/OnlineOnly",
    },
    author: {
      "@type": "Organization",
      name: SITE.copyrightHolder,
      email: SITE.email,
    },
    publisher: {
      "@type": "Organization",
      name: SITE.copyrightHolder,
    },
    inLanguage: allLocaleTags(),
    ...(extras.features?.length ? { featureList: extras.features } : {}),
  };

  const website: JsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: APP_NAME,
    url: siteUrl,
    inLanguage: allLocaleTags(),
    publisher: {
      "@type": "Organization",
      name: SITE.copyrightHolder,
    },
  };

  const webpage: JsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: APP_NAME,
    description,
    url: pageUrl,
    isPartOf: {
      "@type": "WebSite",
      name: APP_NAME,
      url: siteUrl,
    },
    about: {
      "@type": "SoftwareApplication",
      name: APP_NAME,
    },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: absoluteUrl("/og.png"),
    },
    inLanguage: pageLanguage,
  };

  const results: JsonLd[] = [organization, software, website, webpage];

  if (extras.steps && extras.steps.length > 0) {
    results.push({
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: extras.howToName || APP_NAME,
      description,
      inLanguage: pageLanguage,
      tool: {
        "@type": "SoftwareApplication",
        name: APP_NAME,
      },
      step: extras.steps.map((step, idx) => ({
        "@type": "HowToStep",
        position: idx + 1,
        name: step.name,
        text: step.text,
        url: `${pageUrl}#how-it-works`,
      })),
    });
  }

  if (faqItems && faqItems.length > 0) {
    const faqPage: JsonLd = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      inLanguage: pageLanguage,
      mainEntity: faqItems.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    };
    results.push(faqPage);
  }

  return results;
}
