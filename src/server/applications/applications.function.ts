import { AppFiltersSchema, AppIdSchema } from "@/schemas/application.schemas";
import { createServerFn } from "@tanstack/react-start";
import { createApplication, getApplicationById, getUserApplications } from "./applications.server";
import { ApplyPayload } from "@/types";
import { auth } from "@clerk/tanstack-react-start/server";

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

export const createApp = createServerFn({ method: "POST" })
  .validator((data: ApplyPayload) => data)
  .handler(async ({ data }) => {
    const { isAuthenticated } = await auth();

    if (!isAuthenticated) {
      throw new Error("Not authenticated");
    }

    const updated = await createApplication(data);

    return updated;
  });
