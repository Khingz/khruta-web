import { createServerFn } from "@tanstack/react-start";
import type { Job } from "@/types";

/**
 * Example server function: list jobs from Salesforce via a custom Apex REST
 * endpoint (/services/apexrest/khruta/jobs). Falls back to the mock fixtures
 * when Salesforce isn't configured yet, so the UI keeps working during the
 * scaffold phase.
 *
 * Expand this file with getJob, listApplications, apply, etc., following the
 * same pattern. All Salesforce calls stay server-side — the Apex client is
 * loaded inside the handler so it never ships to the browser bundle.
 */
export const listJobs = createServerFn({ method: "GET" })
  .inputValidator(
    (input: { q?: string; location?: string; page?: number; pageSize?: number } = {}) => input,
  )
  .handler(
    async ({ data }): Promise<{ data: Job[]; total: number; page: number; pageSize: number }> => {
      const page = data.page ?? 1;
      const pageSize = data.pageSize ?? 10;

      if (!process.env.SALESFORCE_API_KEY || !process.env.LOVABLE_API_KEY) {
        const { MOCK_JOBS } = await import("@/api/mockData");
        let res = [...MOCK_JOBS];
        if (data.q) {
          const q = data.q.toLowerCase();
          res = res.filter((j) => j.title.toLowerCase().includes(q));
        }
        if (data.location)
          res = res.filter((j) => j.location.toLowerCase().includes(data.location!.toLowerCase()));
        const start = (page - 1) * pageSize;
        return { data: res.slice(start, start + pageSize), total: res.length, page, pageSize };
      }

      const { sfApex } = await import("@/lib/salesforce.server");
      return sfApex.get<{ data: Job[]; total: number; page: number; pageSize: number }>(
        "/khruta/jobs",
        { q: data.q, location: data.location, page, pageSize },
      );
    },
  );
