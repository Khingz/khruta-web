import { z } from "zod";

export const AppFiltersSchema = z.object({
  q: z.string().optional(),
  pageSize: z.number().optional(),
  candidateId: z.string(),
  stage: z.string().optional(),
});

export type AppFilters = z.infer<typeof AppFiltersSchema>;

export const AppIdSchema = z
  .string()
  .regex(/^[a-zA-Z0-9]{15}([a-zA-Z0-9]{3})?$/, "Invalid Salesforce ID format");

export type AppId = z.infer<typeof AppIdSchema>;
