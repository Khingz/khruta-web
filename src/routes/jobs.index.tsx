import { createFileRoute } from "@tanstack/react-router";
import { BrowseJobsPage } from "@/pages/BrowseJobsPage";
import { jobsQueryOptions } from "@/queries/job.queries";

export const Route = createFileRoute("/jobs/")({
  loader: ({ context }) => {
    context.queryClient.prefetchQuery(jobsQueryOptions());
  },
  component: BrowseJobsPage,
});
