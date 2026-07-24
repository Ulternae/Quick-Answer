"use client";

import { useEffect, useState, useTransition } from "react";
import { LanguagesIcon, MoonIcon, SunIcon } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

interface AppPreferencesProps {
  className?: string;
}

function AppPreferences({ className }: AppPreferencesProps) {
  const locale = useLocale();
  const t = useTranslations("common");
  const pathname = usePathname();
  const router = useRouter();

  const initialIsDark = document.documentElement.classList.contains("dark");
  const [isDark, setIsDark] = useState(initialIsDark);
  const [isLanguagePending, startLanguageTransition] = useTransition();
  const nextLocale: Locale = locale === "es" ? "en" : "es";

  function toggleTheme() {
    const nextIsDark = !isDark;

    document.documentElement.classList.toggle("dark", nextIsDark);
    setIsDark(nextIsDark);
  }

  function toggleLocale() {
    startLanguageTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  }

  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-xl bg-background/80 p-1.5 shadow-lg ring-1 ring-border backdrop-blur-md",
        className,
      )}
    >
      <Button
        aria-label={isDark ? t("preferences.useLightTheme") : t("preferences.useDarkTheme")}
        onClick={toggleTheme}
        size="icon-sm"
        type="button"
        variant="ghost"
      >
        {isDark ? <SunIcon aria-hidden="true" /> : <MoonIcon aria-hidden="true" />}
      </Button>

      <Button
        aria-label={nextLocale === "es" ? t("preferences.switchToSpanish") : t("preferences.switchToEnglish")}
        disabled={isLanguagePending}
        onClick={toggleLocale}
        size="icon-sm"
        type="button"
        variant="ghost"
      >
        <LanguagesIcon aria-hidden="true" />
      </Button>
    </div>
  );
}

export { AppPreferences };
