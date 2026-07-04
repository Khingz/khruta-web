import axios from "axios";

export const API_BASE_URL =
  (typeof import.meta !== "undefined" && (import.meta as any).env?.VITE_API_BASE_URL) || "/api";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((cfg) => {
  if (typeof window !== "undefined") {
    const token = window.localStorage.getItem("khruta_token");
    if (token) cfg.headers.Authorization = `Bearer ${token}`;
  }
  return cfg;
});

// Mock mode: when no live backend is configured we resolve from local fixtures.
// Real deployments will set VITE_API_BASE_URL and this flag flips off.
export const MOCK_MODE = !(
  typeof import.meta !== "undefined" && (import.meta as any).env?.VITE_API_BASE_URL
);

export const wait = (ms = 350) => new Promise((r) => setTimeout(r, ms));
