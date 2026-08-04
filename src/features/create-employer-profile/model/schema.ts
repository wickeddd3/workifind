import { z } from "zod";

// From `client`, not the full barrel: `ui/ProfileForm.tsx` is `"use client"`
// and imports this file, so the barrel's query re-exports would put
// PrismaClient in the browser bundle.
import { LogoUploadSchema } from "@/entities/employer/client";
import { INDUSTRY_TYPES } from "@/shared/constants/tags";
import { requiredString } from "@/shared/schema/utils";

export const EmployerPerkSchema = z.object({
  name: z.string(),
});

export const EmployerProfileSchema = z.object({
  companyName: requiredString.max(100),
  companyEmail: z.string().trim().max(100).email().optional().or(z.literal("")),
  companyWebsite: z.string().trim().max(100).optional().or(z.literal("")),
  /** The signed reference the upload route issued, not the file. */
  logoToken: LogoUploadSchema,
  industry: requiredString.refine(
    (value) => INDUSTRY_TYPES.map((type) => type.value).includes(value),
    "Invalid industry",
  ),
  location: z.string().trim().max(100).optional(),
  about: z.string().trim().max(8000).optional(),
  pitch: z.string().trim().max(8000).optional(),
  perks: z.array(EmployerPerkSchema).optional(),
});

export type EmployerProfileSchemaType = z.infer<typeof EmployerProfileSchema>;
