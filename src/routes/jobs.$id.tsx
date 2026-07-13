import { createFileRoute } from "@tanstack/react-router";
import { JobDetailsPage } from "@/pages/JobDetailsPage";
import { jobQueryOptions } from "@/queries/job.queries";

export const Route = createFileRoute("/jobs/$id")({
  loader: async ({ context, params }) => {
    await context.queryClient.prefetchQuery(jobQueryOptions(params.id));
  },
  component: JobDetailsPage,
});
