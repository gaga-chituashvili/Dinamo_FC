import z from "zod";

export const registerSchema = z
  .object({
    fullName: z.string().min(4, "მინ. 4 სიმბოლო").max(96),
    email: z.string().email("არასწორი ელ-ფოსტა"),
    password: z.string().min(8, "მინ. 8 სიმბოლო").max(64),
    confirmPassword: z.string().min(1, "გაიმეორეთ პაროლი"),
    terms: z.boolean().refine((v) => v === true, {
      message: "პირობები უნდა დაეთანხმოთ",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "პაროლები არ ემთხვევა",
    path: ["confirmPassword"],
  });

export type RegisterSchema = z.infer<typeof registerSchema>;
