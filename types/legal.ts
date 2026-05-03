export type LegalSection = {
  title: string;
  paragraphs?: string[];
  bullets?: string[];
};

export type LegalDocument = {
  categoryLabel: string;
  metaTitle: string;
  metaDescription: string;
  title: string;
  updatedLabel: string;
  updatedDate: string;
  lawyerNotice: string;
  sections: LegalSection[];
};
