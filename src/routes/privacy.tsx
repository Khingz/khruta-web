import { createFileRoute } from "@tanstack/react-router";
import { PrivacyPage } from "@/pages/PrivacyPage";
export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Khruta - Privacy" },
      {
        name: "description",
        content: "Learn how Khruta collects, uses, and protects your personal information.",
      },
    ],
  }),
  component: PrivacyPage,
});
