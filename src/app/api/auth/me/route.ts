import { NextResponse } from "next/server";

import type { AuthErrorResponse, SessionResponse } from "@/features/auth/auth.types";
import { formatError } from "@/lib/forms/format-zod-error";
import { UpstreamApiError } from "@/lib/server/api-client";
import { authenticatedRequest, SessionRequiredError } from "@/lib/server/session";

const NO_STORE_HEADERS = {
  "Cache-Control": "no-store",
};

export async function GET() {
  try {
    const session = await authenticatedRequest<SessionResponse>("public/auth/me");

    return NextResponse.json(session, { headers: NO_STORE_HEADERS });
  } catch (error) {
    if (error instanceof SessionRequiredError) {
      return NextResponse.json<AuthErrorResponse>(
        { errors: formatError("SESSION_REQUIRED") },
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
