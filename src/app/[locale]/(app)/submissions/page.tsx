import { getTranslations } from "next-intl/server";

export default async function SubmissionsPage() {
  const t = await getTranslations("submissions");

  return (
    <main className="flex min-h-[calc(100svh-4rem)] flex-col items-center justify-center gap-2 p-6">
      <h1 className="text-3xl font-semibold">{t("title")}</h1>
    </main>
  );
}
