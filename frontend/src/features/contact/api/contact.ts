import type { ContactSchema } from "../schema/contact.schema";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

export const contactApi = {
  submit: async (data: ContactSchema): Promise<void> => {
    const res = await fetch(`${BASE_URL}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error("Failed to submit contact form");
  },
};
