import { z } from "zod";

export const JobFiltersSchema = z.object({
  q: z.string().optional(),
  location: z.string().optional(),
  department: z.string().optional(),
  type: z.string().optional(),
  page: z.number().optional(),
  pageSize: z.number().optional(),
  minOffer: z.number().optional(),
  maxOffer: z.number().optional(),
});

export type JobFilters = z.infer<typeof JobFiltersSchema>;

export type JobId = z.infer<typeof JobIdSchema>;

export const JobIdSchema = z
  .string()
  .regex(/^[a-zA-Z0-9]{15}([a-zA-Z0-9]{3})?$/, "Invalid Salesforce ID format");
