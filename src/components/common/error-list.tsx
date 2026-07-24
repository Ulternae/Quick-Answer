"use client";

import { useTranslations } from "next-intl";

import type { ErrorView } from "@/lib/forms/format-zod-error";

interface ErrorListProps {
  errors: ErrorView;
  id?: string;
}

export function ErrorList({ errors, id }: ErrorListProps) {
  const tCommon = useTranslations("common");
  const tError = useTranslations("error");

  if (errors.length === 0) {
    return null;
  }

  return (
    <section className="mt-4 text-sm flex flex-col gap-2" id={id} role="alert">
      {errors.map(({ field, message }, index) => {
        const fieldKey = `fields.${field}`;
        const fieldLabel = tCommon.has(fieldKey) ? tCommon(fieldKey) : field;
        const errorMessage = tError.has(message) ? tError(message) : message;

        return (
          <div
            className="p-2 border-destructive/20 border bg-destructive/5 text-xs rounded-lg text-destructive/80"
            key={`${field}-${message}-${index}`}
          >
            <span className="font-medium text-destructive">{fieldLabel}:</span> {errorMessage}
          </div>
        );
      })}
    </section>
  );
}
