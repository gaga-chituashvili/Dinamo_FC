import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("არასწორი ელ-ფოსტა"),
  password: z.string().min(1, "პაროლი სავალდებულოა"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
