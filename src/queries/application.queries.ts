import { AppFilters } from "@/schemas/application.schemas";
import { getUserApps } from "@/server/applications/applications.function";
import { queryOptions } from "@tanstack/react-query";

export const appsQueryOptions = (filters: AppFilters) =>
  queryOptions({
    queryKey: ["applications", filters],
    queryFn: () => getUserApps({ data: filters }),
  });
