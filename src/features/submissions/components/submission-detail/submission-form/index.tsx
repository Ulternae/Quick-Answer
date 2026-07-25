"use client";

import { useTranslations } from "next-intl";

import { SubmissionFormAnswer } from "@/features/submissions/components/submission-detail/submission-form-answer";
import type { ActivitySubmission } from "@/features/submissions/types/submissions.types";

interface SubmissionFormProps {
  submission: ActivitySubmission;
}

const SubmissionForm = ({ submission }: SubmissionFormProps) => {
  const t = useTranslations("submissions.detail");
  const components = submission.activity.form.form.components;

  if (components.length === 0) {
    return <p className="py-8 text-center text-sm text-muted-foreground">{t("emptyForm")}</p>;
  }

  return (
    <section aria-labelledby="submission-form-title">
      <header className="mb-4">
        <h3 className="font-medium" id="submission-form-title">
          {submission.activity.form.name}
        </h3>
        {submission.activity.form.description ? (
          <p className="mt-1 text-sm text-muted-foreground">{submission.activity.form.description}</p>
        ) : null}
      </header>

      <dl className="divide-y divide-border border-y">
        {components.map((component) => (
          <SubmissionFormAnswer component={component} key={component.key} value={submission.data[component.key]} />
        ))}
      </dl>
    </section>
  );
};

export { SubmissionForm };
