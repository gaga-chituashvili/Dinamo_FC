import { api } from "@/src/lib/api";
import { getUserIdFromAccessToken } from "@/src/lib/jwt-payload";
import type { FanProfile } from "../types/types";

export interface UpdateProfilePayload {
  name?: string;
  bio?: string;
  headline?: string;
  jobTitle?: string;
  company?: string;
  location?: string;
  websiteUrl?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  xUrl?: string;
  skills?: string[];
  tags?: string[];
}

function getUserId(): string {
  const token = localStorage.getItem("access_token");
  const userId = token ? getUserIdFromAccessToken(token) : null;
  if (!userId) throw new Error("Not authenticated");
  return userId;
}

export const profileService = {
  async getProfile(): Promise<FanProfile> {
    if (typeof window === "undefined") throw new Error("Not authenticated");
    const token = localStorage.getItem("access_token");
    if (!token) throw new Error("Not authenticated");
    const userId = getUserIdFromAccessToken(token);
    if (!userId) throw new Error("Invalid token");

    const raw = await api<{
      userId: string;
      email: string | null;
      name: string | null;
      bio: string | null;
      headline: string | null;
      jobTitle: string | null;
      company: string | null;
      location: string | null;
      websiteUrl: string | null;
      githubUrl: string | null;
      linkedinUrl: string | null;
      xUrl: string | null;
      skills: string[];
      tags: string[];
      roles: string[];
      isVerified: boolean;
      completionScore: number;
      createdAt: string;
      loyaltyXp: number;
      loyaltyLevel: string;
      loyaltyXpToNext: number;
      matchesAttended: number;
      seasonMatchesAttended: number;
      seasonMatchesTotal: number;
      membershipType: string | null;
      membershipExpiresAt: string | null;
    }>(`/api/profiles/${userId}`, { auth: true });

    return {
      id: raw.userId,
      email: raw.email ?? "",
      fullName: raw.name ?? "",
      bio: raw.bio ?? "",
      headline: raw.headline ?? "",
      jobTitle: raw.jobTitle ?? "",
      company: raw.company ?? "",
      location: raw.location ?? "",
      websiteUrl: raw.websiteUrl ?? "",
      githubUrl: raw.githubUrl ?? "",
      linkedinUrl: raw.linkedinUrl ?? "",
      xUrl: raw.xUrl ?? "",
      skills: raw.skills ?? [],
      tags: raw.tags ?? [],
      roles: raw.roles ?? [],
      isVerified: raw.isVerified ?? false,
      completionScore: raw.completionScore ?? 0,
      joinedYear: new Date(raw.createdAt).getFullYear().toString(),
      avatarUrl: undefined,
      tickets: [],
      paymentMethods: [],
      loyaltyXp: raw.loyaltyXp ?? 0,
      loyaltyLevel: raw.loyaltyLevel ?? "Bronze",
      loyaltyXpToNext: raw.loyaltyXpToNext ?? 1000,
      matchesAttended: raw.matchesAttended ?? 0,
      seasonMatchesAttended: raw.seasonMatchesAttended ?? 0,
      seasonMatchesTotal: raw.seasonMatchesTotal ?? 0,
      membershipType: raw.membershipType ?? null,
      membershipExpiresAt: raw.membershipExpiresAt ?? null,
    };
  },

  async updateProfile(data: UpdateProfilePayload): Promise<void> {
    if (typeof window === "undefined") return;
    const userId = getUserId();

    const allowed: (keyof UpdateProfilePayload)[] = [
      "name",
      "bio",
      "headline",
      "jobTitle",
      "company",
      "location",
      "websiteUrl",
      "githubUrl",
      "linkedinUrl",
      "xUrl",
      "skills",
      "tags",
    ];

    const filtered = Object.fromEntries(
      Object.entries(data).filter(
        ([key, value]) =>
          allowed.includes(key as keyof UpdateProfilePayload) &&
          value !== "" &&
          value !== null &&
          value !== undefined,
      ),
    );

    await api(`/api/profiles/${userId}`, {
      method: "PATCH",
      auth: true,
      body: JSON.stringify(filtered),
    });
  },
};
