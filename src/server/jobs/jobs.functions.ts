import { createServerFn } from "@tanstack/react-start";
import { getJobOpeningById, getJobOpenings, JobFilters, JobIdSchema } from "./jobs.server";

export const getJobs = createServerFn({ method: "GET" })
  .validator((filters?: JobFilters) => filters ?? {})
  .handler(async ({ data: filters }) => {
    return getJobOpenings({ data: filters });
  });

export const getJobById = createServerFn({ method: "GET" })
  .validator(JobIdSchema)
  .handler(async ({ data: id }) => {
    return getJobOpeningById({ data: id });
  });
