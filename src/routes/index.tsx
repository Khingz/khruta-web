import { createFileRoute } from "@tanstack/react-router";
import { LandingPage } from "@/pages/LandingPage";
import { jobsQueryOptions } from "@/queries/job.queries";
import { JobFiltersSchema } from "@/schemas/job.schemas";

export const Route = createFileRoute("/")({
  validateSearch: JobFiltersSchema,
  loaderDeps: ({ search }) => ({ filters: search }),
  loader: ({ context, deps }) => {
    context.queryClient.prefetchQuery(jobsQueryOptions(deps.filters));
  },
  component: LandingPage,
});
