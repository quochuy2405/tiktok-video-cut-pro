export type SponsorFormCopy = {
  title: string;
  desc: string;
  brandNameLabel: string;
  brandNamePlaceholder: string;
  contactNameLabel: string;
  contactNamePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  phoneLabel: string;
  phonePlaceholder: string;
  budgetLabel: string;
  budgetOptions: string[];
  noteLabel: string;
  notePlaceholder: string;
  submitButton: string;
  successMessage: string;
  directContact: string;
  emailAria: string;
  emailText: string;
  zaloLabel: string;
  zaloText: string;
  zaloHref: string;
  contactPersonLabel: string;
  contactPersonName: string;
};

export type SponsorInsightCopy = {
  badge: string;
  quote: string;
  body: string;
  providesLabel: string;
  provides: string[];
  anglesLabel: string;
  angles: string[];
};

export type SponsorPlacementGroup = {
  title: string;
  items: string[];
};

export type SponsorProcessStep = {
  num: string;
  title: string;
  desc: string;
};

export type SponsorStat = {
  value: string;
  label: string;
};

export type SponsorsSectionCopy = {
  label: string;
  title: string;
  subtitle: string;
  stats: SponsorStat[];
  insight: SponsorInsightCopy;
  placementsTitle: string;
  placementsSubtitle: string;
  placementGroups: SponsorPlacementGroup[];
  benefitsTitle: string;
  benefits: string[];
  processTitle: string;
  process: SponsorProcessStep[];
  processNote: string;
  offerBadge: string;
  offerText: string;
  form: SponsorFormCopy;
};
