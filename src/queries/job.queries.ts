import { CandidateId } from "@/schemas/candidate.schemas";
import { JobFilters, JobId } from "@/schemas/job.schemas";
import { getJobById, getJobRecommendation, getJobs } from "@/server/jobs/jobs.functions";
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
