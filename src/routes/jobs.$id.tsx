import { createFileRoute } from "@tanstack/react-router";
import { JobDetailsPage } from "@/pages/JobDetailsPage";
import { jobQueryOptions } from "@/queries/job.queries";

export const Route = createFileRoute("/jobs/$id")({
  head: () => ({
    meta: [
      { title: "Khruta - Job Details" },
      {
        name: "description",
        content:
          "Get the full details on this role — responsibilities, requirements, and everything you need to decide if it's the right fit.",
      },
    ],
  }),
  loader: async ({ context, params }) => {
    await context.queryClient.prefetchQuery(jobQueryOptions(params.id));
  },
  component: JobDetailsPage,
});
