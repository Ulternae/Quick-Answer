import type { ZodError } from "zod";

interface ErrorItem {
  field: string;
  message: string;
}

type ErrorView = ErrorItem[];

const formatZodError = (error: ZodError): ErrorView => {
  return error.issues.map((issue) => ({
    field: issue.path.join(".") || "error",
    message: issue.message,
  }));
};

const formatError = (message: string): ErrorView => [
  {
    field: "error",
    message,
  },
];

export type { ErrorView };
export { formatError, formatZodError };
