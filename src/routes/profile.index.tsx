import { createFileRoute } from "@tanstack/react-router";
import { ProfilePage } from "@/pages/ProfilePage";
import { candidateProfileQuery } from "@/queries/candidate.queries";

export const Route = createFileRoute("/profile/")({
  loader: ({ context }) => context.queryClient.ensureQueryData(candidateProfileQuery),
  component: ProfilePage,
});
