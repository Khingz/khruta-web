import { createFileRoute, redirect } from "@tanstack/react-router";
import { ApplicationsPage } from "@/pages/ApplicationsPage";
import { AppFiltersSchema } from "@/schemas/application.schemas";
import { appsQueryOptions } from "@/queries/application.queries";
import { candidateProfileQuery } from "@/queries/candidate.queries";

// export const Route = createFileRoute("/applications")({
//   validateSearch: AppFiltersSchema,
//   loaderDeps: ({ search }) => ({ filters: search }),
//   loader: async ({ context, deps }) => {
//     await context.queryClient.prefetchQuery(appsQueryOptions(deps.filters));
//   },
//   component: ApplicationsPage,
// });

export const Route = createFileRoute("/applications")({
  validateSearch: AppFiltersSchema,
  loaderDeps: ({ search }) => ({ filters: search }),
  beforeLoad: async ({ context }) => {
    const profile = await context.queryClient.ensureQueryData(candidateProfileQuery);
    const candidateId = profile?.data?.id;

    if (!candidateId) {
      throw redirect({
        to: "/login",
        search: { redirect: "/applications" },
      });
    }

    return { candidateId };
  },
  loader: async ({ context, deps }) => {
    await context.queryClient.prefetchQuery(
      appsQueryOptions({ ...deps.filters, candidateId: context.candidateId }),
    );
  },
  component: ApplicationsPage,
});
