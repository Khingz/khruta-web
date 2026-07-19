import { createFileRoute } from "@tanstack/react-router";
import { ApplicationsPage } from "@/pages/ApplicationsPage";
import { AppFiltersSchema } from "@/schemas/application.schemas";
import { appsQueryOptions } from "@/queries/application.queries";

export const Route = createFileRoute("/applications")({
  validateSearch: AppFiltersSchema,
  loaderDeps: ({ search }) => ({ filters: search }),
  loader: async ({ context, deps }) => {
    await context.queryClient.prefetchQuery(appsQueryOptions(deps.filters));
  },
  component: ApplicationsPage,
});
