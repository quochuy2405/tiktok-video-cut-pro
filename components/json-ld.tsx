import { APP_NAME } from "@/lib/brand";
import { absoluteUrl, SITE } from "@/lib/site";

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

export function buildHomeJsonLd(
  locale: string,
  description: string,
  faqItems?: Array<{ question: string; answer: string }>,
): JsonLd[] {
  const pageUrl = absoluteUrl(`/${locale}`);
  const logoUrl = absoluteUrl("/logo.png");

  const organization: JsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.copyrightHolder,
    email: SITE.email,
    url: absoluteUrl(`/${SITE.defaultLocale}`),
    logo: logoUrl,
    brand: {
      "@type": "Brand",
      name: APP_NAME,
    },
  };

  const software: JsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: APP_NAME,
    applicationCategory: "MultimediaApplication",
    operatingSystem: "iOS, Android, macOS, Windows",
    description,
    url: pageUrl,
    image: logoUrl,
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
    inLanguage: locale === "vi" ? "vi-VN" : "en-US",
  };

  const website: JsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: APP_NAME,
    url: absoluteUrl(`/${SITE.defaultLocale}`),
    inLanguage: ["vi-VN", "en-US"],
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
      url: absoluteUrl(`/${SITE.defaultLocale}`),
    },
    about: {
      "@type": "SoftwareApplication",
      name: APP_NAME,
    },
    inLanguage: locale === "vi" ? "vi-VN" : "en-US",
  };

  const results: JsonLd[] = [organization, software, website, webpage];

  if (faqItems && faqItems.length > 0) {
    const faqPage: JsonLd = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
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
