import { createFileRoute } from "@tanstack/react-router";
import { DashboardPage } from "@/pages/DashboardPage";
import { requireAuth } from "@/lib/auth.function";
export const Route = createFileRoute("/dashboard")({
  beforeLoad: async () => await requireAuth(),
  component: DashboardPage,
});
