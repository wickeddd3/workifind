import { z } from "zod";

import { INDUSTRY_TYPES } from "@/shared/constants/tags";
import { requiredString } from "@/shared/schema/utils";

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

/* -------------------------------------------------------------------------- */
/*  Sections                                                                    */
/* -------------------------------------------------------------------------- */

/**
 * The company profile is edited a section at a time, so each section owns the
 * fields it writes and can be validated on its own. Previously one schema
 * covered all nine fields at once, which meant an industry that had since been
 * retired from the list blocked saving an unrelated perk — and the save posted
 * every field back, so a section the employer never opened was rewritten anyway.
 *
 * They mirror the read side one-for-one — EmployerHeader, EmployerOverview, the
 * About, the pitch, the perks — so a section on the edit page always
 * corresponds to a block on the profile page.
 */

export const EmployerIdentitySchema = z.object({
  companyName: requiredString.max(100),
  companyEmail: z.string().trim().max(100).email().optional().or(z.literal("")),
  companyWebsite: z.string().trim().max(100).optional().or(z.literal("")),
  companyLogo: CompanyLogoSchema,
});

export const EmployerOverviewSchema = z.object({
  industry: requiredString.refine(
    (value) => INDUSTRY_TYPES.map((type) => type.value).includes(value),
    "Invalid industry",
  ),
  location: z.string().trim().max(100).optional(),
});

export const EmployerAboutSchema = z.object({
  about: z.string().trim().max(8000).optional(),
});

export const EmployerCultureSchema = z.object({
  pitch: z.string().trim().max(8000).optional(),
});

export const EmployerPerksSchema = z.object({
  perks: z.array(EmployerPerkSchema).optional(),
});

/**
 * Keyed by section so the server action can pick the right validator from the
 * section name it is given, rather than switching by hand.
 */
export const EMPLOYER_SECTION_SCHEMAS = {
  identity: EmployerIdentitySchema,
  overview: EmployerOverviewSchema,
  about: EmployerAboutSchema,
  culture: EmployerCultureSchema,
  perks: EmployerPerksSchema,
} as const;

export type EmployerSection = keyof typeof EMPLOYER_SECTION_SCHEMAS;

export type EmployerSectionValues = {
  [S in EmployerSection]: z.infer<(typeof EMPLOYER_SECTION_SCHEMAS)[S]>;
};

/** A section name paired with the values that section is allowed to write. */
export type EmployerSectionPayload = {
  [S in EmployerSection]: { section: S; values: EmployerSectionValues[S] };
}[EmployerSection];

export type EmployerIdentitySchemaType = z.infer<typeof EmployerIdentitySchema>;
export type EmployerOverviewSchemaType = z.infer<typeof EmployerOverviewSchema>;
export type EmployerAboutSchemaType = z.infer<typeof EmployerAboutSchema>;
export type EmployerCultureSchemaType = z.infer<typeof EmployerCultureSchema>;
export type EmployerPerksSchemaType = z.infer<typeof EmployerPerksSchema>;
