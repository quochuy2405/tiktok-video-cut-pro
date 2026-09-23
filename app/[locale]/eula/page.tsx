import { redirect } from "next/navigation";

/** EULA is merged into the Privacy Policy; keep this route for old links. */
export default async function EulaRedirectPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  redirect(`/${locale}/privacy-policy`);
}
