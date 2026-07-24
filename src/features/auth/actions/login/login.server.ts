"use server";

import { redirect } from "next/navigation";
import { getLocale } from "next-intl/server";

import type { AuthResponse, LoginInput } from "@/features/auth/types/auth.types";
import { formatError } from "@/lib/forms/format-zod-error";
import { apiRequest, UpstreamApiError } from "@/lib/server/api-client";
import { persistSession } from "@/lib/server/session";

type LoginServerAction = {
  data: LoginInput;
};

const loginServerAction = async ({ data }: LoginServerAction) => {
  const locale = await getLocale();

  try {
    const auth = await apiRequest<AuthResponse>("public/auth/login", {
      method: "POST",
      body: data,
    });

    await persistSession(auth);
  } catch (error) {
    if (error instanceof UpstreamApiError && error.status === 401) {
      return {
        success: false as const,
        errors: formatError("INVALID_CREDENTIALS"),
        values: data,
      };
    }

    if (error instanceof UpstreamApiError) {
      return {
        success: false as const,
        errors: formatError("AUTH_SERVICE_UNAVAILABLE"),
        values: data,
      };
    }

    return {
      success: false as const,
      errors: formatError("INTERNAL_ERROR"),
      values: data,
    };
  }

  redirect(`/${locale}/submissions`);
};

export { loginServerAction };
