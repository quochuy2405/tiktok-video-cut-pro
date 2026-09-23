import type { LegalDocument } from "@/types/legal";

export function LegalDocumentView({ doc }: { doc: LegalDocument }) {
  return (
    <article className="mx-auto max-w-[720px] px-6 py-14 md:py-20 lg:px-8">
      <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.65px] text-brand-deep">
        {doc.categoryLabel}
      </p>
      <h1 className="font-heading mt-3 text-[2rem] font-semibold tracking-[-0.85px] text-[#0F1A15] md:text-[2.5rem]">
        {doc.title}
      </h1>
      <p className="mt-3 text-sm text-[#4A5C53]">
        {doc.updatedLabel}: {doc.updatedDate}
      </p>

      <div className="mt-8 rounded-2xl border border-[#D8E5DD] bg-white px-5 py-4 text-sm leading-relaxed text-[#1F2E27] shadow-sm">
        {doc.lawyerNotice}
      </div>

      <div className="mt-12 space-y-10 text-base leading-relaxed text-[#1F2E27]">
        {doc.sections.map((section, idx) => (
          <section key={`${section.title}-${idx}`} className="space-y-3">
            <h2 className="font-heading text-xl font-semibold tracking-[-0.2px] text-[#0F1A15]">
              {section.title}
            </h2>
            {section.paragraphs?.map((p, i) => (
              <p key={i} className="text-[#1F2E27]">
                {p}
              </p>
            ))}
            {section.bullets?.length ? (
              <ul className="list-disc space-y-2 pl-6 text-[#1F2E27] marker:text-brand-deep">
                {section.bullets.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : null}
            {section.paragraphsAfterBullets?.map((p, i) => (
              <p key={`after-${i}`} className="text-[#1F2E27]">
                {p}
              </p>
            ))}
          </section>
        ))}
      </div>
    </article>
  );
}
