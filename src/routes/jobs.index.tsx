import { createFileRoute } from "@tanstack/react-router";
import { BrowseJobsPage } from "@/pages/BrowseJobsPage";

export const Route = createFileRoute("/jobs/")({
  component: BrowseJobsPage,
  validateSearch: (
    s: Record<string, unknown>,
  ): {
    q?: string;
    location?: string;
    category?: string;
    type?: string;
    remote?: string;
    level?: string;
    page?: number;
  } => ({
    q: (s.q as string) || undefined,
    location: (s.location as string) || undefined,
    category: (s.category as string) || undefined,
    type: (s.type as string) || undefined,
    remote: (s.remote as string) || undefined,
    level: (s.level as string) || undefined,
    page: s.page ? Number(s.page) : undefined,
  }),
});
