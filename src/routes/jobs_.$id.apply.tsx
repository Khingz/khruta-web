import { createFileRoute, redirect } from "@tanstack/react-router";
import { ApplyPage } from "@/pages/ApplyPage";
import { candidateProfileQuery } from "@/queries/candidate.queries";

export const Route = createFileRoute("/jobs_/$id/apply")({
  head: () => ({
    meta: [
      { title: "Khruta - Apply" },
      {
        name: "description",
        content:
          "Get the full details on this role — responsibilities, requirements, and everything you need to decide if it's the right fit.",
      },
    ],
  }),
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
