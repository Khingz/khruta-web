import { createFileRoute } from "@tanstack/react-router";
import { BrowseJobsPage } from "@/pages/BrowseJobsPage";
import { getJobs } from "@/server/jobs/jobs.functions";
import { queryOptions } from "@tanstack/react-query";
import { JobFilters } from "@/server/jobs/jobs.server";

export const jobsQueryOptions = (filters: JobFilters = {}) =>
  queryOptions({
    queryKey: ["jobs", filters],
    queryFn: () => getJobs({ data: filters }),
  });

export const Route = createFileRoute("/jobs/")({
  loader: ({ context }) => {
    context.queryClient.prefetchQuery(jobsQueryOptions());
  },
  component: BrowseJobsPage,
});
