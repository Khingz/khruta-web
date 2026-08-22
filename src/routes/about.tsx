import { createFileRoute } from "@tanstack/react-router";
import { AboutPage } from "@/pages/AboutPage";
export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Khruta - About Us" },
      {
        name: "description",
        content:
          "Khruta is a candidate-focused recruitment platform built to make job hunting simpler, faster, and less frustrating — helping you find roles that truly fit you.",
      },
    ],
  }),
  component: AboutPage,
});
