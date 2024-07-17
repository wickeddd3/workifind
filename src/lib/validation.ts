import { z } from "zod";

export const jobFilterSchema = z.object({
  q: z.string().optional(),
  type: z.string().optional(),
  salary: z.string().optional(),
  setup: z.string().optional(),
});

export type JobFilterValues = z.infer<typeof jobFilterSchema>;
