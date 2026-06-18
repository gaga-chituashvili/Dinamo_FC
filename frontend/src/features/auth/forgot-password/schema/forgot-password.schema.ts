import { z } from "zod";

export const forgotPasswordSchema = z.object({
  email: z.string().email("ელ-ფოსტა არასწორია"),
});

export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;
