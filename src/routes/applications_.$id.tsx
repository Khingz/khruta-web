import { ApplicationDetailsPage } from "@/pages/ApplicationDetailsPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/applications_/$id")({
  head: () => ({
    meta: [
      { title: "Khruta - Application Details" },
      {
        name: "description",
        content:
          "View full details of your application, including status updates, submitted documents, and any next steps.",
      },
    ],
  }),
  component: ApplicationDetailsPage,
});
