"use client";

import { useTransition } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SUBMISSION_STATUSES, SUBMISSION_STATUS_STYLES } from "@/features/submissions/constants/submissions.constants";
import type { SubmissionStatus } from "@/features/submissions/types/submissions.types";
import { usePathname, useRouter } from "@/i18n/navigation";

const ALL_STATUSES = "all";

const SubmissionStatusFilter = () => {
  const t = useTranslations("submissions");
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const statusParam = searchParams.get("status");
  const selectedStatus =
    statusParam && SUBMISSION_STATUSES.includes(statusParam as SubmissionStatus) ? statusParam : ALL_STATUSES;

  const handleStatusChange = (status: string) => {
    const nextSearchParams = new URLSearchParams(searchParams.toString());

    if (status === ALL_STATUSES) {
      nextSearchParams.delete("status");
    } else {
      nextSearchParams.set("status", status);
    }

    nextSearchParams.delete("page");

    const query = nextSearchParams.toString();
    const href = query ? `${pathname}?${query}` : pathname;

    startTransition(() => {
      router.replace(href, { scroll: false });
    });
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-medium uppercase text-muted-foreground">{t("filters.status")}</span>
      <Select disabled={isPending} onValueChange={handleStatusChange} value={selectedStatus}>
        <SelectTrigger aria-label={t("filters.status")} className="w-40" size="sm">
          <SelectValue />
        </SelectTrigger>
        <SelectContent align="end" className="p-1" position="popper" side="bottom" sideOffset={4}>
          <SelectItem value={ALL_STATUSES}>{t("filters.allStatuses")}</SelectItem>
          {SUBMISSION_STATUSES.map((status) => {
            const translationKey = `statuses.${status}`;

            return (
              <SelectItem className={SUBMISSION_STATUS_STYLES[status]} key={status} value={status}>
                {t.has(translationKey) ? t(translationKey) : status}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
};

export { SubmissionStatusFilter };
