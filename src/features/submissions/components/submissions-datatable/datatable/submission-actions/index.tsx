"use client";

import { EllipsisIcon, EyeIcon } from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "@/i18n/navigation";

interface SubmissionActionsCellProps {
  submissionId: string;
}

function SubmissionActionsCell({
  submissionId,
}: SubmissionActionsCellProps) {
  const t = useTranslations("submissions.actions");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          aria-label={t("openMenu")}
          size="icon-sm"
          type="button"
          variant="ghost"
        >
          <EllipsisIcon aria-hidden="true" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Link href={`/submissions/${submissionId}`}>
            <EyeIcon aria-hidden="true" />
            {t("viewDetails")}
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export { SubmissionActionsCell };
