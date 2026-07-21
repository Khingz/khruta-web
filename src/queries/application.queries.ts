import { AppFilters, AppId } from "@/schemas/application.schemas";
import { getAppById, getUserApps } from "@/server/applications/applications.function";
import { queryOptions } from "@tanstack/react-query";

export const appsQueryOptions = (filters: AppFilters) =>
  queryOptions({
    queryKey: ["applications", filters],
    queryFn: () => getUserApps({ data: filters }),
  });

export const appQueryOptions = (id: AppId) =>
  queryOptions({
    queryKey: ["applications", id],
    queryFn: () => getAppById({ data: id }),
  });
