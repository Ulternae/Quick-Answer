import type { z } from "zod";

import type { ErrorView } from "@/lib/forms/format-zod-error";
import type { SUBMISSION_STATUSES } from "@/features/submissions/constants/submissions.constants";
import type { submissionsQuerySchema } from "@/features/submissions/schemas/submissions.schemas";

export type SubmissionStatus = (typeof SUBMISSION_STATUSES)[number];

export interface SubmissionFile {
  name: string;
  url: string;
}

export type SubmissionAnswer = boolean | number | string | null | SubmissionFile[];

export type SubmissionData = Record<string, SubmissionAnswer>;

export interface FormOption {
  label: string;
  value: string;
}

export interface FormComponent {
  type: string;
  key: string;
  label: string;
  input?: boolean;
  data?: {
    values: FormOption[];
  };
  values?: FormOption[];
  [key: string]: unknown;
}

export interface ActivityFormSchema {
  display: string;
  components: FormComponent[];
}

export interface ActivityForm {
  id: string;
  name: string;
  description: string | null;
  form: ActivityFormSchema;
}

export interface SubmissionActivity {
  id: string;
  name: string;
  image: string | null;
  description: string | null;
  periodicity: string;
  form: ActivityForm;
}

export interface SubmissionUser {
  id: string;
  name: string;
  lastname: string;
  avatar: string | null;
}

export interface PointOfSale {
  id: string;
  name: string;
  code: string;
  area: string;
  address: string;
  country: string;
}

export interface SubmissionCompany {
  id: string;
  name: string;
}

export interface SubmissionEnvironment {
  id: string;
  name: string;
}

export interface ActivitySubmission {
  id: string;
  submittedAt: string;
  status: SubmissionStatus;
  description: string | null;
  data: SubmissionData;
  activity: SubmissionActivity;
  user: SubmissionUser;
  pos?: PointOfSale | null;
  company?: SubmissionCompany | null;
  environment?: SubmissionEnvironment | null;
  createdAt: string;
  updatedAt: string;
}

export interface SubmissionsMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface SubmissionsResponse {
  data: ActivitySubmission[];
  meta: SubmissionsMeta;
}

export type SubmissionsQuery = z.infer<typeof submissionsQuerySchema>;

export interface SubmissionsSearchParams {
  page?: string | string[];
  limit?: string | string[];
  status?: string | string[];
}

export type SubmissionRequestResult<T> =
  | { success: true; data: T; errors: [] }
  | { success: false; data: null; errors: ErrorView };
