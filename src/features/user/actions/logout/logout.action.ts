"use server";

import { redirect } from "next/navigation";
import { getLocale } from "next-intl/server";

import { clearSession } from "@/lib/server/session";

async function logoutAction() {
  const locale = await getLocale();

  await clearSession();
  redirect(`/${locale}/login`);
}

export { logoutAction };
