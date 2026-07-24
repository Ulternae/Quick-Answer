import { getTranslations } from "next-intl/server";

async function SubmissionsHeader() {
  const t = await getTranslations("submissions");

  return (
    <header className="pb-6 border-b">
      <h1 className="text-2xl font-semibold leading-tight tracking-tight">{t("title")}</h1>
      <p className="text-sm text-muted-foreground leading-none">{t("description")}</p>
    </header>
  );
}

export { SubmissionsHeader };
