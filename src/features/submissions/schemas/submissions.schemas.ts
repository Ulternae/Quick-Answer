import { z } from "zod";

import {
  DEFAULT_SUBMISSIONS_LIMIT,
  DEFAULT_SUBMISSIONS_PAGE,
  MAX_SUBMISSIONS_LIMIT,
  SUBMISSION_STATUSES,
} from "@/features/submissions/constants/submissions.constants";

const optionalSubmissionStatusSchema = z.preprocess(
  (value) => (value === "" ? undefined : value),
  z.enum(SUBMISSION_STATUSES).optional(),
);

const submissionsQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(DEFAULT_SUBMISSIONS_PAGE),
  limit: z.coerce.number().int().min(1).max(MAX_SUBMISSIONS_LIMIT).default(DEFAULT_SUBMISSIONS_LIMIT),
  status: optionalSubmissionStatusSchema,
});

const submissionIdSchema = z.string().trim().min(1);

export { submissionIdSchema, submissionsQuerySchema };
