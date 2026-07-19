import { AppFiltersSchema } from "@/schemas/application.schemas";
import { createServerFn } from "@tanstack/react-start";
import { getUserApplications } from "./applications.server";

export const getUserApps = createServerFn({ method: "GET" })
  .validator((filters?: unknown) => AppFiltersSchema.parse(filters ?? {}))
  .handler(async ({ data: filters }) => {
    return getUserApplications(filters);
  });
