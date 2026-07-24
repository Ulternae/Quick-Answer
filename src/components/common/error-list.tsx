"use client";

import { useTranslations } from "next-intl";

import type { ErrorView } from "@/lib/forms/format-zod-error";

interface ErrorListProps {
  errors: ErrorView;
}

export function ErrorList({ errors }: ErrorListProps) {
  const tCommon = useTranslations("common");
  const tError = useTranslations("error");

  if (errors.length === 0) {
    return null;
  }

  return (
    <ul className="space-y-1 text-sm text-destructive" role="alert">
      {errors.map(({ field, message }, index) => {
        const fieldKey = `fields.${field}`;
        const fieldLabel = tCommon.has(fieldKey) ? tCommon(fieldKey) : field;
        const errorMessage = tError.has(message) ? tError(message) : message;

        return (
          <li key={`${field}-${message}-${index}`}>
            <span className="font-medium">{fieldLabel}:</span> {errorMessage}
          </li>
        );
      })}
    </ul>
  );
}
