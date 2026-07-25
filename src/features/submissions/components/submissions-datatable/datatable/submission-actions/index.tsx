"use client";

import { EyeIcon } from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { SubmissionDetailSheet } from "@/features/submissions/components/submission-detail-sheet";

interface SubmissionActionsCellProps {
  submissionId: string;
}

const SubmissionActionsCell = ({ submissionId }: SubmissionActionsCellProps) => {
  const t = useTranslations("submissions.actions");

  return (
    <SubmissionDetailSheet submissionId={submissionId}>
      <Button aria-label={t("viewDetails")} size="icon-sm" type="button" variant="ghost">
        <EyeIcon aria-hidden="true" />
      </Button>
    </SubmissionDetailSheet>
  );
};

export { SubmissionActionsCell };
