import type { z } from "zod";

import type { ErrorView } from "@/lib/forms/format-zod-error";

import type { loginSchema } from "../schemas/auth.schemas";

export interface SessionUser {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string | null;
}

export interface AuthResponse {
  tokenType: "Bearer";
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  user: SessionUser;
}

export interface SessionResponse {
  user: SessionUser;
}

export type LoginInput = z.infer<typeof loginSchema>;

export interface LoginActionState {
  success: false;
  errors: ErrorView;
  values: LoginInput;
}

export type AuthErrorCode =
  | "INVALID_REQUEST"
  | "INVALID_CREDENTIALS"
  | "SESSION_REQUIRED"
  | "SESSION_EXPIRED"
  | "AUTH_SERVICE_UNAVAILABLE"
  | "INTERNAL_ERROR";

export interface AuthErrorResponse {
  errors: ErrorView;
}
