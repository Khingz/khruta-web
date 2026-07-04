import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { authApi } from "@/api/authApi";
import type { User } from "@/types";

type AuthCtx = {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (p: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) => Promise<void>;
  logout: () => Promise<void>;
};

const Ctx = createContext<AuthCtx | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setUser(authApi.getCurrentUser());
    setLoading(false);
  }, []);

  const value: AuthCtx = {
    user,
    isAuthenticated: !!user,
    loading,
    async login(email, password) {
      const { user } = await authApi.login(email, password);
      setUser(user);
    },
    async register(p) {
      const { user } = await authApi.register(p);
      setUser(user);
    },
    async logout() {
      await authApi.logout();
      setUser(null);
    },
  };
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAuth() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
