import { loginSchema } from "@/features/auth/schemas/auth.schemas";
import type { LoginActionState } from "@/features/auth/types/auth.types";
import { loginServerAction } from "./login.server";
import { formatZodError } from "@/lib/forms/format-zod-error";

const loginAction = async (_previousState: LoginActionState, formData: FormData): Promise<LoginActionState> => {
  const loginData = Object.fromEntries(formData);

  const parsed = loginSchema.safeParse(loginData);

  if (!parsed.success) {
    return {
      success: false,
      values: {
        email: String(loginData.email ?? ""),
        password: String(loginData.password ?? ""),
      },
      errors: formatZodError(parsed.error),
    };
  }

  return loginServerAction({ data: parsed.data });
};

export { loginAction };
