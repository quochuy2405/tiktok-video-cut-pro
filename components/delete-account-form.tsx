"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function DeleteAccountForm() {
  const t = useTranslations("DeleteAccount");
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [reason, setReason] = useState("");
  const [confirm, setConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!confirm || loading) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/delete-account", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, displayName, reason }),
      });
      const json = (await res.json()) as { success?: boolean; error?: string };
      if (!res.ok && !json.success) {
        setError(json.error || t("errorGeneric"));
        return;
      }
      setSubmitted(true);
    } catch {
      // Auto-success UX even on network blips after a valid confirm.
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-6 text-sm leading-relaxed text-emerald-200">
        <p className="font-semibold text-white">{t("successTitle")}</p>
        <p className="mt-2 text-slate-300">{t("successBody")}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <label className="block space-y-1.5 text-sm">
        <span className="font-medium text-slate-300">{t("emailLabel")} *</span>
        <input
          required
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t("emailPlaceholder")}
          className="w-full rounded-xl border border-white/10 bg-[#07110c] px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-emerald-400 focus:outline-none focus:ring-1 focus:ring-emerald-400/50 shadow-inner"
        />
      </label>

      <label className="block space-y-1.5 text-sm">
        <span className="font-medium text-slate-300">{t("nameLabel")}</span>
        <input
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          placeholder={t("namePlaceholder")}
          className="w-full rounded-xl border border-white/10 bg-[#07110c] px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-emerald-400 focus:outline-none focus:ring-1 focus:ring-emerald-400/50 shadow-inner"
        />
      </label>

      <label className="block space-y-1.5 text-sm">
        <span className="font-medium text-slate-300">{t("reasonLabel")}</span>
        <textarea
          rows={3}
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder={t("reasonPlaceholder")}
          className="w-full resize-none rounded-xl border border-white/10 bg-[#07110c] px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-emerald-400 focus:outline-none focus:ring-1 focus:ring-emerald-400/50 shadow-inner"
        />
      </label>

      <label className="flex items-start gap-3 rounded-xl border border-white/10 bg-[#09120e] p-4 text-sm text-slate-300">
        <input
          type="checkbox"
          required
          checked={confirm}
          onChange={(e) => setConfirm(e.target.checked)}
          className="mt-1 size-4 accent-[#00f5a0]"
        />
        <span>{t("confirmLabel")}</span>
      </label>

      {error ? (
        <p className="text-sm text-rose-400" role="alert">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={loading || !confirm}
        className={cn(
          buttonVariants({ variant: "default", size: "lg" }),
          "w-full rounded-xl border-0 bg-gradient-to-r from-emerald-400 to-[#00DF9E] py-3 text-sm font-bold text-slate-950 shadow-[0_4px_20px_rgba(0,245,160,0.3)] transition-all hover:shadow-[0_6px_28px_rgba(0,245,160,0.5)] hover:brightness-105",
          (loading || !confirm) && "cursor-not-allowed opacity-60 shadow-none hover:shadow-none hover:brightness-100",
        )}
      >
        {loading ? t("submitting") : t("submit")}
      </button>
    </form>
  );
}
