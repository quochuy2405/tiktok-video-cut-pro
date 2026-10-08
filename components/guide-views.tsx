import { ArrowRight, BookOpen, Clock, Download } from "lucide-react";

import { BreadcrumbTrail } from "@/components/breadcrumb-trail";
import { FadeIn } from "@/components/fade-in";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import type { GuideArticle, GuideIndexCopy } from "@/lib/guides";
import { GUIDES_PATH } from "@/lib/guides";
import { cn } from "@/lib/utils";

function GuideCta({ copy }: { copy: GuideIndexCopy }) {
  return (
    <div className="rounded-[26px] border border-brand/35 bg-gradient-to-b from-brand/[0.14] via-brand/[0.04] to-transparent p-7 text-center shadow-[0_18px_45px_-15px_rgba(0,0,0,0.85),0_0_25px_rgba(0,245,160,0.1)] sm:p-9">
      <h2 className="font-heading text-xl font-semibold text-white sm:text-2xl">
        {copy.ctaTitle}
      </h2>
      <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-[#cde0d6]">
        {copy.ctaSubtitle}
      </p>
      <Link
        href="/#download"
        className={cn(
          buttonVariants({ variant: "default", size: "lg" }),
          "mt-6 rounded-full border-0 bg-gradient-to-r from-brand via-[#00DF9E] to-brand-deep px-8 py-3.5 text-[15px] font-bold text-[#02180e] shadow-[0_0_28px_rgba(0,245,160,0.5)] transition-transform hover:-translate-y-0.5 hover:shadow-[0_0_40px_rgba(0,245,160,0.7)]",
        )}
      >
        <Download className="mr-2 size-4" />
        {copy.ctaButton}
      </Link>
    </div>
  );
}

export function GuideIndexView({
  copy,
  articles,
  homeLabel,
}: {
  copy: GuideIndexCopy;
  articles: GuideArticle[];
  homeLabel: string;
}) {
  return (
    <>
      <section className="section-band-mint border-b border-emerald-500/15 px-4 pb-14 pt-24 sm:px-6 md:pb-16 md:pt-28 lg:px-8">
        <div className="mx-auto min-w-0 max-w-[880px]">
          <BreadcrumbTrail homeLabel={homeLabel} current={copy.breadcrumb} />
          <FadeIn>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-brand/35 bg-brand/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-brand shadow-[0_0_15px_rgba(0,245,160,0.2)]">
              <BookOpen className="size-3.5" />
              <span>{copy.breadcrumb}</span>
            </div>
            <h1 className="font-heading mt-5 text-[2.1rem] font-semibold leading-[1.12] tracking-[-1px] text-white md:text-[2.9rem]">
              {copy.title}
            </h1>
            <p className="mt-5 text-base leading-relaxed text-[#9db7aa] md:text-lg">
              {copy.subtitle}
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6 md:py-16 lg:px-8">
        <div className="mx-auto min-w-0 max-w-[880px]">
          <div className="space-y-5">
            {articles.map((article, idx) => (
              <FadeIn key={article.slug} delay={idx * 0.05}>
                <article className="group rounded-[24px] surface-card border border-emerald-500/20 bg-gradient-to-br from-[#0c1812]/90 via-[#0a140f]/90 to-[#070e0a]/95 p-7 shadow-[0_14px_34px_-14px_rgba(0,0,0,0.85)] transition-all duration-300 hover:-translate-y-1 hover:border-brand/50 hover:shadow-[0_20px_45px_-14px_rgba(0,0,0,0.9),0_0_25px_rgba(0,245,160,0.2)]">
                  <div className="flex items-center gap-2 text-xs text-[#9db7aa]">
                    <Clock className="size-3.5 text-brand" />
                    <span>
                      {article.readingMinutes} {copy.readingSuffix}
                    </span>
                  </div>
                  <h2 className="font-heading mt-3 text-xl font-semibold text-white sm:text-2xl">
                    <Link
                      href={`/${GUIDES_PATH}/${article.slug}`}
                      className="transition-colors hover:text-brand"
                    >
                      {article.title}
                    </Link>
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-[#9db7aa]">
                    {article.excerpt}
                  </p>
                  <Link
                    href={`/${GUIDES_PATH}/${article.slug}`}
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-brand hover:underline"
                  >
                    {copy.readMore}
                    <ArrowRight className="size-4" />
                  </Link>
                </article>
              </FadeIn>
            ))}
          </div>

          <FadeIn className="mt-12 block">
            <GuideCta copy={copy} />
          </FadeIn>
        </div>
      </section>
    </>
  );
}

export function GuideArticleView({
  copy,
  article,
  related,
  homeLabel,
}: {
  copy: GuideIndexCopy;
  article: GuideArticle;
  related: GuideArticle[];
  homeLabel: string;
}) {
  return (
    <article className="px-4 pb-20 pt-24 sm:px-6 md:pt-28 lg:px-8">
      <div className="mx-auto min-w-0 max-w-[760px]">
        <BreadcrumbTrail homeLabel={homeLabel} current={copy.breadcrumb} />

        <header>
          <div className="flex flex-wrap items-center gap-3 text-xs text-[#9db7aa]">
            <span className="inline-flex items-center gap-1.5">
              <Clock className="size-3.5 text-brand" />
              {article.readingMinutes} {copy.readingSuffix}
            </span>
            <span aria-hidden>·</span>
            <span>
              {copy.updatedLabel} {article.datePublished}
            </span>
          </div>
          <h1 className="font-heading mt-4 text-[2rem] font-semibold leading-[1.15] tracking-[-0.9px] text-white md:text-[2.6rem]">
            {article.title}
          </h1>
        </header>

        {/* Table of contents */}
        <nav aria-label={copy.tocTitle} className="mt-8 rounded-2xl surface-card border border-emerald-500/20 bg-gradient-to-br from-[#0c1812]/90 via-[#0a140f]/90 to-[#070e0a]/95 p-5 shadow-[0_14px_34px_-14px_rgba(0,0,0,0.85)]">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#9db7aa]">
            {copy.tocTitle}
          </p>
          <ol className="mt-3 space-y-2 text-sm">
            {article.sections.map((section, idx) => (
              <li key={section.heading}>
                <a
                  href={`#section-${idx + 1}`}
                  className="text-[#cde0d6] transition-colors hover:text-brand"
                >
                  {section.heading}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="mt-10 space-y-5 text-base leading-relaxed text-[#cde0d6]">
          {article.intro.map((paragraph, idx) => (
            <p key={idx} className={idx === 0 ? "text-lg leading-relaxed text-white" : undefined}>
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mt-12 space-y-12">
          {article.sections.map((section, idx) => (
            <section key={section.heading} id={`section-${idx + 1}`} className="scroll-mt-[88px]">
              <h2 className="font-heading text-xl font-semibold tracking-[-0.2px] text-white sm:text-2xl">
                {section.heading}
              </h2>
              <div className="mt-4 space-y-4 text-base leading-relaxed text-[#cde0d6]">
                {section.paragraphs?.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
                {section.bullets?.length ? (
                  <ul className="list-disc space-y-2 pl-6 marker:text-brand">
                    {section.bullets.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : null}
                {section.paragraphsAfter?.map((paragraph, i) => (
                  <p key={`after-${i}`}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </div>

        {article.takeaway ? (
          <div className="mt-12 rounded-2xl border border-brand/35 bg-brand/10 p-6 shadow-[0_0_20px_rgba(0,245,160,0.15)]">
            <p className="text-xs font-semibold uppercase tracking-wider text-brand">
              {copy.takeawayTitle}
            </p>
            <p className="mt-2 text-base font-medium leading-relaxed text-white">
              {article.takeaway}
            </p>
          </div>
        ) : null}

        {article.faq?.length ? (
          <section className="mt-14">
            <h2 className="font-heading text-xl font-semibold text-white sm:text-2xl">
              {copy.faqTitle}
            </h2>
            <div className="mt-6 space-y-4">
              {article.faq.map((item) => (
                <div key={item.question} className="rounded-2xl surface-card border border-emerald-500/20 bg-gradient-to-br from-[#0c1812]/90 via-[#0a140f]/90 to-[#070e0a]/95 p-6 shadow-[0_14px_34px_-14px_rgba(0,0,0,0.85)]">
                  <h3 className="font-heading text-base font-semibold text-white">
                    {item.question}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-[#cde0d6]">
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        <div className="mt-14">
          <GuideCta copy={copy} />
        </div>

        {related.length > 0 ? (
          <section className="mt-14">
            <h2 className="font-heading text-lg font-semibold text-white">
              {copy.relatedTitle}
            </h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {related.map((item) => (
                <Link
                  key={item.slug}
                  href={`/${GUIDES_PATH}/${item.slug}`}
                  className="glass-panel block rounded-[20px] border border-emerald-500/20 bg-gradient-to-br from-[#0c1812]/90 via-[#0a140f]/90 to-[#070e0a]/95 p-5 shadow-[0_14px_34px_-14px_rgba(0,0,0,0.85)] transition-all hover:-translate-y-1 hover:border-brand/40 hover:shadow-[0_18px_40px_-14px_rgba(0,0,0,0.9),0_0_20px_rgba(0,245,160,0.15)]"
                >
                  <h3 className="font-heading text-base font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#9db7aa]">
                    {item.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </article>
  );
}
