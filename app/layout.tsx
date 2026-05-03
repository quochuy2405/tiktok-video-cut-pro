import "./globals.css";

/** Root pass-through; `<html>` / `<body>` live in `app/[locale]/layout.tsx` (next-intl). */
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
