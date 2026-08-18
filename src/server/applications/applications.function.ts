import { AppFiltersSchema, AppId, AppIdSchema } from "@/schemas/application.schemas";
import { createServerFn } from "@tanstack/react-start";
import {
  createApplication,
  getApplicationById,
  getUserApplications,
  updateApplicationOffer,
} from "./applications.server";
import { ApplyPayload, OfferResponsePayload } from "@/types";
import { auth } from "@clerk/tanstack-react-start/server";

type OfferResponseInput = {
  id: AppId;
  data: OfferResponsePayload;
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

export const offerResponse = createServerFn({ method: "POST" })
  .validator((input: OfferResponseInput) => input)
  .handler(async ({ data }) => {
    const { isAuthenticated } = await auth();

    if (!isAuthenticated) {
      throw new Error("Not authenticated");
    }

    const app = await updateApplicationOffer(data.data, data.id);

    return app;
  });
