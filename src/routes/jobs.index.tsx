import { createFileRoute } from "@tanstack/react-router";
import { BrowseJobsPage } from "@/pages/BrowseJobsPage";
import { jobsQueryOptions } from "@/queries/job.queries";
import { JobFiltersSchema } from "@/server/jobs/jobs.functions";

export const Route = createFileRoute("/jobs/")({
  validateSearch: JobFiltersSchema,
  loaderDeps: ({ search }) => ({ filters: search }),
  loader: ({ context, deps }) => {
    context.queryClient.prefetchQuery(jobsQueryOptions(deps.filters));
  },
  component: BrowseJobsPage,
});
