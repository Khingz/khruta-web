import { api, MOCK_MODE, wait } from "./client";
import { MOCK_JOBS, SAVED_JOBS_KEY } from "./mockData";
import type { Job } from "@/types";

export type JobFilters = {
  q?: string;
  location?: string;
  category?: string;
  type?: string;
  remote?: string;
  level?: string;
  page?: number;
  pageSize?: number;
};

export const jobsApi = {
  async list(
    filters: JobFilters = {},
  ): Promise<{ data: Job[]; total: number; page: number; pageSize: number }> {
    if (MOCK_MODE) {
      await wait(250);
      let res = [...MOCK_JOBS];
      const q = filters.q?.toLowerCase();
      if (q)
        res = res.filter(
          (j) =>
            j.title.toLowerCase().includes(q) ||
            j.company.toLowerCase().includes(q) ||
            j.skills.some((s) => s.toLowerCase().includes(q)),
        );
      if (filters.location)
        res = res.filter((j) => j.location.toLowerCase().includes(filters.location!.toLowerCase()));
      if (filters.category) res = res.filter((j) => j.category === filters.category);
      if (filters.type) res = res.filter((j) => j.type === filters.type);
      if (filters.remote) res = res.filter((j) => j.remote === filters.remote);
      if (filters.level) res = res.filter((j) => j.experienceLevel === filters.level);
      const page = filters.page ?? 1;
      const pageSize = filters.pageSize ?? 10;
      const start = (page - 1) * pageSize;
      return { data: res.slice(start, start + pageSize), total: res.length, page, pageSize };
    }
    const { data } = await api.get("/jobs", { params: filters });
    return data;
  },
  async getById(id: string): Promise<Job | null> {
    if (MOCK_MODE) {
      await wait(200);
      return MOCK_JOBS.find((j) => j.id === id) ?? null;
    }
    const { data } = await api.get(`/jobs/${id}`);
    return data;
  },
  async featured(): Promise<Job[]> {
    if (MOCK_MODE) {
      await wait(200);
      return MOCK_JOBS.slice(0, 6);
    }
    const { data } = await api.get("/jobs/featured");
    return data;
  },
  async recommended(): Promise<Job[]> {
    if (MOCK_MODE) {
      await wait(200);
      return MOCK_JOBS.slice(6, 10);
    }
    const { data } = await api.get("/jobs/recommended");
    return data;
  },

  // Saved (local-only in mock mode)
  getSavedIds(): string[] {
    if (typeof window === "undefined") return [];
    try {
      return JSON.parse(localStorage.getItem(SAVED_JOBS_KEY) || "[]");
    } catch {
      return [];
    }
  },
  async listSaved(): Promise<Job[]> {
    if (MOCK_MODE) {
      await wait(150);
      const ids = jobsApi.getSavedIds();
      return MOCK_JOBS.filter((j) => ids.includes(j.id));
    }
    const { data } = await api.get("/jobs/saved");
    return data;
  },
  async toggleSave(id: string): Promise<{ saved: boolean }> {
    if (MOCK_MODE) {
      const ids = jobsApi.getSavedIds();
      const next = ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id];
      localStorage.setItem(SAVED_JOBS_KEY, JSON.stringify(next));
      return { saved: next.includes(id) };
    }
    const { data } = await api.post(`/jobs/${id}/save`);
    return data;
  },
};
