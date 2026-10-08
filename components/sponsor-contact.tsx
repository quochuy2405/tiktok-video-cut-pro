"use client";

import { Mail, Phone } from "lucide-react";

import {
  trackCtaClick,
  trackDirectContact,
  type CtaLocation,
} from "@/lib/analytics";
import { gmailComposeUrl } from "@/lib/site";
import type { SponsorFormCopy } from "@/types/sponsor";

/** Direct partnership contacts: partner inbox, Zalo line, owner. */
export function SponsorContact({
  copy,
  location = "sponsor_section",
}: {
  copy: SponsorFormCopy;
  location?: CtaLocation;
}) {
  return (
    <div className="mt-8 space-y-3 border-t border-white/10 pt-6">
      <p className="text-xs font-medium text-slate-400">{copy.directContact}</p>
      <a
        href={gmailComposeUrl(copy.emailText)}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => {
          trackDirectContact({ method: "email", target: copy.emailText });
          trackCtaClick({
            cta_id: "sponsor_email_direct",
            cta_location: location,
            cta_text: copy.emailText,
            cta_category: "lead_sponsor",
            destination_url: gmailComposeUrl(copy.emailText),
          });
        }}
        aria-label={copy.emailAria}
        className="flex items-center gap-2 text-sm font-semibold text-brand hover:text-emerald-300 transition-colors"
      >
        <Mail className="size-4" />
        <span>{copy.emailText}</span>
      </a>
      <a
        href={copy.zaloHref}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => {
          trackDirectContact({ method: "phone", target: copy.zaloText });
          trackCtaClick({
            cta_id: "sponsor_zalo_direct",
            cta_location: location,
            cta_text: copy.zaloText,
            cta_category: "lead_sponsor",
            destination_url: copy.zaloHref,
          });
        }}
        className="flex items-center gap-2 text-sm font-semibold text-brand hover:text-emerald-300 transition-colors"
      >
        <Phone className="size-4" />
        <span>
          {copy.zaloLabel}: {copy.zaloText}
        </span>
      </a>
      <p className="text-xs text-slate-400">
        {copy.contactPersonLabel}: {copy.contactPersonName}
      </p>
    </div>
  );
}
