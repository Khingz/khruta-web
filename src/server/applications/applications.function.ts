import { AppFiltersSchema, AppIdSchema } from "@/schemas/application.schemas";
import { createServerFn } from "@tanstack/react-start";
import { getApplicationById, getUserApplications } from "./applications.server";

export const getUserApps = createServerFn({ method: "GET" })
  .validator((filters?: unknown) => AppFiltersSchema.parse(filters ?? {}))
  .handler(async ({ data: filters }) => {
    return getUserApplications(filters);
  });

export const getAppById = createServerFn({ method: "GET" })
  .validator(AppIdSchema)
  .handler(async ({ data: id }) => {
    return getApplicationById(id);
  });
