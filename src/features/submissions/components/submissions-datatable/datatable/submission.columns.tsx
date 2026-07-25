"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { useTranslations } from "next-intl";

import { SubmissionActionsCell } from "@/features/submissions/components/submissions-datatable/datatable/submission-actions";
import { SubmissionCompanyCell } from "@/features/submissions/components/submissions-datatable/datatable/submission-company";
import { SubmissionDateCell } from "@/features/submissions/components/submissions-datatable/datatable/submission-date";
import { SubmissionPosCell } from "@/features/submissions/components/submissions-datatable/datatable/submission-pos";
import { SubmissionPromoterCell } from "@/features/submissions/components/submissions-datatable/datatable/submission-promoter";
import { SubmissionStatusCell } from "@/features/submissions/components/submissions-datatable/datatable/submission-status";
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
      id: "status",
      accessorKey: "status",
      minSize: 120,
      header: t("status"),
      cell: ({ row }) => (
        <SubmissionStatusCell status={row.original.status} />
      ),
    },
    {
      id: "pos",
      accessorFn: (submission) => submission.pos?.name ?? "",
      minSize: 220,
      header: t("pos"),
      cell: ({ row }) => <SubmissionPosCell pos={row.original.pos} />,
    },
    {
      id: "company",
      accessorFn: (submission) => submission.company?.name ?? "",
      minSize: 180,
      header: t("company"),
      cell: ({ row }) => (
        <SubmissionCompanyCell company={row.original.company} />
      ),
    },
    {
      id: "submittedAt",
      accessorKey: "submittedAt",
      minSize: 180,
      header: t("submittedAt"),
      cell: ({ row }) => (
        <SubmissionDateCell submittedAt={row.original.submittedAt} />
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
