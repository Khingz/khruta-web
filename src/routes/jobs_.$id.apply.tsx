import { createFileRoute, redirect } from "@tanstack/react-router";
import { ApplyPage } from "@/pages/ApplyPage";
import { candidateProfileQuery } from "@/queries/candidate.queries";

export const Route = createFileRoute("/jobs_/$id/apply")({
  beforeLoad: async ({ context }) => {
    const profile = await context.queryClient.ensureQueryData(candidateProfileQuery);
    const candidateId = profile?.data?.id;

    if (!candidateId) {
      throw redirect({
        to: "/login",
      });
    }

    return { candidateId };
  },
  component: ApplyPage,
});
