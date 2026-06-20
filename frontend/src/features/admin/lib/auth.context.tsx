"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { api } from "@/src/lib/api";
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

interface MeResponse {
  id: string;
  email: string;
  name: string;
  role: "fan" | "admin";
}

function toAuthRole(role: MeResponse["role"]): AuthUser["role"] {
  return role === "admin" ? "admin" : "user";
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = useCallback(async () => {
    try {
      const me = await api<MeResponse>("api/auth/me", { auth: true });
      setUser({ id: me.id, name: me.name, role: toAuthRole(me.role) });
    } catch {
      setUser(null);
    }
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
