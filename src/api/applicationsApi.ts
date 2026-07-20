import { api, MOCK_MODE, wait } from "./client";
import { MOCK_APPLICATIONS, MOCK_JOBS } from "./mockData";
import type { Application } from "@/types";

export type ApplyPayload = {
  fullname: string;
  email: string;
  phone?: string;
  location?: string;
  linkedin?: string;
  portfolio?: string;
  coverLetter?: string;
  resumeName?: string;
};

let cached: Application[] = [...MOCK_APPLICATIONS];

export const applicationsApi = {
  async list(): Promise<Application[]> {
    if (MOCK_MODE) {
      await wait(250);
      return cached;
    }
    return (await api.get("/applications")).data;
  },
  async getById(id: string): Promise<Application | undefined> {
    if (MOCK_MODE) {
      await wait(150);
      return cached.find((a) => a.id === id);
    }
    return (await api.get(`/applications/${id}`)).data;
  },
  async apply(jobId: string, payload?: ApplyPayload): Promise<Application> {
    if (MOCK_MODE) {
      await wait(500);
      const job = MOCK_JOBS.find((j) => j.id === jobId);
      if (!job) throw new Error("Job not found");
      if (cached.find((a) => a.jobId === jobId && a.status !== "Withdrawn"))
        throw new Error("Already applied");
      const app: Application = {
        id: `app_${Date.now()}`,
        jobId,
        job,
        appliedAt: new Date().toISOString(),
        status: "Submitted",
        payload,
      };
      cached = [app, ...cached];
      return app;
    }
    return (await api.post(`/applications`, { jobId, ...payload })).data;
  },
  async withdraw(id: string): Promise<void> {
    if (MOCK_MODE) {
      await wait(200);
      cached = cached.map((a) => (a.id === id ? { ...a, status: "Withdrawn" as const } : a));
      return;
    }
    await api.post(`/applications/${id}/withdraw`);
  },
  hasApplied(jobId: string): boolean {
    return cached.some((a) => a.jobId === jobId && a.status !== "Withdrawn");
  },
};
