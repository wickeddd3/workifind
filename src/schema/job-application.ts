import { z } from "zod";

export const JobApplicationSchema = z.object({
  pitch: z
    .string()
    .min(
      200,
      "Explain why you are suitable for this role using minimum of 200 characters",
    )
    .max(
      2000,
      "Explain why you are suitable for this role using maximum of 2000 characters",
    ),
});

export type JobApplicationSchemaType = z.infer<typeof JobApplicationSchema>;
