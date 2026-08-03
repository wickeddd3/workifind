import validator from "validator";
import { z } from "zod";

import {
  ApplicantCertificationEntrySchema,
  ApplicantEducationEntrySchema,
  ApplicantExperienceEntrySchema,
  // From `client`, not the full barrel: `ui/ProfileForm.tsx` is `"use client"`
  // and imports this file, so the barrel's query re-exports would put
  // PrismaClient in the browser bundle.
} from "@/entities/applicant/client";
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

export const ApplicantProfileSchema = z.object({
  firstName: requiredString.max(100),
  lastName: requiredString.max(100),
  email: z.string().trim().max(100).email(),
  phoneNumber: z
    .string()
    .refine(validator.isMobilePhone)
    .optional()
    .or(z.literal("")),
  location: z.string().trim().max(100).optional(),
  about: z.string().trim().max(8000).optional(),
  profession: requiredString.max(100),
  experienced: requiredString.refine(
    (value) => WORK_EXPERIENCE_TYPES.map((type) => type.value).includes(value),
    "Invalid experience type",
  ),
  skills: z.array(ApplicantSkillSchema).optional(),
  languages: z.array(ApplicantLanguageSchema).optional(),
  // The CV records are validated by the same entry schemas the editor uses, so
  // a profile created here and one edited later obey identical rules. All three
  // are optional: someone can finish signing up and fill them in afterwards.
  experiences: z.array(ApplicantExperienceEntrySchema).max(30).optional(),
  educations: z.array(ApplicantEducationEntrySchema).max(20).optional(),
  certifications: z.array(ApplicantCertificationEntrySchema).max(30).optional(),
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

export type ApplicantProfileSchemaType = z.infer<typeof ApplicantProfileSchema>;
