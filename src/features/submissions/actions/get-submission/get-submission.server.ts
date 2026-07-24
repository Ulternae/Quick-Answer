"use server";

import type {
  ActivitySubmission,
  SubmissionRequestResult,
} from "@/features/submissions/types/submissions.types";
import { formatError } from "@/lib/forms/format-zod-error";
import { UpstreamApiError } from "@/lib/server/api-client";
import {
  authenticatedRequest,
  SessionRequiredError,
} from "@/lib/server/session";

interface GetSubmissionServerActionProps {
  id: string;
}

async function getSubmissionServerAction({
  id,
}: GetSubmissionServerActionProps): Promise<
  SubmissionRequestResult<ActivitySubmission>
> {
  try {
    const submission = await authenticatedRequest<ActivitySubmission>(
      `public/activity-submissions/${encodeURIComponent(id)}`,
    );

    return {
      success: true,
      data: submission,
      errors: [],
    };
  } catch (error) {
    if (
      error instanceof SessionRequiredError ||
      (error instanceof UpstreamApiError && error.status === 401)
    ) {
      return {
        success: false,
        data: null,
        errors: formatError("SESSION_EXPIRED"),
      };
    }

    if (error instanceof UpstreamApiError && error.status === 404) {
      return {
        success: false,
        data: null,
        errors: formatError("SUBMISSION_NOT_FOUND"),
      };
    }

    if (error instanceof UpstreamApiError) {
      return {
        success: false,
        data: null,
        errors: formatError("SUBMISSIONS_UNAVAILABLE"),
      };
    }

    return {
      success: false,
      data: null,
      errors: formatError("INTERNAL_ERROR"),
    };
  }
}

export { getSubmissionServerAction };
