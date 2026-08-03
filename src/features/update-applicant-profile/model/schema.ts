import validator from "validator";
import { z } from "zod";

import {
  ApplicantCertificationEntrySchema,
  ApplicantEducationEntrySchema,
  ApplicantExperienceEntrySchema,
  ApplicantLanguageEntrySchema,
  ApplicantPreferredLocationEntrySchema,
  ApplicantSkillEntrySchema,
  // From `client`, not the full barrel: the section components are
  // `"use client"` and import this file, so the barrel's query re-exports would
  // put PrismaClient in the browser bundle.
} from "@/entities/applicant/client";
import { WORK_EXPERIENCE_TYPES } from "@/shared/constants/tags";
import { requiredNumeric, requiredString } from "@/shared/schema/utils";

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
  skills: z.array(ApplicantSkillEntrySchema).max(60).optional(),
});

export const ApplicantLanguagesSchema = z.object({
  languages: z.array(ApplicantLanguageEntrySchema).max(20).optional(),
});

/**
 * The three CV sections. Their entry shapes live in the applicant entity,
 * because the create-profile flow writes the same records and validating them
 * two different ways is how the rest of this profile already drifted.
 *
 * The caps are there so one section save cannot become an unbounded write; they
 * are far above any real CV.
 */

export const ApplicantExperienceSchema = z.object({
  experiences: z.array(ApplicantExperienceEntrySchema).max(30).optional(),
});

export const ApplicantEducationSchema = z.object({
  educations: z.array(ApplicantEducationEntrySchema).max(20).optional(),
});

export const ApplicantCertificationsSchema = z.object({
  certifications: z.array(ApplicantCertificationEntrySchema).max(30).optional(),
});

export const ApplicantPreferencesSchema = z.object({
  availability: requiredString.max(100),
  preferredEmploymentTypes: z.array(z.string()).optional(),
  preferredLocationTypes: z.array(z.string()).optional(),
  preferredLocations: z
    .array(ApplicantPreferredLocationEntrySchema)
    .max(20)
    .optional(),
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
  experience: ApplicantExperienceSchema,
  education: ApplicantEducationSchema,
  certifications: ApplicantCertificationsSchema,
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
export type ApplicantExperienceSchemaType = z.infer<
  typeof ApplicantExperienceSchema
>;
export type ApplicantEducationSchemaType = z.infer<
  typeof ApplicantEducationSchema
>;
export type ApplicantCertificationsSchemaType = z.infer<
  typeof ApplicantCertificationsSchema
>;
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
  .merge(ApplicantExperienceSchema)
  .merge(ApplicantEducationSchema)
  .merge(ApplicantCertificationsSchema)
  .merge(ApplicantSkillsSchema)
  .merge(ApplicantLanguagesSchema)
  .merge(ApplicantPreferencesSchema);

export type ApplicantProfileSchemaType = z.infer<typeof ApplicantProfileSchema>;
