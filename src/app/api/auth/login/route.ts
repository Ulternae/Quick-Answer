import { NextResponse } from "next/server";

import { loginSchema } from "@/features/auth/schemas/auth.schemas";
import type { AuthErrorResponse, AuthResponse, SessionResponse } from "@/features/auth/types/auth.types";
import { formatError, formatZodError } from "@/lib/forms/format-zod-error";
import { apiRequest, UpstreamApiError } from "@/lib/server/api-client";
import { setSessionCookies } from "@/lib/server/session";

const NO_STORE_HEADERS = {
  "Cache-Control": "no-store",
};

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json<AuthErrorResponse>(
      { errors: formatError("INVALID_REQUEST") },
      { status: 400, headers: NO_STORE_HEADERS },
    );
  }

  const result = loginSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json<AuthErrorResponse>(
      { errors: formatZodError(result.error) },
      { status: 400, headers: NO_STORE_HEADERS },
    );
  }

  try {
    const auth = await apiRequest<AuthResponse>("public/auth/login", {
      method: "POST",
      body: result.data,
    });
    const response = NextResponse.json<SessionResponse>({ user: auth.user }, { headers: NO_STORE_HEADERS });

    setSessionCookies(response, auth);

    return response;
  } catch (error) {
    if (error instanceof UpstreamApiError && error.status === 401) {
      return NextResponse.json<AuthErrorResponse>(
        { errors: formatError("INVALID_CREDENTIALS") },
        { status: 401, headers: NO_STORE_HEADERS },
      );
    }

    if (error instanceof UpstreamApiError) {
      return NextResponse.json<AuthErrorResponse>(
        { errors: formatError("AUTH_SERVICE_UNAVAILABLE") },
        { status: 502, headers: NO_STORE_HEADERS },
      );
    }

    return NextResponse.json<AuthErrorResponse>(
      { errors: formatError("INTERNAL_ERROR") },
      { status: 500, headers: NO_STORE_HEADERS },
    );
  }
}
