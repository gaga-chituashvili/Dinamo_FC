"use client";

import { useState } from "react";
import { Pencil, Check, X } from "lucide-react";
import type { FanProfile } from "../types/types";
import { profileService, type UpdateProfilePayload } from "../services/profile.service";

interface PersonalInfoCardProps {
  profile: FanProfile;
  onUpdate: () => void;
}

interface Field {
  label: string;
  key: keyof UpdateProfilePayload;
  value: string;
  readOnly?: boolean;
}

export function PersonalInfoCard({ profile, onUpdate }: PersonalInfoCardProps) {
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<UpdateProfilePayload>({});

  const fields: Field[] = [
    { label: "ელ-ფოსტა", key: "name", value: profile.email, readOnly: true },
    { label: "სახელი", key: "name", value: profile.fullName },
    { label: "სათაური", key: "headline", value: profile.headline },
    { label: "პოზიცია", key: "jobTitle", value: profile.jobTitle },
    { label: "კომპანია", key: "company", value: profile.company },
    { label: "მდებარეობა", key: "location", value: profile.location },
    { label: "ბიო", key: "bio", value: profile.bio },
  ];

  function startEdit() {
    setForm({ name: profile.fullName, headline: profile.headline, jobTitle: profile.jobTitle, company: profile.company, location: profile.location, bio: profile.bio });
    setEditing(true);
  }

  function cancelEdit() { setForm({}); setEditing(false); }

  async function saveEdit() {
    setSaving(true);
    try { await profileService.updateProfile(form); onUpdate(); setEditing(false); }
    finally { setSaving(false); }
  }

  return (
    <div className="rounded-2xl border border-white/6 bg-[#10142a] p-6">
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="h-5 w-0.5 rounded-full bg-[#a5b4fc]" />
          <h2 className="text-xs font-bold uppercase tracking-[0.15em] text-[#6b6f8c]">პირადი ინფორმაცია</h2>
        </div>
        {!editing ? (
          <button onClick={startEdit} className="inline-flex cursor-pointer items-center gap-1.5 text-xs text-[#6b6f8c] transition-colors hover:text-[#a5b4fc]">
            <Pencil className="h-3.5 w-3.5" />რედაქტირება
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <button onClick={cancelEdit} className="inline-flex cursor-pointer items-center gap-1 text-xs text-[#6b6f8c] transition-colors hover:text-red-400">
              <X className="h-3.5 w-3.5" />გაუქმება
            </button>
            <button onClick={saveEdit} disabled={saving} className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-[#a5b4fc]/30 bg-[#a5b4fc]/10 px-3 py-1.5 text-xs text-[#a5b4fc] transition-colors hover:bg-[#a5b4fc]/20 disabled:opacity-50">
              {saving ? <div className="h-3 w-3 animate-spin rounded-full border border-[#a5b4fc]/30 border-t-[#a5b4fc]" /> : <Check className="h-3.5 w-3.5" />}
              შენახვა
            </button>
          </div>
        )}
      </div>

      <div className="flex flex-col">
        {fields.map((f, i) => {
          const isEditable = editing && !f.readOnly;
          const displayValue = f.value || "—";
          return (
            <div key={`${f.label}-${i}`} className={`flex items-center justify-between gap-4 py-3.5 ${i < fields.length - 1 ? "border-b border-white/4" : ""}`}>
              <span className="w-28 shrink-0 text-[11px] font-bold uppercase tracking-wider text-[#6b6f8c]">{f.label}</span>
              {isEditable ? (
                <input
                  value={(form[f.key] as string) ?? ""}
                  onChange={(e) => setForm((prev) => ({ ...prev, [f.key]: e.target.value }))}
                  className="flex-1 rounded-lg border border-white/6 bg-[#161b3a] px-3 py-1.5 text-sm text-white outline-none transition-all focus:border-[#a5b4fc]"
                  placeholder="—"
                />
              ) : (
                <span className={`text-right text-sm font-semibold ${displayValue === "—" ? "text-[#4a4f6e]" : "text-white"}`}>{displayValue}</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
