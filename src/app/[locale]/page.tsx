import { getTranslations } from "next-intl/server";

export default async function HomePage() {
  const t = await getTranslations("common");

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-2 p-6">
      <h1 className="text-3xl font-semibold">{t("appName")}</h1>
      <p className="text-muted-foreground">{t("translationCheck")}</p>
    </main>
  );
}
