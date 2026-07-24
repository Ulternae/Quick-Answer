import { z } from "zod";

const nonEmpty = z.string().min(1);

const serverEnvSchema = z.object({
  API_BASE_URL: nonEmpty,
});

export const serverEnv = serverEnvSchema.parse(process.env);
