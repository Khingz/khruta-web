import { api, MOCK_MODE, wait } from "./client";
import type { User } from "@/types";

const USER_KEY = "khruta_user";
const TOKEN_KEY = "khruta_token";

export const authApi = {
  async login(email: string, _password: string): Promise<{ user: User; token: string }> {
    if (MOCK_MODE) {
      await wait(500);
      const user: User = { id: "u_1", email, firstName: "Alex", lastName: "Morgan" };
      const token = "mock-token-" + Math.random().toString(36).slice(2);
      localStorage.setItem(USER_KEY, JSON.stringify(user));
      localStorage.setItem(TOKEN_KEY, token);
      return { user, token };
    }
    const { data } = await api.post("/auth/login", { email, password: _password });
    localStorage.setItem(USER_KEY, JSON.stringify(data.user));
    localStorage.setItem(TOKEN_KEY, data.token);
    return data;
  },
  async register(payload: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }): Promise<{ user: User; token: string }> {
    if (MOCK_MODE) {
      await wait(600);
      const user: User = {
        id: "u_new",
        email: payload.email,
        firstName: payload.firstName,
        lastName: payload.lastName,
      };
      const token = "mock-token-" + Math.random().toString(36).slice(2);
      localStorage.setItem(USER_KEY, JSON.stringify(user));
      localStorage.setItem(TOKEN_KEY, token);
      return { user, token };
    }
    const { data } = await api.post("/auth/register", payload);
    localStorage.setItem(USER_KEY, JSON.stringify(data.user));
    localStorage.setItem(TOKEN_KEY, data.token);
    return data;
  },
  async logout() {
    if (!MOCK_MODE) await api.post("/auth/logout").catch(() => {});
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(TOKEN_KEY);
  },
  async forgotPassword(email: string) {
    if (MOCK_MODE) {
      await wait(400);
      return { ok: true, email };
    }
    return (await api.post("/auth/forgot-password", { email })).data;
  },
  async resetPassword(token: string, password: string) {
    if (MOCK_MODE) {
      await wait(400);
      return { ok: true };
    }
    return (await api.post("/auth/reset-password", { token, password })).data;
  },
  getCurrentUser(): User | null {
    if (typeof window === "undefined") return null;
    try {
      const raw = localStorage.getItem(USER_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },
};
