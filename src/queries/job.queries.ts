import { CandidateId } from "@/schemas/candidate.schemas";
import { JobFilters, JobId, savedJobFilters } from "@/schemas/job.schemas";
import {
  getJobById,
  getJobRecommendation,
  getJobs,
  getSavedJobs,
} from "@/server/jobs/jobs.functions";
import { queryOptions } from "@tanstack/react-query";

export const jobQueryOptions = (id: JobId) =>
  queryOptions({
    queryKey: ["jobs", id],
    queryFn: () => getJobById({ data: id }),
  });

export const jobsQueryOptions = (filters: JobFilters = {}) =>
  queryOptions({
    queryKey: ["jobs", filters],
    queryFn: () => getJobs({ data: filters }),
  });

export const jobReommendOptions = (id: CandidateId) =>
  queryOptions({
    queryKey: ["jobsRecommend", id],
    queryFn: () => getJobRecommendation({ data: id }),
  });

export const savedJobsQueryOptions = (candidateId: CandidateId) =>
  queryOptions({
    queryKey: ["savedJobs", candidateId],
    queryFn: () => getSavedJobs({ data: candidateId }),
  });
