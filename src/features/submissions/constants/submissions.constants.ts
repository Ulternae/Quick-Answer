const SUBMISSION_STATUSES = [
  "approved",
  "pending",
  "review",
  "rejected",
] as const;

const SUBMISSION_STATUS_STYLES = {
  approved:
    "text-emerald-700 hover:text-emerald-700 hover:**:text-emerald-700 focus:text-emerald-700 focus:**:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-400 dark:hover:**:text-emerald-400 dark:focus:text-emerald-400 dark:focus:**:text-emerald-400",
  pending:
    "text-amber-700 hover:text-amber-700 hover:**:text-amber-700 focus:text-amber-700 focus:**:text-amber-700 dark:text-amber-400 dark:hover:text-amber-400 dark:hover:**:text-amber-400 dark:focus:text-amber-400 dark:focus:**:text-amber-400",
  review:
    "text-sky-700 hover:text-sky-700 hover:**:text-sky-700 focus:text-sky-700 focus:**:text-sky-700 dark:text-sky-400 dark:hover:text-sky-400 dark:hover:**:text-sky-400 dark:focus:text-sky-400 dark:focus:**:text-sky-400",
  rejected:
    "text-destructive hover:text-destructive hover:**:text-destructive focus:text-destructive focus:**:text-destructive",
} satisfies Record<(typeof SUBMISSION_STATUSES)[number], string>;

const DEFAULT_SUBMISSIONS_PAGE = 1;
const DEFAULT_SUBMISSIONS_LIMIT = 10;
const MAX_SUBMISSIONS_LIMIT = 50;

export {
  DEFAULT_SUBMISSIONS_LIMIT,
  DEFAULT_SUBMISSIONS_PAGE,
  MAX_SUBMISSIONS_LIMIT,
  SUBMISSION_STATUSES,
  SUBMISSION_STATUS_STYLES,
};
