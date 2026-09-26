import { ChevronRight } from "lucide-react";

import { Link } from "@/i18n/navigation";

/** Visible breadcrumb; the matching BreadcrumbList JSON-LD lives in the page. */
export function BreadcrumbTrail({
  homeLabel,
  current,
}: {
  homeLabel: string;
  current: string;
}) {
  return (
    <nav aria-label={current} className="mb-6">
      <ol className="flex flex-wrap items-center gap-1.5 text-xs text-[#4A5C53]">
        <li>
          <Link href="/" className="transition-colors hover:text-brand">
            {homeLabel}
          </Link>
        </li>
        <li aria-hidden className="flex items-center">
          <ChevronRight className="size-3.5" />
        </li>
        <li className="font-medium text-[#1F2E27]" aria-current="page">
          {current}
        </li>
      </ol>
    </nav>
  );
}
