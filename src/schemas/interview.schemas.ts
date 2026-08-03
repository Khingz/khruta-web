import { z } from "zod";

export const IntFiltersSchema = z.object({
  pageSize: z.number().optional(),
  candidateId: z
    .string()
    .regex(/^[a-zA-Z0-9]{15}([a-zA-Z0-9]{3})?$/, "Invalid Salesforce ID format"),
  stage: z.string().optional(),
});

export type IntFilters = z.infer<typeof IntFiltersSchema>;
