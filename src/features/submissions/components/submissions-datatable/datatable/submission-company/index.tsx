"use client";

import { useTranslations } from "next-intl";

import type { SubmissionCompany } from "@/features/submissions/types/submissions.types";

interface SubmissionCompanyCellProps {
  company?: SubmissionCompany | null;
}

const SubmissionCompanyCell = ({ company }: SubmissionCompanyCellProps) => {
  const t = useTranslations("submissions");

  return (
    <div className="min-w-0">
      <p className="truncate text-sm font-medium">{company?.name || t("noCompany")}</p>
    </div>
  );
};

export { SubmissionCompanyCell };
