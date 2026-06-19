"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { profileService } from "../../services/profile.service";
import type { FanProfile } from "../../types/types";
import { ProfileHeader } from "../ProfileHeader";
import { LoyaltySection } from "../LoyaltySection";
import { StatsSection } from "../StatsSection";
import { PersonalInfoCard } from "../PersonalInfoCard";
import { TicketsSection } from "../TicketsSection";
import { PaymentMethodsCard } from "../PaymentMethodsCard";
import { Wrapper } from "@/src/components/shared/wrapper";
import { CircleAlert } from "lucide-react";

export function ProfileView() {
  const router = useRouter();
  const [profile, setProfile] = useState<FanProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const data = await profileService.getProfile();
        if (!cancelled) setProfile(data);
      } catch (e: unknown) {
        if (!cancelled) setError(e instanceof Error ? e.message : "შეცდომა");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [tick]);

  function handleLogout() {
    localStorage.removeItem("access_token");
    window.dispatchEvent(new Event("auth-change"));
    router.push("/");
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0a0e1f]">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-[3px] border-[#a5b4fc]/20 border-t-[#a5b4fc]" />
          <span className="text-sm tracking-widest text-[#6b6f8c]">
            იტვირთება...
          </span>
        </div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#0a0e1f]">
        <span className="text-5xl">
          <CircleAlert className="h-12 w-12 text-red-400" />
        </span>
        <p className="text-sm text-red-400">{error ?? "შეცდომა"}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0e1f]">
      <div
        className="pointer-events-none fixed inset-0 -z-10 opacity-30"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(165,180,252,0.12) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <ProfileHeader profile={profile} onLogout={handleLogout} />
      <Wrapper className="flex flex-col gap-6 py-10">
        <LoyaltySection profile={profile} />
        <StatsSection profile={profile} />
        <TicketsSection profile={profile} />
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <PersonalInfoCard
            profile={profile}
            onUpdate={() => setTick((t) => t + 1)}
          />
          <PaymentMethodsCard profile={profile} />
        </div>
      </Wrapper>
    </div>
  );
}
