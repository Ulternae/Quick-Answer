import type { Metadata } from "next";
import type { ReactNode } from "react";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Kameron } from "next/font/google";
import { notFound } from "next/navigation";

import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";

import "../globals.css";

const kameron = Kameron({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-kameron",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Quick Answer",
  description: "Get quick and helpful answers.",
};

interface LocaleLayoutProps {
  children: ReactNode;
  params: Promise<{
    locale: string;
  }>;
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html lang={locale} className={cn("h-full antialiased", kameron.className)} suppressHydrationWarning>
      <body className="flex min-h-full flex-col font-sans">
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
