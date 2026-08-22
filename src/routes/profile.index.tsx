import { createFileRoute } from "@tanstack/react-router";
import { ProfilePage } from "@/pages/ProfilePage";
import { candidateProfileQuery } from "@/queries/candidate.queries";
import { ProfileSkeleton } from "@/components/loadingSpinners/ProfileSkeleton";

export const Route = createFileRoute("/profile/")({
  head: () => ({
    meta: [
      { title: "Khruta - Profile" },
      {
        name: "description",
        content:
          "Your professional identity on Khruta — skills, experience, and preferences that help you get matched to the right roles.",
      },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(candidateProfileQuery),
  pendingComponent: ProfileSkeleton,
  pendingMs: 200,
  pendingMinMs: 300,
  errorComponent: ({ error }) => <div>Failed to load profile: {error.message}</div>,
  component: ProfilePage,
});
