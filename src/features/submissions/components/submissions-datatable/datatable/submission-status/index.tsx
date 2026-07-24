"use client";

import { useTranslations } from "next-intl";

import type { SubmissionStatus } from "@/features/submissions/types/submissions.types";
import { cn } from "@/lib/utils";

const STATUS_STYLES: Record<SubmissionStatus, string> = {
  approved: "text-emerald-700 dark:text-emerald-400",
  pending: "text-amber-700 dark:text-amber-400",
  review: "text-sky-700 dark:text-sky-400",
  rejected: "text-destructive",
};

interface SubmissionStatusCellProps {
  status: SubmissionStatus;
}

const SubmissionStatusCell = ({ status }: SubmissionStatusCellProps) => {
  const t = useTranslations("submissions");
  const translationKey = `statuses.${status}`;

  return (
    <span className={cn("inline-flex text-sm capitalize", STATUS_STYLES[status])}>
      {t.has(translationKey) ? t(translationKey) : status}
    </span>
  );
};

export { SubmissionStatusCell };
