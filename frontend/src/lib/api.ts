const ACCESS_TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";

function getToken(): string | null {
  if (typeof window === "undefined") {
    return null;
  }
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

function setToken(token: string): void {
  if (typeof window === "undefined") {
    return;
  }
  localStorage.setItem(ACCESS_TOKEN_KEY, token);
}

function clearToken(): void {
  if (typeof window === "undefined") {
    return;
  }
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
}

function getRefreshToken(): string | null {
  if (typeof window === "undefined") {
    return null;
  }
  return localStorage.getItem(REFRESH_TOKEN_KEY);
}

function setRefreshToken(token: string): void {
  if (typeof window === "undefined") {
    return;
  }
  localStorage.setItem(REFRESH_TOKEN_KEY, token);
}

const BASE_URL = (
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"
).replace(/\/$/, "");

export type ApiOptions = RequestInit & {
  auth?: boolean;
  disableRedirect?: boolean;
  /** @internal avoid infinite refresh loop */
  _refreshRetried?: boolean;
};

let refreshInFlight: Promise<boolean> | null = null;

/** Avoids `res.json()` rejecting on empty body (JSON.parse("") -> SyntaxError). */
async function parseJsonBody<T>(res: Response): Promise<T | undefined> {
  const text = await res.text();
  const trimmed = text.trim();
  if (!trimmed) return undefined;
  try {
    return JSON.parse(trimmed) as T;
  } catch {
    return undefined;
  }
}

function tryRefreshSession(): Promise<boolean> {
  if (!refreshInFlight) {
    refreshInFlight = (async () => {
      try {
        const refreshToken = getRefreshToken();
        if (!refreshToken) {
          return false;
        }
        const res = await fetch(`${BASE_URL}/auth/refresh`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refreshToken }),
        });
        if (!res.ok) {
          return false;
        }
        const data = await parseJsonBody<{
          accessToken?: string;
          refreshToken?: string;
        }>(res);
        if (data?.accessToken) {
          setToken(data.accessToken);
          if (data.refreshToken) {
            setRefreshToken(data.refreshToken);
          }
          return true;
        }
        return false;
      } catch {
        return false;
      } finally {
        refreshInFlight = null;
      }
    })();
  }
  return refreshInFlight;
}

/** When a token is missing, attempts refresh (cookies) so optional auth calls can succeed. */
export async function ensureAuthTokenLoaded(): Promise<boolean> {
  if (getToken()) return true;
  const ok = await tryRefreshSession();
  return Boolean(ok && getToken());
}

async function ensureAccessForAuthRequest(options: ApiOptions): Promise<void> {
  if (!options.auth) {
    return;
  }
  if (getToken()) {
    return;
  }
  const ok = await tryRefreshSession();
  if (!ok || !getToken()) {
    if (options.disableRedirect) {
      throw new Error("Not authenticated");
    }
    throw new Error("Authentication required. Please log in.");
  }
}

function redirectToLoginIfSessionExpired(options: {
  disableRedirect?: boolean;
}) {
  if (typeof window === "undefined" || options.disableRedirect) return;
  try {
    const hadToken = getToken();
    clearToken();
    const pathname = window.location?.pathname || "/";
    const isAlreadyOnLogin =
      pathname === "/login" || pathname.startsWith("/login/");
    if (hadToken && !isAlreadyOnLogin) {
      const nextParam = encodeURIComponent(pathname);
      window.location.replace("/login?next=" + nextParam);
    }
  } catch (error) {
    console.error("Error redirecting to login:", error);
  }
}

async function parseErrorBody(res: Response): Promise<string> {
  const contentType = res.headers.get("content-type");
  if (contentType?.includes("application/json")) {
    const errorData = await parseJsonBody<Record<string, unknown>>(res);
    if (errorData) {
      const message =
        (typeof errorData.message === "string" && errorData.message) ||
        (typeof errorData.error === "string" && errorData.error);
      if (message) return message;
      return JSON.stringify(errorData);
    }
    return "";
  }
  return await res.text();
}

function throwIfHtmlError(message: string, res: Response, path: string): void {
  if (message.includes("<!DOCTYPE html>") || message.includes("<html>")) {
    throw new Error(
      `API request failed: ${res.status} ${res.statusText}. URL: ${BASE_URL}${path}. Check that your backend is running and the endpoint exists.`,
    );
  }
}

