"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { useTranslations } from "next-intl";

import { SubmissionActionsCell } from "@/features/submissions/components/submissions-datatable/datatable/submission-actions";
import { SubmissionPromoterCell } from "@/features/submissions/components/submissions-datatable/datatable/submission-promoter";
import { SubmissionTitleCell } from "@/features/submissions/components/submissions-datatable/datatable/submission-title";
import type { ActivitySubmission } from "@/features/submissions/types/submissions.types";

function useSubmissionColumns(): ColumnDef<ActivitySubmission>[] {
  const t = useTranslations("submissions.columns");

  return [
    {
      id: "activity",
      accessorKey: "activity.name",
      minSize: 280,
      header: t("activity"),
      cell: ({ row }) => (
        <SubmissionTitleCell
          description={row.original.activity.description}
          title={row.original.activity.name}
        />
      ),
    },
    {
      id: "promoter",
      minSize: 180,
      header: t("promoter"),
      accessorFn: (submission) =>
        `${submission.user.name} ${submission.user.lastname}`.trim(),
      cell: ({ row }) => (
        <SubmissionPromoterCell promoter={row.original.user} />
      ),
    },
    {
      id: "actions",
      size: 48,
      minSize: 48,
      maxSize: 48,
      header: () => <span className="sr-only">{t("actions")}</span>,
      cell: ({ row }) => (
        <SubmissionActionsCell submissionId={row.original.id} />
      ),
    },
  ];
}

export { useSubmissionColumns };
