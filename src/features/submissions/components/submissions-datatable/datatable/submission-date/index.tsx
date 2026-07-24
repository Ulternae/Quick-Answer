"use client";

import { useSyncExternalStore } from "react";
import { useLocale } from "next-intl";

const subscribe = () => () => {};
const getBrowserTimeZone = () =>
  Intl.DateTimeFormat().resolvedOptions().timeZone;
const getServerTimeZone = () => "UTC";

interface SubmissionDateCellProps {
  submittedAt: string;
}

const SubmissionDateCell = ({
  submittedAt,
}: SubmissionDateCellProps) => {
  const locale = useLocale();
  const timeZone = useSyncExternalStore(
    subscribe,
    getBrowserTimeZone,
    getServerTimeZone,
  );
  const date = new Date(submittedAt);
  const formattedDate = Number.isNaN(date.getTime())
    ? submittedAt
    : new Intl.DateTimeFormat(locale, {
        dateStyle: "medium",
        timeStyle: "short",
        timeZone,
      }).format(date);

  return (
    <time
      className="text-sm font-medium"
      dateTime={submittedAt}
      title={timeZone}
    >
      {formattedDate}
    </time>
  );
};

export { SubmissionDateCell };
