"use client";

import { MapPinIcon } from "lucide-react";
import { useTranslations } from "next-intl";

import type { PointOfSale } from "@/features/submissions/types/submissions.types";

interface SubmissionPosCellProps {
  pos: PointOfSale | null;
}

const SubmissionPosCell = ({ pos }: SubmissionPosCellProps) => {
  const t = useTranslations("submissions");

  return (
    <div className="flex min-w-0 items-center gap-1.5">
      <MapPinIcon aria-hidden="true" className="size-4 shrink-0 text-muted-foreground" />
      <div className="min-w-0">
        <p className="truncate text-sm font-medium leading-tight">{pos?.name ?? t("noPointOfSale")}</p>
        {pos?.address ? <p className="truncate text-xs text-muted-foreground leading-tight">{pos.address}</p> : null}
      </div>
    </div>
  );
};

export { SubmissionPosCell };
