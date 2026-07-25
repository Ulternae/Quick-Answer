"use client";

import { ExternalLinkIcon, FileIcon } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import type { FormComponent, SubmissionAnswer, SubmissionFile } from "@/features/submissions/types/submissions.types";

interface SubmissionFormAnswerProps {
  component: FormComponent;
  value: SubmissionAnswer | undefined;
}

const isFileList = (value: SubmissionAnswer | undefined): value is SubmissionFile[] =>
  Array.isArray(value) &&
  value.every(
    (file) =>
      typeof file === "object" && file !== null && typeof file.name === "string" && typeof file.url === "string",
  );

const SubmissionFormAnswer = ({ component, value }: SubmissionFormAnswerProps) => {
  const locale = useLocale();
  const t = useTranslations("submissions.detail");
  const hasValue = value !== null && value !== undefined && value !== "";

  const renderValue = () => {
    if (!hasValue) {
      return <span className="text-muted-foreground">{t("noAnswer")}</span>;
    }

    if (component.type === "checkbox" && typeof value === "boolean") {
      return value ? t("yes") : t("no");
    }

    if (component.type === "number" && typeof value === "number") {
      return new Intl.NumberFormat(locale).format(value);
    }

    if (component.type === "select" && typeof value === "string") {
      const options = component.data?.values ?? component.values ?? [];
      const selectedOption = options.find((option) => option.value === value);

      return selectedOption?.label ?? value;
    }

    if (component.type === "file" && isFileList(value)) {
      if (value.length === 0) {
        return <span className="text-muted-foreground">{t("noAnswer")}</span>;
      }

      return (
        <ul className="flex flex-col gap-2">
          {value.map((file) => (
            <li key={file.url}>
              <a
                className="inline-flex items-center gap-2 text-focus underline-offset-4 hover:underline"
                href={file.url}
                rel="noreferrer"
                target="_blank"
              >
                <FileIcon aria-hidden="true" className="size-4" />
                <span>{file.name}</span>
                <ExternalLinkIcon aria-hidden="true" className="size-3" />
                <span className="sr-only">{t("openFile")}</span>
              </a>
            </li>
          ))}
        </ul>
      );
    }

    return String(value);
  };

  return (
    <div className="grid gap-1 py-4 sm:grid-cols-[minmax(12rem,0.8fr)_minmax(0,1.2fr)] sm:gap-6">
      <dt className="text-sm text-muted-foreground">{component.label}</dt>
      <dd className={component.type === "textarea" ? "whitespace-pre-wrap text-sm" : "text-sm"}>{renderValue()}</dd>
    </div>
  );
};

export { SubmissionFormAnswer };
