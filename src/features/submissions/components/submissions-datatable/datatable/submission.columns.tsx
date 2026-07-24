"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { useTranslations } from "next-intl";

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
        <span className="font-medium">
          {row.original.user.name} {row.original.user.lastname}
        </span>
      ),
    },
  ];
}

export { useSubmissionColumns };
