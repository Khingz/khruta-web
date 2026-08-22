import { createFileRoute } from "@tanstack/react-router";
import { SettingsPage } from "@/pages/SettingsPage";
export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Khruta - Setting" },
      {
        name: "description",
        content: "Manage your account preferences, notifications, and privacy controls.",
      },
    ],
  }),
  component: SettingsPage,
});
