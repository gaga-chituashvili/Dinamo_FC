import { z } from "zod";

export const contactSchema = z.object({
  fullName: z
    .string()
    .min(2, "სახელი მინიმუმ 2 სიმბოლო უნდა იყოს")
    .max(50, "სახელი მაქსიმუმ 50 სიმბოლო"),
  subject: z.string().min(1, "თემა სავალდებულოა"),
  email: z.string().email("ელ-ფოსტა არასწორია"),
  message: z
    .string()
    .min(10, "შეტყობინება მინიმუმ 10 სიმბოლო")
    .max(500, "შეტყობინება მაქსიმუმ 500 სიმბოლო"),
});

export type ContactSchema = z.infer<typeof contactSchema>;
