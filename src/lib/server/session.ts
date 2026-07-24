import "server-only";

import { cookies } from "next/headers";
import type { NextResponse } from "next/server";

import type {
  AuthResponse,
  SessionResponse,
} from "@/features/auth/types/auth.types";
import { apiRequest, type ApiRequestOptions, UpstreamApiError } from "@/lib/server/api-client";

export const ACCESS_TOKEN_COOKIE = "qa_access_token";
export const REFRESH_TOKEN_COOKIE = "qa_refresh_token";

const REFRESH_TOKEN_MAX_AGE = 60 * 60 * 24 * 7;

const baseCookieOptions = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
};

export class SessionRequiredError extends Error {
  constructor() {
    super("A valid session is required");
    this.name = "SessionRequiredError";
  }
}

export function setSessionCookies(response: NextResponse, auth: AuthResponse) {
  response.cookies.set(ACCESS_TOKEN_COOKIE, auth.accessToken, {
    ...baseCookieOptions,
    maxAge: auth.expiresIn,
  });
  response.cookies.set(REFRESH_TOKEN_COOKIE, auth.refreshToken, {
    ...baseCookieOptions,
    maxAge: REFRESH_TOKEN_MAX_AGE,
  });
}

export function clearSessionCookies(response: NextResponse) {
  response.cookies.set(ACCESS_TOKEN_COOKIE, "", {
    ...baseCookieOptions,
    maxAge: 0,
  });
  response.cookies.set(REFRESH_TOKEN_COOKIE, "", {
    ...baseCookieOptions,
    maxAge: 0,
  });
}

export async function persistSession(auth: AuthResponse) {
  const cookieStore = await cookies();

  cookieStore.set(ACCESS_TOKEN_COOKIE, auth.accessToken, {
    ...baseCookieOptions,
    maxAge: auth.expiresIn,
  });
  cookieStore.set(REFRESH_TOKEN_COOKIE, auth.refreshToken, {
    ...baseCookieOptions,
    maxAge: REFRESH_TOKEN_MAX_AGE,
  });
}

export async function clearSession() {
  const cookieStore = await cookies();

  cookieStore.set(ACCESS_TOKEN_COOKIE, "", {
    ...baseCookieOptions,
    maxAge: 0,
  });
  cookieStore.set(REFRESH_TOKEN_COOKIE, "", {
    ...baseCookieOptions,
    maxAge: 0,
  });
}

export async function refreshSession(): Promise<AuthResponse | null> {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get(REFRESH_TOKEN_COOKIE)?.value;

  if (!refreshToken) {
    return null;
  }

  try {
    const auth = await apiRequest<AuthResponse>("public/auth/refresh", {
      method: "POST",
      body: { refreshToken },
    });

    await persistSession(auth);

    return auth;
  } catch (error) {
    if (error instanceof UpstreamApiError && (error.status === 400 || error.status === 401)) {
      await clearSession();
      return null;
    }

    await clearSession();
    throw error;
  }
}

function withAccessToken(options: ApiRequestOptions, accessToken: string): ApiRequestOptions {
  const headers = new Headers(options.headers);

  headers.set("Authorization", `Bearer ${accessToken}`);

  return {
    ...options,
    headers,
  };
}

export type SessionState =
  | {
      status: "authenticated";
      session: SessionResponse;
    }
  | {
      status: "refresh-required";
    }
  | {
      status: "anonymous";
      reason: "SESSION_REQUIRED" | "SESSION_EXPIRED";
    };

export async function getSessionState(): Promise<SessionState> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(ACCESS_TOKEN_COOKIE)?.value;
  const refreshToken = cookieStore.get(REFRESH_TOKEN_COOKIE)?.value;

  if (!accessToken) {
    return refreshToken
      ? { status: "refresh-required" }
      : { status: "anonymous", reason: "SESSION_REQUIRED" };
  }

  try {
    const session = await apiRequest<SessionResponse>(
      "public/auth/me",
      withAccessToken({}, accessToken),
    );

    return {
      status: "authenticated",
      session,
    };
  } catch (error) {
    if (error instanceof UpstreamApiError && error.status === 401) {
      return refreshToken
        ? { status: "refresh-required" }
        : { status: "anonymous", reason: "SESSION_EXPIRED" };
    }

    throw error;
  }
}

export async function authenticatedRequest<T>(path: string, options: ApiRequestOptions = {}): Promise<T> {
  const cookieStore = await cookies();
  let accessToken = cookieStore.get(ACCESS_TOKEN_COOKIE)?.value;

  if (!accessToken) {
    const refreshedSession = await refreshSession();
    accessToken = refreshedSession?.accessToken;
  }

  if (!accessToken) {
    throw new SessionRequiredError();
  }

  try {
    return await apiRequest<T>(path, withAccessToken(options, accessToken));
  } catch (error) {
    if (!(error instanceof UpstreamApiError) || error.status !== 401) {
      throw error;
    }
  }

  const refreshedSession = await refreshSession();

  if (!refreshedSession) {
    throw new SessionRequiredError();
  }

  try {
    return await apiRequest<T>(path, withAccessToken(options, refreshedSession.accessToken));
  } catch (error) {
    if (error instanceof UpstreamApiError && error.status === 401) {
      await clearSession();
      throw new SessionRequiredError();
    }

    throw error;
  }
}
