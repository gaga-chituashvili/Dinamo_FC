import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, type ContactSchema } from "../schema/contact.schema";
import { useContactStore } from "../store/contact.store";
import { contactApi } from "../api/contact";

export function useContactForm() {
  const { status, setStatus, reset } = useContactStore();

  const form = useForm<ContactSchema>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      fullName: "",
      subject: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactSchema) => {
    try {
      setStatus("loading");
      await contactApi.submit(data);
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  };

  return { form, status, onSubmit: form.handleSubmit(onSubmit), reset };
}
