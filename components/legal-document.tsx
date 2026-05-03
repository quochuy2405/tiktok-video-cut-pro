import type { LegalDocument } from "@/types/legal";

export function LegalDocumentView({ doc }: { doc: LegalDocument }) {
  return (
    <article className="mx-auto max-w-[720px] px-6 py-14 md:py-20 lg:px-8">
      <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.65px] text-brand">
        {doc.categoryLabel}
      </p>
      <h1 className="font-heading mt-3 text-[2rem] font-semibold tracking-[-0.85px] text-white md:text-[2.5rem]">
        {doc.title}
      </h1>
      <p className="mt-3 text-sm text-zinc-400">
        {doc.updatedLabel}: {doc.updatedDate}
      </p>

      <div className="glass-panel mt-8 rounded-2xl px-5 py-4 text-sm leading-relaxed text-zinc-400">
        {doc.lawyerNotice}
      </div>

      <div className="mt-12 space-y-10 text-base leading-relaxed text-zinc-400">
        {doc.sections.map((section, idx) => (
          <section key={`${section.title}-${idx}`} className="space-y-3">
            <h2 className="font-heading text-xl font-semibold tracking-[-0.2px] text-white">
              {section.title}
            </h2>
            {section.paragraphs?.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
            {section.bullets?.length ? (
              <ul className="list-disc space-y-2 pl-6 marker:text-brand">
                {section.bullets.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : null}
          </section>
        ))}
      </div>
    </article>
  );
}