export async function api<T>(
  path: string,
  options: ApiOptions = {},
): Promise<T> {
  await ensureAccessForAuthRequest(options);

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  if (options.auth) {
    const token = getToken();
    if (!token) {
      if (options.disableRedirect) {
        throw new Error("Not authenticated");
      }
      throw new Error("Authentication required. Please log in.");
    }
    (headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;
  }

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const url = `${BASE_URL}${normalizedPath}`;

  const method = (options.method ?? "GET").toUpperCase();
  const res = await fetch(url, {
    ...options,
    headers,
    cache:
      options.cache ??
      (options.auth && method === "GET" ? "no-store" : undefined),
  });

  if (!res.ok) {
    const errorMessage = await parseErrorBody(res);
    throwIfHtmlError(errorMessage, res, normalizedPath);

    if (
      res.status === 401 &&
      options.auth &&
      !options._refreshRetried &&
      !normalizedPath.includes("/auth/refresh")
    ) {
      const refreshed = await tryRefreshSession();
      if (refreshed) {
        return api<T>(path, { ...options, _refreshRetried: true });
      }
    }

    if (res.status === 401 && !options.disableRedirect) {
      redirectToLoginIfSessionExpired(options);
    }
    throw new Error(
      errorMessage || `Request failed: ${res.status} ${res.statusText}`,
    );
  }
  const contentType = res.headers.get("content-type");
  if (contentType?.includes("application/json")) {
    const data = await parseJsonBody<T>(res);
    if (data === undefined) {
      throw new Error("Empty or invalid JSON response");
    }
    return data;
  }
  return undefined as unknown as T;
}

export async function apiForm<T>(
  path: string,
  options: ApiOptions = {},
): Promise<T> {
  await ensureAccessForAuthRequest(options);

  const headers: HeadersInit = {
    ...(options.headers || {}),
  };
  if (options.auth) {
    const token = getToken();
    if (!token) {
      if (options.disableRedirect) {
        throw new Error("Not authenticated");
      }
      throw new Error("Authentication required. Please log in.");
    }
    (headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;
  }
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const url = `${BASE_URL}${normalizedPath}`;
  const method = (options.method ?? "GET").toUpperCase();
  const res = await fetch(url, {
    ...options,
    headers,
    cache:
      options.cache ??
      (options.auth && method === "GET" ? "no-store" : undefined),
  });
  if (!res.ok) {
    const message = await res.text();
    throwIfHtmlError(message, res, normalizedPath);
    if (
      res.status === 401 &&
      options.auth &&
      !options._refreshRetried &&
      !normalizedPath.includes("/auth/refresh")
    ) {
      const refreshed = await tryRefreshSession();
      if (refreshed) {
        return apiForm<T>(path, { ...options, _refreshRetried: true });
      }
    }
    if (res.status === 401 && !options.disableRedirect) {
      redirectToLoginIfSessionExpired(options);
    }
    throw new Error(message || `Request failed: ${res.status} ${res.statusText}`);
  }
  const contentType = res.headers.get("content-type");
  if (contentType?.includes("application/json")) {
    const data = await parseJsonBody<T>(res);
    if (data === undefined) {
      throw new Error("Empty or invalid JSON response");
    }
    return data;
  }
  return undefined as unknown as T;
}

export async function apiBlob(
  path: string,
  options: ApiOptions = {},
): Promise<Blob | null> {
  await ensureAccessForAuthRequest(options);

  const headers: HeadersInit = {
    ...(options.headers || {}),
  };
  if (options.auth) {
    const token = getToken();
    if (!token) {
      throw new Error("Authentication required. Please log in.");
    }
    (headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;
  }
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const url = `${BASE_URL}${normalizedPath}`;
  const method = (options.method ?? "GET").toUpperCase();
  const res = await fetch(url, {
    ...options,
    headers,
    cache:
      options.cache ??
      (options.auth && method === "GET" ? "no-store" : undefined),
  });
  if (!res.ok) {
    const message = await res.text();
    throwIfHtmlError(message, res, normalizedPath);
    if (
      res.status === 401 &&
      options.auth &&
      !options._refreshRetried &&
      !normalizedPath.includes("/auth/refresh")
    ) {
      const refreshed = await tryRefreshSession();
      if (refreshed) {
        return apiBlob(path, { ...options, _refreshRetried: true });
      }
    }
    if (res.status === 401 && !options.disableRedirect) {
      redirectToLoginIfSessionExpired(options);
    }
    throw new Error(message || `Request failed: ${res.status} ${res.statusText}`);
  }
  return res.blob();
}