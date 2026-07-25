import { redirect } from "next/navigation";

import { UpstreamApiError } from "@/lib/server/api-client";
import { getSessionState } from "@/lib/server/session";

interface HomePageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  let sessionState;

  try {
    sessionState = await getSessionState();
  } catch (error) {
    const errorCode = error instanceof UpstreamApiError ? "AUTH_SERVICE_UNAVAILABLE" : "INTERNAL_ERROR";

    redirect(`/${locale}/login?error=${errorCode}`);
  }

  if (sessionState.status === "authenticated") {
    redirect(`/${locale}/submissions`);
  }

  if (sessionState.status === "refresh-required") {
    const returnTo = encodeURIComponent(`/${locale}/submissions`);

    redirect(`/api/auth/refresh?locale=${locale}&returnTo=${returnTo}`);
  }

  const errorQuery = sessionState.reason === "SESSION_EXPIRED" ? "?error=SESSION_EXPIRED" : "";

  redirect(`/${locale}/login${errorQuery}`);
}
