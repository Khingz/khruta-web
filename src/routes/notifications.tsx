import { createFileRoute } from "@tanstack/react-router";
import { NotificationsPage } from "@/pages/NotificationsPage";
export const Route = createFileRoute("/notifications")({
  head: () => ({
    meta: [
      { title: "Khruta - Notifications" },
      {
        name: "description",
        content:
          "Stay in the loop — get updates on application status, new job matches, and messages, all in one place.",
      },
    ],
  }),
  component: NotificationsPage,
});
