import { createFileRoute } from "@tanstack/react-router";
import { BrowseJobsPage } from "@/pages/BrowseJobsPage";
import { jobsQueryOptions } from "@/queries/job.queries";
import { JobFiltersSchema } from "@/server/jobs/jobs.functions";

export const Route = createFileRoute("/jobs/")({
  validateSearch: JobFiltersSchema,
  loaderDeps: ({ search }) => ({ filters: search }),
  loader: async ({ context, deps }) => {
    await context.queryClient.prefetchQuery(jobsQueryOptions(deps.filters));
  },
  component: BrowseJobsPage,
});
