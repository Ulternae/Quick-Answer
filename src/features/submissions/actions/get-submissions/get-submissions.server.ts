"use server";

import type {
  SubmissionRequestResult,
  SubmissionsQuery,
  SubmissionsResponse,
} from "@/features/submissions/types/submissions.types";
import { formatError } from "@/lib/forms/format-zod-error";
import { UpstreamApiError } from "@/lib/server/api-client";
import {
  authenticatedRequest,
  SessionRequiredError,
} from "@/lib/server/session";

interface GetSubmissionsServerActionProps {
  data: SubmissionsQuery;
}

async function getSubmissionsServerAction({
  data,
}: GetSubmissionsServerActionProps): Promise<
  SubmissionRequestResult<SubmissionsResponse>
> {
  const searchParams = new URLSearchParams({
    page: String(data.page),
    limit: String(data.limit),
  });

  if (data.status) {
    searchParams.set("status", data.status);
  }

  try {
    const submissions = await authenticatedRequest<SubmissionsResponse>(
      `public/activity-submissions?${searchParams.toString()}`,
    );

    return {
      success: true,
      data: submissions,
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

export { getSubmissionsServerAction };
