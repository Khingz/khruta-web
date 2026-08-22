import { createFileRoute } from "@tanstack/react-router";
import { BrowseJobsPage } from "@/pages/BrowseJobsPage";
import { jobsQueryOptions } from "@/queries/job.queries";
import { JobFiltersSchema } from "@/schemas/job.schemas";

export const Route = createFileRoute("/jobs/")({
  head: () => ({
    meta: [
      { title: "Khruta - Jobs Listing" },
      {
        name: "description",
        content:
          "Browse open roles matched to your skills and goals — find opportunities worth your time.",
      },
    ],
  }),
  validateSearch: JobFiltersSchema,
  loaderDeps: ({ search }) => ({ filters: search }),
  loader: async ({ context, deps }) => {
    await context.queryClient.prefetchQuery(jobsQueryOptions(deps.filters));
  },
  component: BrowseJobsPage,
});
