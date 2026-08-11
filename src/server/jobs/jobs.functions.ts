import { JobFiltersSchema, JobIdSchema } from "@/schemas/job.schemas";
import { createServerFn } from "@tanstack/react-start";
import {
  getJobOpeningById,
  getJobOpenings,
  getRecommendedJobs,
  getUserSavedJobs,
  toggleSavedJob,
} from "./jobs.server";
import { CandidateIdSchema } from "@/schemas/candidate.schemas";
import { AddSaveJobPayload } from "@/types";
import { auth } from "@clerk/tanstack-react-start/server";

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

export const savedJobToggle = createServerFn({ method: "POST" })
  .validator((data: AddSaveJobPayload) => data)
  .handler(async ({ data }) => {
    const { isAuthenticated } = await auth();

    if (!isAuthenticated) {
      throw new Error("Not authenticated");
    }

    const job = await toggleSavedJob(data);

    return job;
  });
