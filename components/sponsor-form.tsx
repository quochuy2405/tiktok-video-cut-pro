"use client";

import { Send } from "lucide-react";
import { useState } from "react";

import { buttonVariants } from "@/components/ui/button";
import {
  trackCtaClick,
  trackLeadGeneration,
  type CtaLocation,
} from "@/lib/analytics";
import { cn } from "@/lib/utils";
import type { SponsorFormCopy } from "@/types/sponsor";

/** Brand partnership lead form — shared by the home page and /brands. */
export function SponsorForm({
  copy,
  location = "sponsor_section",
  id,
}: {
  copy: SponsorFormCopy;
  location?: CtaLocation;
  id?: string;
}) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    brandName: "",
    contactName: "",
    email: "",
    phone: "",
    budget: "",
    note: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    trackLeadGeneration({
      lead_type: "brand_sponsor",
      brand_name: formData.brandName,
      budget_tier: formData.budget,
    });
    trackCtaClick({
      cta_id: "sponsor_form_submit",
      cta_location: location,
      cta_text: copy.submitButton,
      cta_category: "lead_sponsor",
      brand_name: formData.brandName,
      budget: formData.budget,
    });
    setLoading(true);
    try {
      await fetch("/api/sponsor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
    } catch (err) {
      console.error("[Sponsor Form Error]:", err);
    } finally {
      setLoading(false);
      setSubmitted(true);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-[#B9CFC3] bg-white px-4 py-2.5 text-sm text-[#0F1A15] placeholder:text-[#4A5C53] focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand";

  return (
    <div id={id} className="scroll-mt-[72px] rounded-[24px] surface-card p-6 sm:p-8">
      <h3 className="font-heading text-xl font-semibold text-[#0F1A15]">
        {copy.title}
      </h3>
      <p className="mt-2 text-sm text-[#4A5C53]">{copy.desc}</p>

      {submitted ? (
        <div className="mt-8 rounded-2xl border border-brand/30 bg-brand/10 p-6 text-sm font-medium text-brand-forest">
          {copy.successMessage}
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block space-y-1.5 text-sm">
              <span className="font-medium text-[#1F2E27]">
                {copy.brandNameLabel} *
              </span>
              <input
                required
                value={formData.brandName}
                onChange={(e) =>
                  setFormData((s) => ({ ...s, brandName: e.target.value }))
                }
                placeholder={copy.brandNamePlaceholder}
                className={inputClass}
              />
            </label>
            <label className="block space-y-1.5 text-sm">
              <span className="font-medium text-[#1F2E27]">
                {copy.contactNameLabel} *
              </span>
              <input
                required
                value={formData.contactName}
                onChange={(e) =>
                  setFormData((s) => ({ ...s, contactName: e.target.value }))
                }
                placeholder={copy.contactNamePlaceholder}
                className={inputClass}
              />
            </label>
            <label className="block space-y-1.5 text-sm">
              <span className="font-medium text-[#1F2E27]">
                {copy.emailLabel} *
              </span>
              <input
                required
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData((s) => ({ ...s, email: e.target.value }))
                }
                placeholder={copy.emailPlaceholder}
                className={inputClass}
              />
            </label>
            <label className="block space-y-1.5 text-sm">
              <span className="font-medium text-[#1F2E27]">
                {copy.phoneLabel} *
              </span>
              <input
                required
                value={formData.phone}
                onChange={(e) =>
                  setFormData((s) => ({ ...s, phone: e.target.value }))
                }
                placeholder={copy.phonePlaceholder}
                className={inputClass}
              />
            </label>
          </div>
          <label className="block space-y-1.5 text-sm">
            <span className="font-medium text-[#1F2E27]">{copy.budgetLabel}</span>
            <select
              value={formData.budget}
              onChange={(e) =>
                setFormData((s) => ({ ...s, budget: e.target.value }))
              }
              className={inputClass}
            >
              <option value="">—</option>
              {copy.budgetOptions?.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </label>
          <label className="block space-y-1.5 text-sm">
            <span className="font-medium text-[#1F2E27]">{copy.noteLabel}</span>
            <textarea
              rows={3}
              value={formData.note}
              onChange={(e) =>
                setFormData((s) => ({ ...s, note: e.target.value }))
              }
              placeholder={copy.notePlaceholder}
              className={cn(inputClass, "resize-none")}
            />
          </label>
          <button
            type="submit"
            disabled={loading}
            className={cn(
              buttonVariants({ variant: "default", size: "lg" }),
              "w-full rounded-xl border-0 bg-brand py-3 text-sm font-semibold text-[#052E1C] glow-brand-sm transition-all hover:bg-brand hover:glow-brand-lg",
              loading && "cursor-not-allowed opacity-75",
            )}
          >
            <Send className="mr-2 size-4" />
            {loading ? "…" : copy.submitButton}
          </button>
        </form>
      )}
    </div>
  );
}
