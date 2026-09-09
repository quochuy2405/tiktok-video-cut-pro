import React from "react";
import { cn } from "@/lib/utils";

interface PlatformIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  title?: string;
}

/**
 * Official Apple logo SVG vector
 */
export function AppleIcon({ className, title = "Apple", ...props }: PlatformIconProps) {
  return (
    <svg
      viewBox="0 0 170 170"
      fill="currentColor"
      className={cn("shrink-0", className)}
      role="img"
      aria-label={title}
      {...props}
    >
      {title ? <title>{title}</title> : null}
      <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.74 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.04-7.6-7.85-11.71-14.42-6.1-9.78-10.88-21.2-14.34-34.25-3.46-13.06-5.19-25.04-5.19-35.94 0-14.35 3.37-26.31 10.12-35.88 6.75-9.57 15.34-14.46 25.77-14.67 4.9 0 10.39 1.34 16.48 4.02 6.09 2.68 10.12 4.08 12.09 4.2 1.74 0 5.8-1.4 12.19-4.2 6.39-2.8 11.83-4.08 16.32-3.85 9.14.43 16.92 3.8 23.33 10.12 6.42 6.31 10.88 13.92 13.38 22.83-8.05 4.9-12.24 11.75-12.56 20.55-.33 8.16 3.12 15.23 10.35 21.21 4.35 3.59 9.36 6.09 15.02 7.51-1.31 4.13-2.94 8.6-4.9 13.41zm-28.74-106.63c0 6.09-2.24 11.86-6.72 17.3-4.48 5.44-9.87 8.92-16.17 10.44-.22-.87-.33-1.63-.33-2.29 0-5.88 2.37-11.64 7.1-17.29 4.73-5.66 10.45-9.03 17.15-10.12.33 1.09.49 1.96.49 2.62z" />
    </svg>
  );
}

/**
 * Official Microsoft Windows 4-pane logo SVG vector
 */
export function WindowsIcon({ className, title = "Microsoft Windows", ...props }: PlatformIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={cn("shrink-0", className)}
      role="img"
      aria-label={title}
      {...props}
    >
      {title ? <title>{title}</title> : null}
      <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801" />
    </svg>
  );
}

/**
 * Official Android Robot logo SVG vector
 */
export function AndroidIcon({ className, title = "Android", ...props }: PlatformIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={cn("shrink-0", className)}
      role="img"
      aria-label={title}
      {...props}
    >
      {title ? <title>{title}</title> : null}
      <path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.551 0 .9993.4482.9993.9993.0001.5511-.4483.9997-.9993.9997m-11.046 0c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993 0 .5511-.4482.9997-.9993.9997m11.4045-6.02l1.9973-3.4592a.416.416 0 00-.1521-.5676.416.416 0 00-.5676.1521l-2.0223 3.503C15.5902 8.4116 13.8533 8.1 12 8.1s-3.5902.3116-5.1368.8497L4.8409 5.4467a.4161.4161 0 00-.5677-.1521.4157.4157 0 00-.1521.5676l1.9973 3.4592C2.6889 11.1867.3432 14.6589 0 18.761h24c-.3432-4.1021-2.6889-7.5743-6.1185-9.4396" />
    </svg>
  );
}

/**
 * Official Google Play triangle logo SVG vector with authentic brand colors
 */
export function GooglePlayIcon({ className, title = "Google Play", ...props }: PlatformIconProps) {
  return (
    <svg
      viewBox="0 0 466 512"
      className={cn("shrink-0", className)}
      role="img"
      aria-label={title}
      {...props}
    >
      {title ? <title>{title}</title> : null}
      <g fillRule="nonzero">
        <path
          fill="#EA4335"
          d="M199.9 237.8 1.4 470.17c7.22 24.57 30.16 41.81 55.8 41.81 11.16 0 20.93-2.79 29.3-8.37l244.16-139.46L199.9 237.8z"
        />
        <path
          fill="#FBBC04"
          d="m433.91 205.1-104.65-60-111.61 110.22 113.01 108.83 104.64-58.6c18.14-9.77 30.7-29.3 30.7-50.23-1.4-20.93-13.95-40.46-32.09-50.22z"
        />
        <path
          fill="#34A853"
          d="M199.42 273.45 329.27 145.1 87.9 8.37C79.53 2.79 68.36 0 57.2 0 30.7 0 6.98 18.14 1.4 41.86l198.02 231.59z"
        />
        <path
          fill="#4285F4"
          d="M1.39 41.86C0 46.04 0 51.63 0 57.2v397.64c0 5.57 0 9.76 1.4 15.34l216.27-214.86L1.39 41.86z"
        />
      </g>
    </svg>
  );
}

/**
 * Official Google 4-Color 'G' logo SVG vector
 */
export function GoogleIcon({ className, title = "Google", ...props }: PlatformIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn("shrink-0", className)}
      role="img"
      aria-label={title}
      {...props}
    >
      {title ? <title>{title}</title> : null}
      <path
        fill="#4285F4"
        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.14-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.04 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
      />
    </svg>
  );
}
