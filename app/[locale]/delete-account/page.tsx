import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { DeleteAccountForm } from "@/components/delete-account-form";
import { Link } from "@/i18n/navigation";
import type { AppLocale } from "@/i18n/routing";
import { APP_NAME } from "@/lib/brand";
import {
  absoluteLocaleUrl,
  absoluteUrl,
  hreflangAlternates,
  llmAlternateTypes,
  OG_IMAGE,
  OG_VI,
  openGraphLocale,
} from "@/lib/site";

const PATH = "delete-account";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "DeleteAccount" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical: absoluteLocaleUrl(locale, PATH),
      languages: hreflangAlternates(PATH),
      types: llmAlternateTypes(),
    },
    openGraph: {
      title: t("metaTitle"),
      description: t("metaDescription"),
      url: absoluteLocaleUrl(locale, PATH),
      siteName: APP_NAME,
      locale: openGraphLocale(locale),
      type: "website",
      images: [
        {
          url: absoluteUrl(OG_IMAGE.path),
          secureUrl: absoluteUrl(OG_IMAGE.path),
          width: OG_IMAGE.width,
          height: OG_IMAGE.height,
          alt: OG_VI.imageAlt,
          type: OG_IMAGE.type,
        },
      ],
    },
    robots: { index: true, follow: true },
  };
}

export default async function DeleteAccountPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as AppLocale);
  const t = await getTranslations("DeleteAccount");

  return (
    <article className="mx-auto w-full max-w-[640px] px-6 py-14 md:py-20 lg:px-8">
      <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.65px] text-brand">
        {t("categoryLabel")}
      </p>
      <h1 className="font-heading mt-3 text-[2rem] font-semibold tracking-[-0.85px] text-[#0F1A15] md:text-[2.5rem]">
        {t("title")}
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-[#4A5C53]">{t("intro")}</p>

      <ul className="mt-6 list-disc space-y-2 pl-5 text-sm leading-relaxed text-[#1F2E27]">
        <li>{t("point1")}</li>
        <li>{t("point2")}</li>
        <li>{t("point3")}</li>
        <li>{t("point4")}</li>
      </ul>

      <div className="mt-10 rounded-[24px] border border-[#D8E5DD] bg-white p-6 shadow-sm sm:p-8">
        <h2 className="font-heading text-lg font-semibold text-[#0F1A15]">
          {t("formTitle")}
        </h2>
        <p className="mt-1 text-sm text-[#4A5C53]">{t("formDesc")}</p>
        <div className="mt-6">
          <DeleteAccountForm />
        </div>
      </div>

      <p className="mt-8 text-sm text-[#4A5C53]">
        {t("supportPrefix")}{" "}
        <a
          href="mailto:support@fivecutpro.com"
          className="font-medium text-brand-forest underline-offset-2 hover:underline"
        >
          support@fivecutpro.com
        </a>
        .{" "}
        <Link
          href="/privacy-policy"
          className="font-medium text-brand-forest underline-offset-2 hover:underline"
        >
          {t("privacyLink")}
        </Link>
      </p>
    </article>
  );
}
