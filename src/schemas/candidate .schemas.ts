import { z } from "zod";

export type CandidateId = z.infer<typeof CandidateIdSchema>;

export const CandidateIdSchema = z
  .string()
  .regex(/^[a-zA-Z0-9]{15}([a-zA-Z0-9]{3})?$/, "Invalid Salesforce ID format");
