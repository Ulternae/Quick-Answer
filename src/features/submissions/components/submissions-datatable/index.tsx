"use client";

import { useTranslations } from "next-intl";

import { ServerDataTable } from "@/components/ui/server-data-table";
import { useSubmissionColumns } from "@/features/submissions/components/submissions-datatable/datatable/submission.columns";
import type { ActivitySubmission } from "@/features/submissions/types/submissions.types";

interface SubmissionsDatatableProps {
  data: ActivitySubmission[];
}

function SubmissionsDatatable({ data }: SubmissionsDatatableProps) {
  const t = useTranslations("submissions");
  const columns = useSubmissionColumns();

  return (
    <ServerDataTable
      columns={columns}
      data={data}
      emptyMessage={t("empty")}
    />
  );
}

export { SubmissionsDatatable };
