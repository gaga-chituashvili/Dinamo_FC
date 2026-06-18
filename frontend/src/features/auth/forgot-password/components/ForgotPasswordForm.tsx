"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Mail, ArrowLeft, Loader2, CheckCircle } from "lucide-react";
import {
  forgotPasswordSchema,
  type ForgotPasswordSchema,
} from "../schema/forgot-password.schema";

export function ForgotPasswordForm() {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordSchema) => {
    setStatus("loading");
    try {
      // TODO: API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Reset link sent to:", data.email);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-4 py-6 text-center">
        <CheckCircle className="w-12 h-12 text-[#2dac5c]" />
        <h3 className="text-lg font-bold text-white">ბმული გაიგზავნა!</h3>
        <p className="text-sm text-gray-400">
          შეამოწმეთ თქვენი ელ-ფოსტა და გაიარეთ პაროლის აღდგენის პროცედურა.
        </p>
        <Link
          href="/login"
          className="mt-2 text-sm font-semibold text-[#2dac5c] hover:opacity-80 transition-opacity"
        >
          შესვლის გვერდზე დაბრუნება
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="space-y-1.5">
        <label className="block text-xs font-bold uppercase tracking-widest text-gray-400">
          ელ-ფოსტის მისამართი
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
          <input
            {...register("email")}
            type="email"
            placeholder="name@example.com"
            className="w-full h-12 pl-10 pr-4 rounded-md border bg-white/5 text-sm text-white placeholder:text-gray-600 outline-none transition-colors border-white/10 focus:border-[#2dac5c]"
          />
        </div>
        {errors.email && (
          <p className="text-xs text-red-400">{errors.email.message}</p>
        )}
      </div>

      <button
        onClick={handleSubmit(onSubmit)}
        disabled={status === "loading"}
        className="w-full h-14 rounded-md bg-[#2dac5c] text-sm font-black uppercase tracking-widest text-white transition-opacity hover:opacity-90 disabled:opacity-60 flex items-center justify-center gap-2 cursor-pointer"
      >
        {status === "loading" ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          "აღდგენის ბმულის გაგზავნა"
        )}
      </button>

      {status === "error" && (
        <p className="text-center text-sm text-red-400">
          შეცდომა მოხდა. სცადეთ ხელახლა.
        </p>
      )}

      <div className="border-t border-white/10" />

      <Link
        href="/login"
        className="flex items-center justify-center gap-2 text-sm font-semibold text-gray-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        შესვლაზე დაბრუნება
      </Link>
    </div>
  );
}
