import { createFileRoute } from "@tanstack/react-router";
import { JobDetailsPage } from "@/pages/JobDetailsPage";
import { getJobById } from "@/server/jobs/jobs.functions";
import { queryOptions } from "@tanstack/react-query";
import { JobId } from "@/server/jobs/jobs.server";
import { jobQueryOptions } from "@/queries/job.queries";

export const Route = createFileRoute("/jobs/$id")({
  loader: async ({ context, params }) => {
    context.queryClient.prefetchQuery(jobQueryOptions(params.id));
  },
  component: JobDetailsPage,
});
