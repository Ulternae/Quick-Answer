"use client";

import { useSyncExternalStore } from "react";
import { useLocale, useTranslations } from "next-intl";

import type { ActivitySubmission } from "@/features/submissions/types/submissions.types";

const subscribe = () => () => {};
const getBrowserTimeZone = () => Intl.DateTimeFormat().resolvedOptions().timeZone;
const getServerTimeZone = () => "UTC";

interface SubmissionInformationProps {
  submission: ActivitySubmission;
}

const SubmissionInformation = ({ submission }: SubmissionInformationProps) => {
  const locale = useLocale();
  const t = useTranslations("submissions");
  const timeZone = useSyncExternalStore(subscribe, getBrowserTimeZone, getServerTimeZone);
  const submittedAt = new Date(submission.submittedAt);
  const formattedSubmittedAt = Number.isNaN(submittedAt.getTime())
    ? submission.submittedAt
    : new Intl.DateTimeFormat(locale, {
        dateStyle: "medium",
        timeStyle: "short",
        timeZone,
      }).format(submittedAt);
  const statusKey = `statuses.${submission.status}`;
  const promoterName = `${submission.user.name} ${submission.user.lastname}`.trim();
  const pointOfSale = [submission.pos?.name, submission.pos?.code].filter(Boolean).join(" · ") || t("noPointOfSale");
  const fields = [
    {
      key: "activity",
      label: t("detail.fields.activity"),
      value: submission.activity.name,
    },
    {
      key: "status",
      label: t("detail.fields.status"),
      value: t.has(statusKey) ? t(statusKey) : submission.status,
    },
    {
      key: "promoter",
      label: t("detail.fields.promoter"),
      value: promoterName,
    },
    {
      key: "submittedAt",
      label: t("detail.fields.submittedAt"),
      value: formattedSubmittedAt,
    },
    {
      key: "company",
      label: t("detail.fields.company"),
      value: submission.company?.name || t("noCompany"),
    },
    {
      key: "pointOfSale",
      label: t("detail.fields.pointOfSale"),
      value: pointOfSale,
    },
    {
      key: "environment",
      label: t("detail.fields.environment"),
      value: submission.environment?.name || t("noEnvironment"),
    },
    {
      key: "identifier",
      label: t("detail.fields.identifier"),
      value: submission.id,
    },
  ];

  return (
    <section aria-labelledby="submission-information-title">
      <h3 className="sr-only" id="submission-information-title">
        {t("detail.tabs.detail")}
      </h3>

      <dl className="divide-y divide-border border-y">
        {fields.map((field) => (
          <div className="grid gap-1 py-3 sm:grid-cols-[minmax(10rem,0.7fr)_minmax(0,1.3fr)] sm:gap-6" key={field.key}>
            <dt className="text-sm text-muted-foreground">{field.label}</dt>
            <dd className="text-sm">{field.value}</dd>
          </div>
        ))}
      </dl>

      {submission.description ? (
        <div className="border-b py-3">
          <p className="text-sm text-muted-foreground">{t("detail.fields.description")}</p>
          <p className="mt-1 whitespace-pre-wrap text-sm">{submission.description}</p>
        </div>
      ) : null}
    </section>
  );
};

export { SubmissionInformation };
