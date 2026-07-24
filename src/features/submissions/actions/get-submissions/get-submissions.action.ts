import { submissionsQuerySchema } from "@/features/submissions/schemas/submissions.schemas";
import type {
  SubmissionRequestResult,
  SubmissionsResponse,
  SubmissionsSearchParams,
} from "@/features/submissions/types/submissions.types";
import { formatZodError } from "@/lib/forms/format-zod-error";

import { getSubmissionsServerAction } from "./get-submissions.server";

async function getSubmissionsAction(
  searchParams: SubmissionsSearchParams,
): Promise<SubmissionRequestResult<SubmissionsResponse>> {
  const parsed = submissionsQuerySchema.safeParse(searchParams);

  if (!parsed.success) {
    return {
      success: false,
      data: null,
      errors: formatZodError(parsed.error),
    };
  }

  return getSubmissionsServerAction({ data: parsed.data });
}

export { getSubmissionsAction };
