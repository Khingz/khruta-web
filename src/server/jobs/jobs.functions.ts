import { JobFiltersSchema, JobIdSchema } from "@/schemas/job.schemas";
import { createServerFn } from "@tanstack/react-start";
import {
  getJobOpeningById,
  getJobOpenings,
  getRecommendedJobs,
  getUserSavedJobs,
} from "./jobs.server";
import { CandidateIdSchema } from "@/schemas/candidate.schemas";

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

export const getJobRecommendation = createServerFn({ method: "GET" })
  .validator(CandidateIdSchema)
  .handler(async ({ data: id }) => {
    return getRecommendedJobs(id);
  });

export const getSavedJobs = createServerFn({ method: "GET" })
  .validator(CandidateIdSchema)
  .handler(async ({ data: id }) => {
    return getUserSavedJobs(id);
  });
