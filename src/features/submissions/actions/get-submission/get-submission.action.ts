import { submissionIdSchema } from "@/features/submissions/schemas/submissions.schemas";
import type {
  ActivitySubmission,
  SubmissionRequestResult,
} from "@/features/submissions/types/submissions.types";
import { formatZodError } from "@/lib/forms/format-zod-error";

import { getSubmissionServerAction } from "./get-submission.server";

async function getSubmissionAction(
  id: string,
): Promise<SubmissionRequestResult<ActivitySubmission>> {
  const parsed = submissionIdSchema.safeParse(id);

  if (!parsed.success) {
    return {
      success: false,
      data: null,
      errors: formatZodError(parsed.error),
    };
  }

  return getSubmissionServerAction({ id: parsed.data });
}

export { getSubmissionAction };
