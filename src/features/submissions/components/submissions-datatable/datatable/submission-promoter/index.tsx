import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { SubmissionUser } from "@/features/submissions/types/submissions.types";

interface SubmissionPromoterCellProps {
  promoter: SubmissionUser;
}

const getInitials = (name: string, lastname: string) => {
  return `${name.charAt(0)}${lastname.charAt(0)}`.toUpperCase();
};

const SubmissionPromoterCell = ({ promoter }: SubmissionPromoterCellProps) => {
  const fullName = `${promoter.name} ${promoter.lastname}`.trim();

  return (
    <div className="flex min-w-0 items-center gap-1.5">
      <Avatar className="size-8">
        {promoter.avatar ? <AvatarImage alt={fullName} src={promoter.avatar} /> : null}
        <AvatarFallback className="text-xs">{getInitials(promoter.name, promoter.lastname)}</AvatarFallback>
      </Avatar>
      <span className="truncate font-medium">{fullName}</span>
    </div>
  );
};

export { SubmissionPromoterCell };
