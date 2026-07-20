import { z } from "zod";

export const AppFiltersSchema = z.object({
  q: z.string().optional(),
  pageSize: z.number().optional(),
  candidateId: z.string(),
});

export type AppFilters = z.infer<typeof AppFiltersSchema>;
