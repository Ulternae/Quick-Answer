import { hasLocale } from "next-intl";
import { NextResponse } from "next/server";

import type { AuthErrorResponse, SessionResponse } from "@/features/auth/types/auth.types";
import { formatError } from "@/lib/forms/format-zod-error";
import { routing } from "@/i18n/routing";
import { UpstreamApiError } from "@/lib/server/api-client";
import { clearSession, refreshSession } from "@/lib/server/session";

const NO_STORE_HEADERS = {
  "Cache-Control": "no-store",
};

function getSafeNavigation(request: Request) {
  const url = new URL(request.url);
  const requestedLocale = url.searchParams.get("locale");
  const locale = hasLocale(routing.locales, requestedLocale) ? requestedLocale : routing.defaultLocale;
  const fallbackPath = `/${locale}/submissions`;
  const requestedReturnTo = url.searchParams.get("returnTo");
  const returnTo =
    requestedReturnTo?.startsWith(`/${locale}/`) && !requestedReturnTo.startsWith("//")
      ? requestedReturnTo
      : fallbackPath;

  return {
    locale,
    returnTo,
  };
}

function redirectToLogin(request: Request, locale: string, error: string) {
  const loginUrl = new URL(`/${locale}/login`, request.url);

  loginUrl.searchParams.set("error", error);

  return NextResponse.redirect(loginUrl, {
    headers: NO_STORE_HEADERS,
  });
}

export async function GET(request: Request) {
  const { locale, returnTo } = getSafeNavigation(request);

  try {
    const auth = await refreshSession();

    if (!auth) {
      await clearSession();
      return redirectToLogin(request, locale, "SESSION_EXPIRED");
    }

    return NextResponse.redirect(new URL(returnTo, request.url), {
      headers: NO_STORE_HEADERS,
    });
  } catch (error) {
    await clearSession();

    if (error instanceof UpstreamApiError) {
      return redirectToLogin(request, locale, "AUTH_SERVICE_UNAVAILABLE");
    }

    return redirectToLogin(request, locale, "INTERNAL_ERROR");
  }
}

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
    await clearSession();

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
