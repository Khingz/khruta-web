import { createFileRoute } from "@tanstack/react-router";
import { LandingPage } from "@/pages/LandingPage";
import { JobFiltersSchema } from "@/server/jobs/jobs.functions";
import { jobsQueryOptions } from "@/queries/job.queries";

export const Route = createFileRoute("/")({
  validateSearch: JobFiltersSchema,
  loaderDeps: ({ search }) => ({ filters: search }),
  loader: ({ context, deps }) => {
    context.queryClient.prefetchQuery(jobsQueryOptions(deps.filters));
  },
  component: LandingPage,
});
