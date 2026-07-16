import { createFileRoute } from "@tanstack/react-router";
import { ProfilePage } from "@/pages/ProfilePage";
import { candidateProfileQuery } from "@/queries/candidate.queries";
import { ProfileSkeleton } from "@/components/loadingSpinners/ProfileSkeleton";

// export const Route = createFileRoute("/profile/")({
//   loader: ({ context }) => context.queryClient.prefetchQuery(candidateProfileQuery),
//   component: ProfilePage,
// });

export const Route = createFileRoute("/profile/")({
  loader: ({ context }) => context.queryClient.ensureQueryData(candidateProfileQuery),
  pendingComponent: ProfileSkeleton,
  pendingMs: 200,
  pendingMinMs: 300,
  errorComponent: ({ error }) => <div>Failed to load profile: {error.message}</div>,
  component: ProfilePage,
});
