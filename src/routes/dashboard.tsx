import { createFileRoute } from "@tanstack/react-router";
import { DashboardPage } from "@/pages/DashboardPage";
import { requireAuth } from "@/lib/auth.function";
export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Khruta - Dashboard" },
      {
        name: "description",
        content:
          "Your job search, organized. See your applications, saved jobs, and recommended matches all in one place.",
      },
    ],
  }),
  beforeLoad: async () => await requireAuth(),
  component: DashboardPage,
});
