export type FaqEntry = {
  id: string;
  question: string;
  answer: string;
};

export type BrandsPageCopy = {
  metaTitle: string;
  metaDescription: string;
  breadcrumb: string;
  heroLabel: string;
  heroTitle: string;
  heroSubtitle: string;
  heroCtaPrimary: string;
  heroCtaSecondary: string;
  whyTitle: string;
  why: Array<{ title: string; desc: string }>;
  faqTitle: string;
  faq: FaqEntry[];
  ctaTitle: string;
  ctaSubtitle: string;
};

export type ComparePageCopy = {
  metaTitle: string;
  metaDescription: string;
  breadcrumb: string;
  heroLabel: string;
  heroTitle: string;
  heroSubtitle: string;
  tableTitle: string;
  columnFeature: string;
  columnOurs: string;
  columnOther: string;
  rows: Array<{ feature: string; ours: string; other: string }>;
  whenTitle: string;
  whenOurs: { title: string; points: string[] };
  whenOther: { title: string; points: string[] };
  honestNote: string;
  faqTitle: string;
  faq: FaqEntry[];
  ctaTitle: string;
  ctaButton: string;
};
