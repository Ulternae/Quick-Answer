import { loginSchema } from "@/features/auth/schemas/auth.schemas";
import type { LoginInput } from "@/features/auth/types/auth.types";
import { loginServerAction } from "./login.server";
import { ErrorView, formatZodError } from "@/lib/forms/format-zod-error";

type loginResult = { success: true; errors: [] } | { success: false; values: Partial<LoginInput>; errors: ErrorView };

const loginAction = async (_: LoginInput, formData: FormData): Promise<loginResult> => {
  const loginData = Object.fromEntries(formData);

  const parsed = loginSchema.safeParse(loginData);

  if (!parsed.success) {
    return {
      success: false,
      values: loginData,
      errors: formatZodError(parsed.error),
    };
  }

  return loginServerAction({ data: parsed.data });
};

export { loginAction };
