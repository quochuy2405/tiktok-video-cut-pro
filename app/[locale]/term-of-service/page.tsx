import { redirect } from "next/navigation";

export default async function TermOfServiceRedirect({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  redirect(`/${locale}/terms-of-service`);
}
