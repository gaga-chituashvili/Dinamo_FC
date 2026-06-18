import type { RegisterApiPayload } from "../api/auth";

type RegistrationContext = Pick<
  RegisterApiPayload,
  "tenantSlug" | "requestedRole"
>;

const FALLBACK_TENANT = "dinamo";
const DEFAULT_PATH_CONTEXTS: Record<string, RegistrationContext> = {
  restaurants: {
    tenantSlug: "restaurants",
    requestedRole: "restaurant_owner",
  },
  dinamo: {
    tenantSlug: "dinamo",
  },
};

function normalizeHost(value: string): string {
  return value.trim().toLowerCase().replace(/:\d+$/, "");
}

function sanitizeContext(raw: unknown): RegistrationContext | null {
  if (typeof raw !== "object" || raw === null) {
    return null;
  }

  const tenantSlugValue = Reflect.get(raw, "tenantSlug");
  const requestedRoleValue = Reflect.get(raw, "requestedRole");

  if (typeof tenantSlugValue !== "string" || tenantSlugValue.trim().length < 2) {
    return null;
  }

  const tenantSlug = tenantSlugValue.trim().toLowerCase();
  const requestedRole =
    typeof requestedRoleValue === "string" && requestedRoleValue.trim().length > 0
      ? requestedRoleValue.trim().toLowerCase()
      : undefined;

  return { tenantSlug, requestedRole };
}

function getContextFromEnvMap(host: string): RegistrationContext | null {
  const rawMap = process.env.NEXT_PUBLIC_SITE_REGISTRATION_MAP;
  if (!rawMap) {
    return null;
  }

  try {
    const parsed = JSON.parse(rawMap) as unknown;
    if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
      return null;
    }

    const matched = Reflect.get(parsed, host);
    return sanitizeContext(matched);
  } catch {
    return null;
  }
}

function getContextFromPathMap(pathname: string): RegistrationContext | null {
  const normalizedPathname = pathname.trim().toLowerCase();
  if (!normalizedPathname.startsWith("/")) {
    return null;
  }

  const firstSegment = normalizedPathname.split("/").filter(Boolean)[0];
  if (!firstSegment) {
    return null;
  }

  const rawPathMap = process.env.NEXT_PUBLIC_PATH_REGISTRATION_MAP;
  if (rawPathMap) {
    try {
      const parsed = JSON.parse(rawPathMap) as unknown;
      if (typeof parsed === "object" && parsed !== null && !Array.isArray(parsed)) {
        const matched = Reflect.get(parsed, firstSegment);
        const sanitized = sanitizeContext(matched);
        if (sanitized) {
          return sanitized;
        }
      }
    } catch {
      // Ignore invalid env JSON and continue with defaults.
    }
  }

  return DEFAULT_PATH_CONTEXTS[firstSegment] ?? null;
}

export function resolveRegistrationContext(
  hostname?: string,
  pathname?: string,
): RegistrationContext {
  const host =
    typeof hostname === "string" && hostname.length > 0
      ? normalizeHost(hostname)
      : typeof window !== "undefined"
        ? normalizeHost(window.location.host)
        : "";
  const path =
    typeof pathname === "string"
      ? pathname
      : typeof window !== "undefined"
        ? window.location.pathname
        : "";

  const fromMap = host ? getContextFromEnvMap(host) : null;
  if (fromMap) {
    return fromMap;
  }

  const fromPathMap = path ? getContextFromPathMap(path) : null;
  if (fromPathMap) {
    return fromPathMap;
  }

  const fallback = process.env.NEXT_PUBLIC_DEFAULT_TENANT_SLUG ?? FALLBACK_TENANT;
  return { tenantSlug: fallback.trim().toLowerCase() };
}
