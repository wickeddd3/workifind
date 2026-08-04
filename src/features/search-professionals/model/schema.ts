import { z } from "zod";

export const ProfessionalFilterSchema = z.object({
  q: z.string().trim().optional(),
  location: z.string().trim().optional(),
  employmentType: z.string().optional(),
  locationType: z.string().optional(),
  availability: z.string().optional(),
  experienced: z.string().optional(),
});

export type ProfessionalFilterSchemaType = z.infer<
  typeof ProfessionalFilterSchema
>;
