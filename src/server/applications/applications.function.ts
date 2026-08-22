import { AppFiltersSchema, AppId, AppIdSchema } from "@/schemas/application.schemas";
import { createServerFn } from "@tanstack/react-start";
import {
  createApplication,
  getApplicationById,
  getUserApplications,
  updateApplication,
} from "./applications.server";
import { ApplyPayload, UpdateAppPayload } from "@/types";
import { auth } from "@clerk/tanstack-react-start/server";

type OfferResponseInput = {
  id: AppId;
  data: UpdateAppPayload;
};

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

    const app = await createApplication(data);

    return app;
  });

export const appUpdate = createServerFn({ method: "POST" })
  .validator((input: OfferResponseInput) => input)
  .handler(async ({ data }) => {
    const { isAuthenticated } = await auth();

    if (!isAuthenticated) {
      throw new Error("Not authenticated");
    }

    const app = await updateApplication(data.data, data.id);

    return app;
  });
