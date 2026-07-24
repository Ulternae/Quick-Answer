interface SubmissionTitleCellProps {
  description: string | null;
  title: string;
}

const SubmissionTitleCell = ({ description, title }: SubmissionTitleCellProps) => {
  return (
    <div className="min-w-0">
      <p className="truncate font-medium leading-tight">{title}</p>
      {description ? <p className="truncate text-xs text-muted-foreground leading-tight">{description}</p> : null}
    </div>
  );
};

export { SubmissionTitleCell };
