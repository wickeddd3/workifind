import { z } from "zod";

export const CompanyFilterSchema = z.object({
  q: z.string().trim().optional(),
  location: z.string().trim().optional(),
  industry: z.string().optional(),
  // A checkbox submits "on" when ticked and nothing at all when not, so this is
  // a presence test rather than a boolean coercion.
  hiring: z
    .union([z.literal("on"), z.literal("1")])
    .optional()
    .transform((value) => Boolean(value)),
});

export type CompanyFilterSchemaType = z.infer<typeof CompanyFilterSchema>;
