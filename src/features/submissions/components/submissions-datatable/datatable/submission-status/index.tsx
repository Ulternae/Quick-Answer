"use client";

import { useTranslations } from "next-intl";

import { SUBMISSION_STATUS_STYLES } from "@/features/submissions/constants/submissions.constants";
import type { SubmissionStatus } from "@/features/submissions/types/submissions.types";
import { cn } from "@/lib/utils";

interface SubmissionStatusCellProps {
  status: SubmissionStatus;
}

const SubmissionStatusCell = ({ status }: SubmissionStatusCellProps) => {
  const t = useTranslations("submissions");
  const translationKey = `statuses.${status}`;

  return (
    <span className={cn("inline-flex text-sm capitalize", SUBMISSION_STATUS_STYLES[status])}>
      {t.has(translationKey) ? t(translationKey) : status}
    </span>
  );
};

export { SubmissionStatusCell };
