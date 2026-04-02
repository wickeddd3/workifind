import { z } from "zod";

export const ProfessionalFilterSchema = z.object({
  q: z.string().trim().optional(),
});

export type ProfessionalFilterSchemaType = z.infer<
  typeof ProfessionalFilterSchema
>;
