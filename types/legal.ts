export type LegalSection = {
  title: string;
  paragraphs?: string[];
  bullets?: string[];
  /** Optional paragraphs rendered after the bullet list. */
  paragraphsAfterBullets?: string[];
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
