import { createFileRoute } from "@tanstack/react-router";
import { TermsPage } from "@/pages/TermsPage";
export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Khruta - Privacy" },
      {
        name: "description",
        content: "Review the terms and conditions for using Khruta.",
      },
    ],
  }),
  component: TermsPage,
});
