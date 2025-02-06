import { z } from "zod";
import { requiredString } from "@/schema/utils";
import { INDUSTRY_TYPES } from "@/constants/tags";

const CompanyLogoSchema = z
  .custom<File | undefined>()
  .refine(
    (file) => !file || (file instanceof File && file.type.startsWith("image/")),
    "Must be an image file",
  )
  .refine((file) => {
    return !file || file.size < 1024 * 1024 * 2;
  }, "File must be less than 2MB");

export const EmployerPerkSchema = z.object({
  name: z.string(),
});

export const EmployerProfileSchema = z.object({
  companyName: requiredString.max(100),
  companyEmail: z.string().trim().max(100).email().optional().or(z.literal("")),
  companyWebsite: z.string().trim().max(100).optional().or(z.literal("")),
  companyLogo: CompanyLogoSchema,
  industry: requiredString.refine(
    (value) => INDUSTRY_TYPES.includes(value),
    "Invalid industry",
  ),
  location: z.string().trim().max(100).optional(),
  about: z.string().trim().max(8000).optional(),
  pitch: z.string().trim().max(8000).optional(),
  perks: z.array(EmployerPerkSchema).optional(),
});

export type EmployerProfileSchemaType = z.infer<typeof EmployerProfileSchema>;
