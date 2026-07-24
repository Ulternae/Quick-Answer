"use client";

import { useActionState } from "react";
import { Loader2Icon } from "lucide-react";
import { useTranslations } from "next-intl";

import { ErrorList } from "@/components/common/error-list";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl">
          <h1>{tAuth("title")}</h1>
        </CardTitle>
        <CardDescription>{tAuth("description")}</CardDescription>
      </CardHeader>

      <CardContent>
        <form action={formAction} className="space-y-5" noValidate>
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="email">
              {tCommon("fields.email")}
            </label>
            <Input
              autoComplete="email"
              defaultValue={state.values.email}
              disabled={isPending}
              id="email"
              name="email"
              placeholder={tCommon("fields.email")}
              required
              type="email"
              showErrorLabel={true}
              isInvalid={Boolean(emailError)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="password">
              {tCommon("fields.password")}
            </label>
            <InputPassword
              autoComplete="current-password"
              defaultValue={state.values.password}
              disabled={isPending}
              hidePasswordLabel={tCommon("actions.hidePassword")}
              id="password"
              name="password"
              placeholder={tCommon("fields.password")}
              required
              showPasswordLabel={tCommon("actions.showPassword")}
              showErrorLabel={true}
              isInvalid={Boolean(passwordError)}
            />
          </div>

          <ErrorList errors={state.errors} />

          <Button className="w-full" disabled={isPending} type="submit">
            {isPending ? <Loader2Icon className="animate-spin" aria-hidden="true" /> : null}
            {isPending ? tAuth("actions.signingIn") : tAuth("actions.signIn")}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
