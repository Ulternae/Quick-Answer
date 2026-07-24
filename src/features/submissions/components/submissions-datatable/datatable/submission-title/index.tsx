interface SubmissionTitleCellProps {
  description: string | null;
  title: string;
}

const SubmissionTitleCell = ({ description, title }: SubmissionTitleCellProps) => {
  return (
    <div className="min-w-0">
      <p className="truncate font-medium">{title}</p>
      {description ? <p className="mt-0.5 truncate text-xs text-muted-foreground">{description}</p> : null}
    </div>
  );
};

export { SubmissionTitleCell };
