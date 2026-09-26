"use client";

import { Check, Download, HelpCircle, Scale, X } from "lucide-react";
import { useTranslations } from "next-intl";

import { BreadcrumbTrail } from "@/components/breadcrumb-trail";
import { FadeIn } from "@/components/fade-in";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { trackCtaClick } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import type { ComparePageCopy } from "@/types/pages";

export function ComparePage() {
  const t = useTranslations("Landing");
  const tNav = useTranslations("Nav");
  const page = t.raw("comparePage") as ComparePageCopy;

  return (
    <>
      <section className="section-band-mint border-b border-[#B9CFC3] px-4 pb-14 pt-24 sm:px-6 md:pb-16 md:pt-28 lg:px-8">
        <div className="mx-auto min-w-0 max-w-[980px]">
          <BreadcrumbTrail homeLabel={tNav("home")} current={page.breadcrumb} />

          <FadeIn className="max-w-3xl">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-brand/30 bg-brand/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-brand">
              <Scale className="size-3.5" />
              <span>{page.heroLabel}</span>
            </div>
            <h1 className="font-heading mt-5 text-[2.1rem] font-semibold leading-[1.12] tracking-[-1px] text-[#0F1A15] md:text-[2.9rem]">
              {page.heroTitle}
            </h1>
            <p className="mt-5 text-base leading-relaxed text-[#4A5C53] md:text-lg">
              {page.heroSubtitle}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Comparison table */}
      <section className="border-b border-[#B9CFC3] px-4 py-16 sm:px-6 md:py-20 lg:px-8">
        <div className="mx-auto min-w-0 max-w-[980px]">
          <FadeIn>
            <h2 className="font-heading text-[1.85rem] font-semibold tracking-[-0.7px] text-[#0F1A15] md:text-[2.3rem]">
              {page.tableTitle}
            </h2>
          </FadeIn>

          <FadeIn delay={0.06} className="mt-8 block">
            <div className="overflow-x-auto rounded-[22px] border border-[#B9CFC3] bg-white">
              <table className="w-full min-w-[640px] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#D8E5DD] bg-[#EEF5F1]">
                    <th scope="col" className="px-5 py-4 font-semibold text-[#1F2E27]">
                      {page.columnFeature}
                    </th>
                    <th scope="col" className="px-5 py-4 font-semibold text-brand-deep">
                      {page.columnOurs}
                    </th>
                    <th scope="col" className="px-5 py-4 font-semibold text-[#4A5C53]">
                      {page.columnOther}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {page.rows?.map((row) => (
                    <tr key={row.feature} className="border-b border-[#E7EFEA] last:border-0">
                      <th
                        scope="row"
                        className="px-5 py-4 align-top font-medium text-[#1F2E27]"
                      >
                        {row.feature}
                      </th>
                      <td className="px-5 py-4 align-top text-[#1F2E27]">
                        <span className="flex items-start gap-2">
                          <Check className="mt-0.5 size-4 shrink-0 text-brand" strokeWidth={3} />
                          <span>{row.ours}</span>
                        </span>
                      </td>
                      <td className="px-5 py-4 align-top text-[#4A5C53]">{row.other}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Which one to use */}
      <section className="section-band-wash border-b border-[#B9CFC3] px-4 py-16 sm:px-6 md:py-20 lg:px-8">
        <div className="mx-auto min-w-0 max-w-[980px]">
          <FadeIn>
            <h2 className="font-heading text-[1.85rem] font-semibold tracking-[-0.7px] text-[#0F1A15] md:text-[2.3rem]">
              {page.whenTitle}
            </h2>
          </FadeIn>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <FadeIn className="flex">
              <div className="flex w-full flex-col rounded-[24px] border border-brand/40 bg-gradient-to-b from-brand/[0.12] via-brand/[0.04] to-transparent p-7">
                <h3 className="font-heading text-lg font-semibold text-[#0F1A15]">
                  {page.whenOurs.title}
                </h3>
                <ul className="mt-5 space-y-3">
                  {page.whenOurs.points?.map((point) => (
                    <li key={point} className="flex items-start gap-2.5 text-sm text-[#1F2E27]">
                      <Check className="mt-0.5 size-4 shrink-0 text-brand" strokeWidth={3} />
                      <span className="leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>

            <FadeIn delay={0.08} className="flex">
              <div className="glass-panel flex w-full flex-col rounded-[24px] border border-[#B9CFC3] p-7">
                <h3 className="font-heading text-lg font-semibold text-[#0F1A15]">
                  {page.whenOther.title}
                </h3>
                <ul className="mt-5 space-y-3">
                  {page.whenOther.points?.map((point) => (
                    <li key={point} className="flex items-start gap-2.5 text-sm text-[#4A5C53]">
                      <X className="mt-0.5 size-4 shrink-0 text-[#4A5C53]" />
                      <span className="leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={0.12}>
            <p className="mt-8 rounded-2xl border border-[#D8E5DD] bg-white px-6 py-5 text-sm leading-relaxed text-[#1F2E27]">
              {page.honestNote}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-4 py-16 sm:px-6 md:py-20 lg:px-8">
        <div className="mx-auto min-w-0 max-w-[860px]">
          <FadeIn className="text-center">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-brand/30 bg-brand/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-brand">
              <HelpCircle className="size-3.5" />
              <span>{page.faqTitle}</span>
            </div>
          </FadeIn>

          <div className="mt-10 space-y-5">
            {page.faq?.map((item, idx) => (
              <FadeIn key={item.id} delay={idx * 0.04}>
                <div className="rounded-2xl surface-card p-6">
                  <h3 className="font-heading text-base font-semibold text-[#0F1A15] sm:text-lg">
                    {item.question}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#1F2E27]">
                    {item.answer}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn className="mt-12 text-center">
            <h2 className="font-heading text-xl font-semibold text-[#0F1A15] sm:text-2xl">
              {page.ctaTitle}
            </h2>
            <Link
              href="/#download"
              onClick={() => {
                trackCtaClick({
                  cta_id: "compare_download",
                  cta_location: "compare_page",
                  cta_text: page.ctaButton,
                  cta_category: "conversion_download",
                  destination_url: "/#download",
                });
              }}
              className={cn(
                buttonVariants({ variant: "default", size: "lg" }),
                "mt-6 rounded-full border-0 bg-brand px-8 py-3.5 text-[15px] font-semibold text-[#052E1C] glow-brand-sm transition-transform hover:-translate-y-0.5 hover:bg-brand",
              )}
            >
              <Download className="mr-2 size-4" />
              {page.ctaButton}
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
