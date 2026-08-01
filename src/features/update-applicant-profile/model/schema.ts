import validator from "validator";
import { z } from "zod";

import { WORK_EXPERIENCE_TYPES } from "@/shared/constants/tags";
import { requiredNumeric, requiredString } from "@/shared/schema/utils";

export const ApplicantSkillSchema = z.object({
  name: z.string(),
});

export const ApplicantLanguageSchema = z.object({
  name: z.string(),
});

export const ApplicantLocationSchema = z.object({
  name: z.string(),
});

/* -------------------------------------------------------------------------- */
/*  Sections                                                                    */
/* -------------------------------------------------------------------------- */

/**
 * The profile is edited a section at a time, so each section owns the fields it
 * writes and can be validated on its own. Previously one schema covered all
 * fourteen fields at once, which meant a stale phone number blocked saving an
 * unrelated skill.
 *
 * The sections compose back into `ApplicantProfileSchema` at the bottom of this
 * file, so the whole-profile shape stays derived from these rather than being a
 * second definition that can drift.
 *
 * They mirror the read side one-for-one — ApplicantHeader, ApplicantBio,
 * ApplicantSkills, ApplicantLanguages, ApplicantPreferences — so a section on
 * the edit page always corresponds to a block on the profile page.
 */

export const ApplicantIdentitySchema = z.object({
  firstName: requiredString.max(100),
  lastName: requiredString.max(100),
  profession: requiredString.max(100),
  experienced: requiredString.refine(
    (value) => WORK_EXPERIENCE_TYPES.map((type) => type.value).includes(value),
    "Invalid experience type",
  ),
  email: z.string().trim().max(100).email(),
  phoneNumber: z
    .string()
    .refine(validator.isMobilePhone)
    .optional()
    .or(z.literal("")),
  location: z.string().trim().max(100).optional(),
});

export const ApplicantAboutSchema = z.object({
  about: z.string().trim().max(8000).optional(),
});

export const ApplicantSkillsSchema = z.object({
  skills: z.array(ApplicantSkillSchema).optional(),
});

export const ApplicantLanguagesSchema = z.object({
  languages: z.array(ApplicantLanguageSchema).optional(),
});

export const ApplicantPreferencesSchema = z.object({
  availability: requiredString.max(100),
  preferredEmploymentTypes: z.array(z.string()).optional(),
  preferredLocationTypes: z.array(z.string()).optional(),
  preferredLocations: z.array(ApplicantLocationSchema).optional(),
  salaryExpectation: z
    .union([
      z.string().optional(),
      requiredNumeric.nonnegative(
        "Salary expectation must be a non-negative number",
      ),
    ])
    .transform((val) => (val === "" ? 0 : val)),
});

/**
 * Keyed by section so the server action can pick the right validator from the
 * section name it is given, rather than switching by hand.
 */
export const APPLICANT_SECTION_SCHEMAS = {
  identity: ApplicantIdentitySchema,
  about: ApplicantAboutSchema,
  skills: ApplicantSkillsSchema,
  languages: ApplicantLanguagesSchema,
  preferences: ApplicantPreferencesSchema,
} as const;

export type ApplicantSection = keyof typeof APPLICANT_SECTION_SCHEMAS;

export type ApplicantSectionValues = {
  [S in ApplicantSection]: z.infer<(typeof APPLICANT_SECTION_SCHEMAS)[S]>;
};

/** A section name paired with the values that section is allowed to write. */
export type ApplicantSectionPayload = {
  [S in ApplicantSection]: { section: S; values: ApplicantSectionValues[S] };
}[ApplicantSection];

export type ApplicantIdentitySchemaType = z.infer<
  typeof ApplicantIdentitySchema
>;
export type ApplicantAboutSchemaType = z.infer<typeof ApplicantAboutSchema>;
export type ApplicantSkillsSchemaType = z.infer<typeof ApplicantSkillsSchema>;
export type ApplicantLanguagesSchemaType = z.infer<
  typeof ApplicantLanguagesSchema
>;
export type ApplicantPreferencesSchemaType = z.infer<
  typeof ApplicantPreferencesSchema
>;

/* -------------------------------------------------------------------------- */
/*  Whole profile                                                               */
/* -------------------------------------------------------------------------- */

/**
 * Composed from the sections above, not restated — the create-profile flow and
 * anything else that needs the whole shape stays in step with the sections by
 * construction.
 */
export const ApplicantProfileSchema = ApplicantIdentitySchema.merge(
  ApplicantAboutSchema,
)
  .merge(ApplicantSkillsSchema)
  .merge(ApplicantLanguagesSchema)
  .merge(ApplicantPreferencesSchema);

export type ApplicantProfileSchemaType = z.infer<typeof ApplicantProfileSchema>;
