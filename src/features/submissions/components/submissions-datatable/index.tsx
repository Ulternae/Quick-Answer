"use client";

import { useTransition } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";

import { ServerDataTable, type ServerDataTablePagination } from "@/components/ui/server-data-table";
import { useSubmissionColumns } from "@/features/submissions/components/submissions-datatable/datatable/submission.columns";
import type { ActivitySubmission } from "@/features/submissions/types/submissions.types";
import { usePathname, useRouter } from "@/i18n/navigation";

interface SubmissionsDatatableProps {
  data: ActivitySubmission[];
  pagination: ServerDataTablePagination;
}

function SubmissionsDatatable({ data, pagination }: SubmissionsDatatableProps) {
  const t = useTranslations("submissions");
  const columns = useSubmissionColumns();
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  function handlePageChange(page: number) {
    const nextSearchParams = new URLSearchParams(searchParams.toString());

    nextSearchParams.set("page", String(page));

    startTransition(() => {
      router.replace(`${pathname}?${nextSearchParams.toString()}`, {
        scroll: false,
      });
    });
  }

  return (
    <ServerDataTable
      columns={columns}
      data={data}
      emptyMessage={t("empty")}
      isLoading={isPending}
      onPageChange={handlePageChange}
      pagination={pagination}
    />
  );
}

export { SubmissionsDatatable };
