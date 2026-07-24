import { NextResponse } from "next/server";

import { clearSessionCookies } from "@/lib/server/session";

export async function POST() {
  const response = new NextResponse(null, {
    status: 204,
    headers: {
      "Cache-Control": "no-store",
    },
  });

  clearSessionCookies(response);

  return response;
}
