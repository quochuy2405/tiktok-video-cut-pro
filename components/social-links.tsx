import React from "react";
import { SOCIAL_LINKS } from "@/lib/site";
import { cn } from "@/lib/utils";

export function ThreadsIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 192 192"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M141.537 88.9883C140.71 88.5919 139.87 88.2109 139.019 87.8451C137.537 60.5382 122.616 44.905 97.5619 44.745C97.4484 44.7443 97.3355 44.7443 97.222 44.745C77.5635 44.745 61.7619 56.5746 56.4022 75.3124C53.7745 84.4984 52.887 94.6186 53.7667 105.352C54.7176 116.953 58.0772 127.322 63.7844 136.262C72.7848 150.363 86.8617 158.204 104.343 158.204C120.316 158.204 133.518 151.785 141.974 140.038C147.288 132.656 150.781 123.011 152.091 112.128C152.88 105.571 153.279 98.7107 153.279 91.6881C153.279 90.7824 153.273 89.8804 153.261 88.9822L141.537 88.9883ZM103.58 143.722C90.728 143.722 80.3197 137.608 73.5762 126.311C69.0494 118.729 66.2559 109.866 65.2598 99.8824C64.4988 92.2575 65.0416 84.7335 66.8778 77.4589C70.6698 62.4344 82.2033 58.745 97.222 58.745C114.732 58.745 124.966 69.2152 126.155 89.9234C119.861 87.7719 112.875 86.5363 105.297 86.5363C79.8631 86.5363 67.5755 99.5593 67.5755 117.511C67.5755 131.781 77.2917 141.545 92.2077 141.545C104.288 141.545 113.887 136.002 119.897 125.59C123.633 119.117 125.688 111.082 126.062 101.488C130.686 104.305 134.42 108.066 137.078 112.569C139.736 117.071 140.941 122.568 139.771 128.513C137.151 141.83 123.829 143.722 103.58 143.722Z" />
    </svg>
  );
}

export function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export function YoutubeIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

export const SOCIAL_ITEMS = [
  {
    name: "Threads",
    href: SOCIAL_LINKS.threads,
    handle: "@fivecutpro",
    Icon: ThreadsIcon,
    hoverColor: "hover:text-white hover:border-white/40 hover:bg-white/[0.08]",
  },
  {
    name: "Instagram",
    href: SOCIAL_LINKS.instagram,
    handle: "@fivecutpro",
    Icon: InstagramIcon,
    hoverColor: "hover:text-pink-400 hover:border-pink-500/40 hover:bg-pink-500/[0.08]",
  },
  {
    name: "YouTube",
    href: SOCIAL_LINKS.youtube,
    handle: "@fivecutpro",
    Icon: YoutubeIcon,
    hoverColor: "hover:text-red-400 hover:border-red-500/40 hover:bg-red-500/[0.08]",
  },
] as const;

interface SocialLinksProps {
  className?: string;
  variant?: "header" | "footer" | "banner";
  showLabel?: boolean;
}

export function SocialLinks({
  className,
  variant = "footer",
  showLabel = false,
}: SocialLinksProps) {
  if (variant === "header") {
    return (
      <div className={cn("flex items-center gap-1.5", className)}>
        {SOCIAL_ITEMS.map(({ name, href, Icon, hoverColor }) => (
          <a
            key={name}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            title={`${name} (@fivecutpro)`}
            aria-label={`Theo dõi Five Cut Pro trên ${name}`}
            className={cn(
              "flex size-8 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-zinc-400 transition-all duration-200",
              hoverColor,
            )}
          >
            <Icon className="size-4" />
          </a>
        ))}
      </div>
    );
  }

  return (
    <div className={cn("flex flex-wrap items-center gap-2.5", className)}>
      {SOCIAL_ITEMS.map(({ name, href, handle, Icon, hoverColor }) => (
        <a
          key={name}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          title={`${name} ${handle}`}
          aria-label={`Theo dõi Five Cut Pro trên ${name}`}
          className={cn(
            "group inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-xs font-medium text-zinc-300 transition-all duration-200",
            hoverColor,
          )}
        >
          <Icon className="size-4 text-zinc-400 transition-colors group-hover:text-inherit" />
          {showLabel ? (
            <span className="font-medium text-zinc-300 transition-colors group-hover:text-inherit">
              {name}
            </span>
          ) : null}
        </a>
      ))}
    </div>
  );
}
