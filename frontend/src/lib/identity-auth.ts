import { getUserIdFromAccessToken } from "@/src/lib/jwt-payload";

export const DINAMO_TENANT = "dinamo";

export type DinamoUserRole = "admin" | "user";

export type GlobalProfileSession = {
  userId: string;
  email: string | null;
  name: string | null;
  roles: string[];
};

export type TenantProfileSession = {
  userId: string;
  tenantSlug: string;
  roles: string[];
};

export type DinamoSessionUser = {
  userId: string;
  email: string;
  name: string;
  role: DinamoUserRole;
};

function getApiBaseUrl(): string {
  return (process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001").replace(
    /\/$/,
    "",
  );
}

function pickTenantRole(roleKeys: string[]): DinamoUserRole {
  if (roleKeys.includes("admin")) return "admin";
  return "user";
}

export async function fetchProfileSession(
  apiBase: string,
  userId: string,
  tenantSlug: string = DINAMO_TENANT,
): Promise<{ global: GlobalProfileSession; tenant: TenantProfileSession } | null> {
  try {
    const [globalRes, tenantRes] = await Promise.all([
      fetch(`${apiBase}/global-profiles/${userId}`, { cache: "no-store" }),
      fetch(
        `${apiBase}/global-profiles/${userId}/tenants/${encodeURIComponent(tenantSlug)}`,
        { cache: "no-store" },
      ),
    ]);

    if (!globalRes.ok || !tenantRes.ok) return null;

    const global = (await globalRes.json()) as GlobalProfileSession;
    const tenant = (await tenantRes.json()) as TenantProfileSession;
    return { global, tenant };
  } catch {
    return null;
  }
}

export function toDinamoSessionUser(
  global: Pick<GlobalProfileSession, "userId" | "email" | "name">,
  tenantRoles: string[],
): DinamoSessionUser {
  return {
    userId: global.userId,
    email: global.email ?? "",
    name: global.name ?? global.email ?? "",
    role: pickTenantRole(tenantRoles),
  };
}

export async function fetchSessionUserFromProfiles(
  accessToken: string,
  tenantSlug: string = DINAMO_TENANT,
  apiBase: string = getApiBaseUrl(),
): Promise<DinamoSessionUser | null> {
  const userId = getUserIdFromAccessToken(accessToken);
  if (!userId) return null;

  const session = await fetchProfileSession(apiBase, userId, tenantSlug);
  if (!session) return null;

  return toDinamoSessionUser(session.global, session.tenant.roles);
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/** Event chain is async — retry until profile is reachable after login. */
export async function waitForProfileSession(
  accessToken: string,
  tenantSlug: string = DINAMO_TENANT,
  options?: { attempts?: number; delayMs?: number },
): Promise<DinamoSessionUser | null> {
  const attempts = options?.attempts ?? 6;
  const delayMs = options?.delayMs ?? 400;

  for (let i = 0; i < attempts; i += 1) {
    const session = await fetchSessionUserFromProfiles(
      accessToken,
      tenantSlug,
    );
    if (session) return session;
    if (i < attempts - 1) {
      await sleep(delayMs);
    }
  }
  return null;
}
