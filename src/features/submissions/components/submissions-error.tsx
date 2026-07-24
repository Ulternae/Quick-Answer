"use client";

import { CircleAlertIcon } from "lucide-react";
import { useTranslations } from "next-intl";

import { ErrorList } from "@/components/common/error-list";
import type { ErrorView } from "@/lib/forms/format-zod-error";

interface SubmissionsErrorProps {
  errors: ErrorView;
}

function SubmissionsError({ errors }: SubmissionsErrorProps) {
  const t = useTranslations("submissions");

  return (
    <section className="rounded-xl border border-destructive/20 bg-destructive/5 p-4">
      <header className="flex items-center gap-2 text-destructive">
        <CircleAlertIcon aria-hidden="true" className="size-4" />
        <h2 className="text-sm font-medium">{t("errorTitle")}</h2>
      </header>
      <ErrorList errors={errors} />
    </section>
  );
}

export { SubmissionsError };
