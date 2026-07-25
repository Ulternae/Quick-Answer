"use client";

import { useState, useTransition, type ReactNode } from "react";
import { Loader2Icon } from "lucide-react";
import { useTranslations } from "next-intl";

import { ErrorList } from "@/components/common/error-list";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getSubmissionAction } from "@/features/submissions/actions/get-submission/get-submission.action";
import { SubmissionForm } from "@/features/submissions/components/submission-detail/submission-form";
import { SubmissionInformation } from "@/features/submissions/components/submission-detail/submission-information";
import type { ActivitySubmission } from "@/features/submissions/types/submissions.types";
import type { ErrorView } from "@/lib/forms/format-zod-error";

interface SubmissionDetailSheetProps {
  children: ReactNode;
  submissionId: string;
}

const SubmissionDetailSheet = ({ children, submissionId }: SubmissionDetailSheetProps) => {
  const t = useTranslations("submissions.detail");
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [submission, setSubmission] = useState<ActivitySubmission | null>(null);
  const [errors, setErrors] = useState<ErrorView>([]);

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);

    if (!nextOpen || submission || isPending) {
      return;
    }

    setErrors([]);

    startTransition(async () => {
      const result = await getSubmissionAction(submissionId);

      if (result.success) {
        setSubmission(result.data);
        return;
      }

      setErrors(result.errors);
    });
  };

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent
        className="data-[side=right]:w-full data-[side=right]:max-w-full sm:data-[side=right]:w-[60vw] sm:data-[side=right]:max-w-[60vw]"
        side="right"
      >
        <SheetHeader>
          <SheetTitle>{t("title")}</SheetTitle>
          <SheetDescription>{t("description")}</SheetDescription>
        </SheetHeader>

        {isPending ? (
          <div className="flex flex-1 items-center justify-center gap-2 px-4 text-sm text-muted-foreground">
            <Loader2Icon aria-hidden="true" className="size-4 animate-spin" />
            {t("loading")}
          </div>
        ) : null}

        {!isPending && errors.length > 0 ? (
          <div className="px-4">
            <ErrorList errors={errors} />
          </div>
        ) : null}

        {!isPending && submission ? (
          <Tabs className="min-h-0 flex-1 px-4 pb-4" defaultValue="form">
            <TabsList className="w-full justify-start" variant="line">
              <TabsTrigger value="form">{t("tabs.form")}</TabsTrigger>
              <TabsTrigger value="detail">{t("tabs.detail")}</TabsTrigger>
            </TabsList>
            <TabsContent className="min-h-0 overflow-y-auto pt-4" value="form">
              <SubmissionForm submission={submission} />
            </TabsContent>
            <TabsContent className="min-h-0 overflow-y-auto pt-4" value="detail">
              <SubmissionInformation submission={submission} />
            </TabsContent>
          </Tabs>
        ) : null}
      </SheetContent>
    </Sheet>
  );
};

export { SubmissionDetailSheet };
