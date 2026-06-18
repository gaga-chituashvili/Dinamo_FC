"use client";

import { useRef, useState } from "react";
import { Camera, CheckCircle, LogOut, Bell } from "lucide-react";
import type { FanProfile } from "../types/types";

interface ProfileHeaderProps {
  profile: FanProfile;
  onLogout: () => void;
}

const ROLE_LABELS: Record<string, string> = {
  admin: "ადმინი",
  user: "მომხმარებელი",
  moderator: "მოდერატორი",
};

const ROLE_STYLES: Record<string, string> = {
  admin: "bg-red-500/10 text-red-400 border-red-500/20",
  user: "bg-[#a5b4fc]/10 text-[#a5b4fc] border-[#a5b4fc]/20",
  moderator: "bg-amber-500/10 text-amber-400 border-amber-500/20",
};

function getRoleStyle(role: string) {
  return ROLE_STYLES[role.toLowerCase()] ?? "bg-[#10142a] text-[#6b6f8c] border-white/[0.06]";
}

export function ProfileHeader({ profile, onLogout }: ProfileHeaderProps) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(profile.avatarUrl ?? null);

  const initials = profile.fullName
    ? profile.fullName.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2)
    : profile.email.slice(0, 2).toUpperCase();

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const url = reader.result as string;
      setAvatarPreview(url);
      localStorage.setItem(`avatar_${profile.id}`, url);
    };
    reader.readAsDataURL(file);
  }

  return (
    <div className="relative overflow-hidden border-b border-white/6 bg-[#0a0e1f]">
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(165,180,252,0.12) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(165,180,252,0.08)_0%,transparent_60%)]" />

      <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-6">
            <div className="group relative cursor-pointer shrink-0" onClick={() => fileRef.current?.click()}>
              <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-2xl border border-[#a5b4fc]/30 bg-[#a5b4fc]/10">
                {avatarPreview ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={avatarPreview} alt={profile.fullName} className="h-full w-full object-cover" />
                ) : (
                  <span className="text-3xl font-black text-[#a5b4fc]">{initials}</span>
                )}
              </div>
              <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-[#0a0e1f]/70 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                <Camera className="h-5 w-5 text-[#a5b4fc]" />
              </div>
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
            </div>

            <div>
              <div className="mb-2 flex items-center gap-2">
                <h1 className="text-2xl font-black italic text-white">{profile.fullName || profile.email}</h1>
                {profile.isVerified && <CheckCircle className="h-5 w-5 shrink-0 text-[#a5b4fc]" />}
              </div>

              <div className="mb-2 flex flex-wrap gap-1.5">
                {profile.roles.map((role) => (
                  <span key={role} className={`rounded-lg border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest ${getRoleStyle(role)}`}>
                    {ROLE_LABELS[role.toLowerCase()] ?? role}
                  </span>
                ))}
              </div>

              <p className="text-xs text-[#6b6f8c]">შეუერთდა {profile.joinedYear}</p>

              {profile.headline && (
                <p className="mt-2 max-w-md text-sm leading-relaxed text-[#8b8d9e]">{profile.headline}</p>
              )}
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <button className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border border-white/6 text-[#8b8d9e] transition-all hover:border-[#a5b4fc] hover:text-[#a5b4fc]">
              <Bell className="h-4 w-4" />
            </button>
            <button onClick={onLogout} className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border border-white/6 text-[#8b8d9e] transition-all hover:border-red-500/40 hover:text-red-400">
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
