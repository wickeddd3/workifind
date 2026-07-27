import { z } from "zod";

export const CompanyFilterSchema = z.object({
  q: z.string().trim().optional(),
});

export type CompanyFilterSchemaType = z.infer<typeof CompanyFilterSchema>;
