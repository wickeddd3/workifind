import { z } from "zod";

export const JobFilterSchema = z.object({
  q: z.string().optional(),
  employmentType: z.string().optional(),
  salary: z.string().optional(),
  locationType: z.string().optional(),
});

export type JobFilterSchemaType = z.infer<typeof JobFilterSchema>;
