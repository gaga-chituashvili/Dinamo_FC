"use client";

import { Send, Loader2, CheckCircle } from "lucide-react";
import { useContactForm } from "../hooks/useContactForm";
import { cn } from "@/src/lib/utils";

export function ContactForm() {
  const { form, status, onSubmit } = useContactForm();
  const {
    register,
    formState: { errors },
  } = form;

  const inputClass = (hasError: boolean) =>
    cn(
      "w-full rounded-lg border bg-[#161b3a] px-4 py-3 text-sm text-white placeholder:text-[#6b6f8c] outline-none transition-colors",
      hasError
        ? "border-red-500/60 focus:border-red-500"
        : "border-white/[0.06] focus:border-[#a5b4fc]",
    );

  const labelClass =
    "block text-xs font-bold tracking-[0.15em] text-[#6b6f8c] uppercase mb-2";

  if (status === "success") {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4 py-16 text-center">
        <CheckCircle className="h-10 w-10 text-[#a5b4fc]" />
        <h3 className="text-lg font-black italic text-white">
          შეტყობინება გაიგზავნა!
        </h3>
        <p className="text-sm text-[#8b8d9e]">მალე დაგიკავშირდებით.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label className={labelClass}>სახელი და გვარი</label>
          <input
            {...register("fullName")}
            placeholder="თქვენი სახელი"
            className={inputClass(!!errors.fullName)}
          />
          {errors.fullName && (
            <p className="mt-1 text-xs text-red-400">
              {errors.fullName.message}
            </p>
          )}
        </div>

        <div>
          <label className={labelClass}>ელ-ფოსტა</label>
          <input
            {...register("email")}
            type="email"
            placeholder="example@mail.com"
            className={inputClass(!!errors.email)}
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className={labelClass}>თემა</label>
        <input
          {...register("subject")}
          placeholder="წერილის სათაური"
          className={inputClass(!!errors.subject)}
        />
        {errors.subject && (
          <p className="mt-1 text-xs text-red-400">{errors.subject.message}</p>
        )}
      </div>

      <div>
        <label className={labelClass}>შეტყობინება</label>
        <textarea
          {...register("message")}
          rows={6}
          placeholder="როგორ შეგვიძლია დაგეხმაროთ?"
          className={cn(inputClass(!!errors.message), "resize-none")}
        />
        {errors.message && (
          <p className="mt-1 text-xs text-red-400">{errors.message.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-[#a5b4fc]/40 bg-[#a5b4fc]/10 py-4 text-xs font-bold tracking-widest text-[#a5b4fc] transition-all hover:bg-[#a5b4fc] hover:text-[#0a0e1f] disabled:opacity-60"
      >
        {status === "loading" ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <>
            გაგზავნა <Send className="h-3.5 w-3.5" />
          </>
        )}
      </button>
    </form>
  );
}
