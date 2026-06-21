"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/src/features/admin/lib/auth.context";

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (!user || user.role !== "admin") {
      router.replace("/403");
    }
  }, [user, loading, router]);

  if (loading) return null;
  if (!user || user.role !== "admin") return null;

  return <>{children}</>;
}
