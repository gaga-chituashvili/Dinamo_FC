"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/components/ui/form";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { registerSchema } from "../schema/register.schema";
import { authApi } from "../../api/auth";
import { resolveRegistrationContext } from "../../config/registration-context";
import { resolveAuthRoutes } from "../../routes";
import { ROUTES } from "@/src/lib/routes";

type RegisterFormValues = z.infer<typeof registerSchema>;

export function RegisterForm() {
  const router = useRouter();
  const pathname = usePathname();
  const authRoutes = resolveAuthRoutes(pathname);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });

  const onSubmit = async (values: RegisterFormValues) => {
    setServerError(null);
    setSuccessMessage(null);
    setIsSubmitting(true);
    try {
      const registrationContext = resolveRegistrationContext(
        undefined,
        pathname,
      );
      const response = await authApi.register({
        name: values.fullName,
        email: values.email,
        password: values.password,
        tenantSlug: registrationContext.tenantSlug,
        requestedRole: registrationContext.requestedRole,
      });
      setSuccessMessage(response.message || "რეგისტრაცია წარმატებით დასრულდა.");
      router.push(authRoutes.login);
    } catch (error) {
      setServerError(
        error instanceof Error
          ? error.message
          : "რეგისტრაცია ვერ შესრულდა. სცადეთ ხელახლა.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    "h-12 rounded-lg border border-white/[0.06] bg-[#161b3a] text-white placeholder:text-[#6b6f8c] focus-visible:ring-[#a5b4fc] focus-visible:border-[#a5b4fc]";
  const labelClass =
    "text-xs font-bold tracking-[0.15em] text-[#6b6f8c] uppercase";

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={labelClass}>სრული სახელი</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="სახელი გვარი"
                  className={inputClass}
                />
              </FormControl>
              <FormMessage className="text-xs text-red-400" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={labelClass}>ელ-ფოსტა</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="email"
                  placeholder="email@example.com"
                  className={inputClass}
                />
              </FormControl>
              <FormMessage className="text-xs text-red-400" />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={labelClass}>პაროლი</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      {...field}
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className={`${inputClass} pr-10`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6b6f8c] hover:text-[#a5b4fc] transition-colors cursor-pointer"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormMessage className="text-xs text-red-400" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={labelClass}>გაიმეორეთ</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      {...field}
                      type={showConfirm ? "text" : "password"}
                      placeholder="••••••••"
                      className={`${inputClass} pr-10`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6b6f8c] hover:text-[#a5b4fc] transition-colors cursor-pointer"
                    >
                      {showConfirm ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormMessage className="text-xs text-red-400" />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="terms"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-3">
                <FormControl>
                  <input
                    type="checkbox"
                    checked={field.value}
                    onChange={field.onChange}
                    className="h-4 w-4 accent-[#a5b4fc] cursor-pointer"
                  />
                </FormControl>
                <FormLabel className="m-0 cursor-pointer text-sm text-[#8b8d9e]">
                  ვეთანხმები{" "}
                  <Link
                    href={ROUTES.terms}
                    className="font-bold text-[#a5b4fc] hover:text-white transition-colors"
                  >
                    წესებსა და პირობებს
                  </Link>
                </FormLabel>
              </div>
              <FormMessage className="text-xs text-red-400" />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-12 rounded-lg border border-[#a5b4fc]/40 bg-[#a5b4fc]/10 text-xs font-black tracking-widest text-[#a5b4fc] transition-all hover:bg-[#a5b4fc] hover:text-[#0a0e1f] disabled:opacity-60 cursor-pointer"
        >
          {isSubmitting ? "იგზავნება..." : "რეგისტრაცია"}
        </Button>

        {serverError && (
          <p className="text-center text-sm text-red-400">{serverError}</p>
        )}
        {successMessage && (
          <p className="text-center text-sm text-[#a5b4fc]">{successMessage}</p>
        )}

        <p className="text-center text-sm text-[#6b6f8c]">
          უკვე გაქვთ ანგარიში?{" "}
          <Link
            href={authRoutes.login}
            className="font-bold text-[#a5b4fc] hover:text-white transition-colors"
          >
            ავტორიზაცია
          </Link>
        </p>
      </form>
    </Form>
  );
}
