"use client";

import { LogOutIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useFormStatus } from "react-dom";

import { Button } from "@/components/ui/button";

function LogoutSubmitButton() {
  const t = useTranslations("user");
  const { pending } = useFormStatus();

  return (
    <Button
      className="w-full justify-start text-destructive hover:bg-destructive/10 hover:text-destructive"
      disabled={pending}
      type="submit"
      variant="ghost"
    >
      <LogOutIcon aria-hidden="true" />
      {pending ? t("actions.signingOut") : t("actions.signOut")}
    </Button>
  );
}

export { LogoutSubmitButton };
