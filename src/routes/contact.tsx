import { createFileRoute } from "@tanstack/react-router";
import { ContactPage } from "@/pages/ContactPage";
export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Khruta - Contact" },
      {
        name: "description",
        content:
          "Have a question or need help? Reach out to the Khruta team — we're here to support your job search every step of the way.",
      },
    ],
  }),
  component: ContactPage,
});
