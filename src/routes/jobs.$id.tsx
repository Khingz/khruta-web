import { createFileRoute } from "@tanstack/react-router";
import { JobDetailsPage } from "@/pages/JobDetailsPage";
import { getJobById } from "@/server/jobs/jobs.functions";
import { queryOptions } from "@tanstack/react-query";
import { JobId } from "@/server/jobs/jobs.server";

export const jobQueryOptions = (id: JobId) =>
  queryOptions({
    queryKey: ["jobs", id],
    queryFn: () => getJobById({ data: id }),
  });

export const Route = createFileRoute("/jobs/$id")({
  loader: async ({ context, params }) => {
    context.queryClient.ensureQueryData(jobQueryOptions(params.id));
  },
  component: JobDetailsPage,
});
