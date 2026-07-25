import type { ReactNode } from "react";
import { redirect } from "next/navigation";

import { Brand } from "@/components/common/brand";
import { UserMenu } from "@/features/user/components/user-menu";
import { UpstreamApiError } from "@/lib/server/api-client";
import { getSessionState } from "@/lib/server/session";

interface AppLayoutProps {
  children: ReactNode;
  params: Promise<{
    locale: string;
  }>;
}

export default async function AppLayout({ children, params }: AppLayoutProps) {
  const { locale } = await params;
  let sessionState;

  try {
    sessionState = await getSessionState();
  } catch (error) {
    const errorCode = error instanceof UpstreamApiError ? "AUTH_SERVICE_UNAVAILABLE" : "INTERNAL_ERROR";

    redirect(`/${locale}/login?error=${errorCode}`);
  }

  if (sessionState.status === "refresh-required") {
    const returnTo = encodeURIComponent(`/${locale}/submissions`);

    redirect(`/api/auth/refresh?locale=${locale}&returnTo=${returnTo}`);
  }

  if (sessionState.status === "anonymous") {
    redirect(`/${locale}/login?error=${sessionState.reason}`);
  }

  return (
    <div className="flex min-h-svh flex-col bg-background">
      <header className="flex h-16 items-center justify-between border-b px-6">
        <Brand className="text-lg text-focus" />
        <UserMenu user={sessionState.session.user} />
      </header>
      <div className="flex-1">{children}</div>
    </div>
  );
}
