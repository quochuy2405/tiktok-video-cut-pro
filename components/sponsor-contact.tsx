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
    <div className="mt-8 space-y-3 border-t border-[#B9CFC3] pt-6">
      <p className="text-xs font-medium text-[#4A5C53]">{copy.directContact}</p>
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
        className="flex items-center gap-2 text-sm font-semibold text-brand hover:underline"
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
        className="flex items-center gap-2 text-sm font-semibold text-brand hover:underline"
      >
        <Phone className="size-4" />
        <span>
          {copy.zaloLabel}: {copy.zaloText}
        </span>
      </a>
      <p className="text-xs text-[#4A5C53]">
        {copy.contactPersonLabel}: {copy.contactPersonName}
      </p>
    </div>
  );
}
