import { JobFiltersSchema, JobIdSchema } from "@/schemas/job.schemas";
import { createServerFn } from "@tanstack/react-start";
import { getJobOpeningById, getJobOpenings } from "./jobs.server";

export const getJobs = createServerFn({ method: "GET" })
  .validator((filters?: unknown) => JobFiltersSchema.parse(filters ?? {}))
  .handler(async ({ data: filters }) => {
    return getJobOpenings(filters);
  });

export const getJobById = createServerFn({ method: "GET" })
  .validator(JobIdSchema)
  .handler(async ({ data: id }) => {
    return getJobOpeningById(id);
  });
