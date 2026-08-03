import { IntFiltersSchema } from "@/schemas/interview.schemas";
import { createServerFn } from "@tanstack/react-start";
import { getUserInterviews } from "./interviews.server";

export const getUserInts = createServerFn({ method: "GET" })
  .validator((filters?: unknown) => IntFiltersSchema.parse(filters ?? {}))
  .handler(async ({ data: filters }) => {
    return getUserInterviews(filters);
  });
