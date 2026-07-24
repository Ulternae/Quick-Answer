import type { SubmissionCompany } from "@/features/submissions/types/submissions.types";

interface SubmissionCompanyCellProps {
  company: SubmissionCompany;
}

const SubmissionCompanyCell = ({
  company,
}: SubmissionCompanyCellProps) => {
  return (
    <div className="min-w-0">
      <p className="truncate text-sm font-medium">{company.name}</p>
    </div>
  );
};

export { SubmissionCompanyCell };
