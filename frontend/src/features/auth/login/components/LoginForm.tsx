"use client";

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
import { loginSchema, type LoginFormValues } from "../schema/login.schema";
import { authApi } from "../../api/auth";
import { resolveRegistrationContext } from "../../config/registration-context";
import { resolveAuthRoutes } from "../../routes";
import { ROUTES } from "@/src/lib/routes";

export function LoginForm() {
  const router = useRouter();
  const pathname = usePathname();
  const authRoutes = resolveAuthRoutes(pathname);
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (values: LoginFormValues) => {
    setServerError(null);
    setIsSubmitting(true);
    try {
      const { tenantSlug } = resolveRegistrationContext();
      const response = await authApi.login({ ...values, tenantSlug });
      localStorage.setItem("access_token", response.accessToken);
      localStorage.setItem("refresh_token", response.refreshToken);
      window.dispatchEvent(new Event("auth-change"));
      router.push("/profile");
    } catch (error) {
      setServerError(
        error instanceof Error ? error.message : "შესვლა ვერ შესრულდა.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs font-bold tracking-[0.15em] text-[#6b6f8c] uppercase">
                ელ-ფოსტა
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="email"
                  placeholder="you@example.com"
                  className="h-12 rounded-lg border border-white/[0.06] bg-[#161b3a] text-white placeholder:text-[#6b6f8c] focus-visible:ring-[#a5b4fc] focus-visible:border-[#a5b4fc]"
                />
              </FormControl>
              <FormMessage className="text-xs text-red-400" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between">
                <FormLabel className="text-xs font-bold tracking-[0.15em] text-[#6b6f8c] uppercase">
                  პაროლი
                </FormLabel>
                <Link
                  href={ROUTES.forgotPassword}
                  className="text-xs font-semibold text-[#a5b4fc] transition-colors hover:text-white"
                >
                  დაგავიწყდათ პაროლი?
                </Link>
              </div>
              <FormControl>
                <div className="relative">
                  <Input
                    {...field}
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="h-12 rounded-lg border border-white/6 bg-[#161b3a] text-white placeholder:text-[#6b6f8c] focus-visible:ring-[#a5b4fc] focus-visible:border-[#a5b4fc] pr-10"
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

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-12 rounded-lg border border-[#a5b4fc]/40 bg-[#a5b4fc]/10 text-xs font-black tracking-widest text-[#a5b4fc] transition-all hover:bg-[#a5b4fc] hover:text-[#0a0e1f] disabled:opacity-60 cursor-pointer"
        >
          {isSubmitting ? "იგზავნება..." : "შესვლა"}
        </Button>

        {serverError && (
          <p className="text-center text-sm text-red-400">{serverError}</p>
        )}

        <p className="text-center text-sm text-[#6b6f8c]">
          არ გაქვთ ანგარიში?{" "}
          <Link
            href={authRoutes.register}
            className="font-bold text-[#a5b4fc] transition-colors hover:text-white"
          >
            შემოგვიერთდით კლუბს
          </Link>
        </p>
      </form>
    </Form>
  );
}
