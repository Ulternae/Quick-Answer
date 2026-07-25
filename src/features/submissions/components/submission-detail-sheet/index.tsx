"use client";

import { useState, useTransition, type ReactNode } from "react";
import { Loader2Icon } from "lucide-react";
import { useTranslations } from "next-intl";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { getSubmissionAction } from "@/features/submissions/actions/get-submission/get-submission.action";

interface SubmissionDetailSheetProps {
  children: ReactNode;
  submissionId: string;
}

const SubmissionDetailSheet = ({ children, submissionId }: SubmissionDetailSheetProps) => {
  const t = useTranslations("submissions.detail");
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);

    if (!nextOpen) {
      return;
    }

    startTransition(async () => {
      const submission = await getSubmissionAction(submissionId);

      console.log("[SubmissionDetailSheet] activity submission", submission);
    });
  };

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="data-[side=right]:w-[60vw] data-[side=right]:max-w-[60vw]" side="right">
        <SheetHeader>
          <SheetTitle>{t("title")}</SheetTitle>
          <SheetDescription>{t("description")}</SheetDescription>
        </SheetHeader>

        {isPending ? (
          <div className="flex items-center gap-2 px-4 text-sm text-muted-foreground">
            <Loader2Icon aria-hidden="true" className="size-4 animate-spin" />
            {t("loading")}
          </div>
        ) : null}
      </SheetContent>
    </Sheet>
  );
};

export { SubmissionDetailSheet };
