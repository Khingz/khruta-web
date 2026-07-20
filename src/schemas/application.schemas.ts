import { z } from "zod";

export const AppFiltersSchema = z.object({
  q: z.string().optional(),
  pageSize: z.number().optional(),
  candidateId: z.string(),
  stage: z.string().optional(),
});

export type AppFilters = z.infer<typeof AppFiltersSchema>;
