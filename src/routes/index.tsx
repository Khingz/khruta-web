import { createFileRoute } from "@tanstack/react-router";
import { LandingPage } from "@/pages/LandingPage";
import { jobsQueryOptions } from "@/queries/job.queries";
import { JobFiltersSchema } from "@/schemas/job.schemas";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Khruta - Recruitment App" },
      {
        name: "description",
        content:
          "Khruta makes job hunting easier. Built for candidates, it helps you find, track, and land roles that genuinely fit — without the noise of traditional job boards.",
      },
    ],
  }),
  validateSearch: JobFiltersSchema,
  loaderDeps: ({ search }) => ({ filters: search }),
  loader: ({ context, deps }) => {
    context.queryClient.prefetchQuery(jobsQueryOptions(deps.filters));
  },
  component: LandingPage,
});
