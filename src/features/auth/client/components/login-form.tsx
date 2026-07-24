"use client";

import { useActionState } from "react";
import { Loader2Icon } from "lucide-react";
import { useTranslations } from "next-intl";

import { ErrorList } from "@/components/common/error-list";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InputPassword } from "@/components/ui/input-password";
import { loginAction } from "@/features/auth/actions/login/login.action";
import type { LoginActionState } from "@/features/auth/types/auth.types";

const INITIAL_STATE: LoginActionState = {
  success: false,
  errors: [],
  values: {
    email: "",
    password: "",
  },
};

export function LoginForm() {
  const tAuth = useTranslations("auth");
  const tCommon = useTranslations("common");
  const [state, formAction, isPending] = useActionState<LoginActionState, FormData>(loginAction, INITIAL_STATE);
  const emailError = state.errors.find(({ field }) => field === "email");
  const passwordError = state.errors.find(({ field }) => field === "password");

  return (
    <section className="w-full max-w-sm">
      <header className="mb-9 space-y-2">
        <h1 className="text-xl font-bold tracking-tight uppercase">{tAuth("title")}</h1>
        <p className="max-w-xs text-sm leading-tight text-muted-foreground">{tAuth("description")}</p>
      </header>

      <form action={formAction} className="flex flex-col gap-2" noValidate>
        <label className="sr-only" htmlFor="email">
          {tCommon("fields.email")}
        </label>
        <Input
          autoComplete="email"
          defaultValue={state.values.email}
          disabled={isPending}
          id="email"
          isInvalid={Boolean(emailError)}
          name="email"
          placeholder={tCommon("fields.email")}
          required
          showErrorLabel
          type="email"
        />

        <label className="sr-only" htmlFor="password">
          {tCommon("fields.password")}
        </label>
        <InputPassword
          autoComplete="current-password"
          defaultValue={state.values.password}
          disabled={isPending}
          hidePasswordLabel={tCommon("actions.hidePassword")}
          id="password"
          isInvalid={Boolean(passwordError)}
          name="password"
          placeholder={tCommon("fields.password")}
          required
          showErrorLabel
          showPasswordLabel={tCommon("actions.showPassword")}
        />

        <ErrorList errors={state.errors} />

        <Button className="mt-3 self-end rounded-xl" disabled={isPending} type="submit">
          {isPending ? <Loader2Icon className="animate-spin" aria-hidden="true" /> : null}
          {isPending ? tAuth("actions.signingIn") : tAuth("actions.signIn")}
        </Button>
      </form>
    </section>
  );
}
