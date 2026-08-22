import { createFileRoute } from "@tanstack/react-router";
import { OffersPage } from "@/pages/OffersPage";
export const Route = createFileRoute("/offers")({
  head: () => ({
    meta: [
      { title: "Khruta - Offers" },
      {
        name: "description",
        content:
          "Review your job offer details, including role, terms, and next steps, before you accept.",
      },
    ],
  }),
  component: OffersPage,
});
