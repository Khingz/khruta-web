import { createServerFn } from "@tanstack/react-start";
import { getSalesforceToken } from "../salesforce.server";
import { z } from "zod";

const JobFiltersSchema = z.object({
  q: z.string().optional(),
  location: z.string().optional(),
  department: z.string().optional(),
  type: z.string().optional(),
  page: z.number().optional(),
  pageSize: z.number().optional(),
  minOffer: z.number().optional(),
  maxOffer: z.number().optional(),
});

export type JobFilters = z.infer<typeof JobFiltersSchema>;

export const JobIdSchema = z
  .string()
  .regex(/^[a-zA-Z0-9]{15}([a-zA-Z0-9]{3})?$/, "Invalid Salesforce ID format");

export type JobId = z.infer<typeof JobIdSchema>;

// Get all jobs or add filter condition
export const getJobOpenings = createServerFn()
  .validator(JobFiltersSchema)
  .handler(async ({ data: filters }) => {
    const { accessToken, instanceUrl } = await getSalesforceToken();

    const params = new URLSearchParams();
    if (filters.q) params.set("q", filters.q);
    if (filters.location) params.set("location", filters.location);
    if (filters.department) params.set("department", filters.department);
    if (filters.page) params.set("page", String(filters.page));
    if (filters.pageSize) params.set("pageSize", String(filters.pageSize));
    if (filters.minOffer) params.set("minOffer", String(filters.minOffer));
    if (filters.maxOffer) params.set("maxOffer", String(filters.maxOffer));

    const res = await fetch(`${instanceUrl}/services/apexrest/jobOpening/?${params.toString()}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (!res.ok) {
      const errorBody = await res.text();
      console.error(`Salesforce error (${res.status}):`, errorBody);
      throw new Error(`Failed to fetch job openings (${res.status}): ${errorBody}`);
    }

    return res.json();
  });

// Get job by Id
export const getJobOpeningById = createServerFn()
  .validator(JobIdSchema)
  .handler(async ({ data: id }) => {
    const { accessToken, instanceUrl } = await getSalesforceToken();

    const res = await fetch(`${instanceUrl}/services/apexrest/jobOpening/${id}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (!res.ok) {
      const errorBody = await res.text();
      console.error(`Salesforce error (${res.status}):`, errorBody);
      throw new Error(`Failed to fetch job openings(${res.status}): ${errorBody}`);
    }

    return res.json();
  });
