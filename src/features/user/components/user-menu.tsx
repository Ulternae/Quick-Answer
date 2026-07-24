"use client";

import { UserRoundIcon } from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { logoutAction } from "@/features/user/actions/logout/logout.action";
import { LogoutSubmitButton } from "@/features/user/components/logout-submit-button";
import type { SessionUser } from "@/features/user/types/user.types";

interface UserMenuProps {
  user: SessionUser;
}

function getUserInitial(user: SessionUser) {
  return (user.name.trim() || user.email.trim()).charAt(0).toUpperCase();
}

function UserMenu({ user }: UserMenuProps) {
  const t = useTranslations("user");
  const initial = getUserInitial(user);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          aria-label={t("menuLabel")}
          className="h-10 rounded-xl px-3"
          type="button"
          variant="outline"
        >
          <UserRoundIcon aria-hidden="true" />
          <span className="hidden max-w-40 truncate sm:inline">{user.name}</span>
          <span
            aria-label={t("online")}
            className="size-2 rounded-full bg-emerald-500 ring-2 ring-background"
            role="img"
          />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        align="end"
        className="w-[min(22rem,calc(100vw-2rem))] gap-0 overflow-hidden rounded-2xl p-0"
        sideOffset={8}
      >
        <div className="flex items-center gap-4 border-b p-5">
          <div className="grid size-14 shrink-0 place-items-center overflow-hidden rounded-full bg-muted text-xl font-semibold text-muted-foreground">
            {user.avatar ? (
              <img
                alt=""
                className="size-full object-cover"
                src={user.avatar}
              />
            ) : (
              initial
            )}
          </div>

          <div className="min-w-0">
            <p className="truncate text-base font-semibold">{user.name}</p>
            <p className="truncate text-sm text-muted-foreground">
              {user.email}
            </p>
            <span className="mt-2 inline-flex rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
              {user.role}
            </span>
          </div>
        </div>

        <dl className="grid gap-4 p-5 sm:grid-cols-2">
          <div className="min-w-0">
            <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {t("fields.name")}
            </dt>
            <dd className="mt-1 truncate font-medium">{user.name}</dd>
          </div>
          <div className="min-w-0">
            <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {t("fields.email")}
            </dt>
            <dd className="mt-1 truncate font-medium">{user.email}</dd>
          </div>
        </dl>

        <div className="border-t p-2">
          <form action={logoutAction}>
            <LogoutSubmitButton />
          </form>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export { UserMenu };
