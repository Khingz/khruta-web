import { createFileRoute } from "@tanstack/react-router";
import { SavedJobsPage } from "@/pages/SavedJobsPage";
export const Route = createFileRoute("/saved")({
  head: () => ({
    meta: [
      { title: "Khruta - Saved Jobs" },
      {
        name: "description",
        content:
          "All the roles you've bookmarked, in one place — pick up right where you left off.",
      },
    ],
  }),
  component: SavedJobsPage,
});
