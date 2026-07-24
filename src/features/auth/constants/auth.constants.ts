import type { AuthErrorCode } from "../types/auth.types";

const LOGIN_ERROR_CODES = new Set<AuthErrorCode>([
  "SESSION_REQUIRED",
  "SESSION_EXPIRED",
  "AUTH_SERVICE_UNAVAILABLE",
  "INTERNAL_ERROR",
]);

export { LOGIN_ERROR_CODES };
