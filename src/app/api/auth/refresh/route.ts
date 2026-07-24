import { NextResponse } from "next/server";

import type { AuthErrorResponse, SessionResponse } from "@/features/auth/types/auth.types";
import { formatError } from "@/lib/forms/format-zod-error";
import { UpstreamApiError } from "@/lib/server/api-client";
import { refreshSession } from "@/lib/server/session";

const NO_STORE_HEADERS = {
  "Cache-Control": "no-store",
};

export async function POST() {
  try {
    const auth = await refreshSession();

    if (!auth) {
      return NextResponse.json<AuthErrorResponse>(
        { errors: formatError("SESSION_EXPIRED") },
        { status: 401, headers: NO_STORE_HEADERS },
      );
    }

    return NextResponse.json<SessionResponse>({ user: auth.user }, { headers: NO_STORE_HEADERS });
  } catch (error) {
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
