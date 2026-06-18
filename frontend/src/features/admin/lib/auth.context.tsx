"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import {
  fetchSessionUserFromProfiles,
  DINAMO_TENANT,
  type DinamoSessionUser,
} from "@/src/lib/identity-auth";
import type { AuthUser } from "@/src/features/admin/types/admin.types";

interface AuthCtx {
  user: AuthUser | null;
  loading: boolean;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthCtx>({
  user: null,
  loading: true,
  logout: () => {},
  refreshUser: async () => {},
});

const SESSION_USER_KEY = "dinamo_session_user";

function readCachedSessionUser(): AuthUser | null {
  try {
    const raw = localStorage.getItem(SESSION_USER_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as DinamoSessionUser;
    return {
      id: parsed.userId,
      name: parsed.name,
      role: parsed.role,
    };
  } catch {
    return null;
  }
}

function toAuthUser(session: DinamoSessionUser): AuthUser {
  return {
    id: session.userId,
    name: session.name,
    role: session.role,
  };
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = useCallback(async () => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      setUser(null);
      localStorage.removeItem(SESSION_USER_KEY);
      return;
    }

    const session = await fetchSessionUserFromProfiles(token, DINAMO_TENANT);
    if (session) {
      const nextUser = toAuthUser(session);
      setUser(nextUser);
      localStorage.setItem(SESSION_USER_KEY, JSON.stringify(session));
      return;
    }

    const cached = readCachedSessionUser();
    setUser(cached);
  }, []);

  useEffect(() => {
    void (async () => {
      try {
        await refreshUser();
      } finally {
        setLoading(false);
      }
    })();
  }, [refreshUser]);

  const logout = useCallback(() => {
    localStorage.removeItem("access_token");
    window.dispatchEvent(new Event("auth-change"));
    localStorage.removeItem("refresh_token");
    localStorage.removeItem(SESSION_USER_KEY);
    setUser(null);
    window.location.href = "/login";
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
