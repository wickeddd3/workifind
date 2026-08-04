import { z } from "zod";

import {
  ApplicantCertificationEntrySchema,
  ApplicantEducationEntrySchema,
  ApplicantExperienceEntrySchema,
  ApplicantLanguageEntrySchema,
  ApplicantPreferredLocationEntrySchema,
  ApplicantSkillEntrySchema,
  AvatarUploadSchema,
  // From `client`, not the full barrel: `ui/ProfileForm.tsx` is `"use client"`
  // and imports this file, so the barrel's query re-exports would put
  // PrismaClient in the browser bundle.
} from "@/entities/applicant/client";
import { WORK_EXPERIENCE_TYPES } from "@/shared/constants/tags";
import {
  optionalAmount,
  optionalPhone,
  requiredString,
} from "@/shared/schema/utils";

export const ApplicantProfileSchema = z.object({
  /** The signed reference the upload route issued, not the file. */
  avatarToken: AvatarUploadSchema,
  firstName: requiredString.max(100),
  lastName: requiredString.max(100),
  email: z.string().trim().max(100).email(),
  phoneNumber: optionalPhone,
  location: z.string().trim().max(100).optional(),
  about: z.string().trim().max(8000).optional(),
  profession: requiredString.max(100),
  experienced: requiredString.refine(
    (value) => WORK_EXPERIENCE_TYPES.map((type) => type.value).includes(value),
    "Invalid experience type",
  ),
  skills: z.array(ApplicantSkillEntrySchema).max(60).optional(),
  languages: z.array(ApplicantLanguageEntrySchema).max(20).optional(),
  // The CV records are validated by the same entry schemas the editor uses, so
  // a profile created here and one edited later obey identical rules. All three
  // are optional: someone can finish signing up and fill them in afterwards.
  experiences: z.array(ApplicantExperienceEntrySchema).max(30).optional(),
  educations: z.array(ApplicantEducationEntrySchema).max(20).optional(),
  certifications: z.array(ApplicantCertificationEntrySchema).max(30).optional(),
  availability: requiredString.max(100),
  preferredEmploymentTypes: z.array(z.string()).optional(),
  preferredLocationTypes: z.array(z.string()).optional(),
  preferredLocations: z
    .array(ApplicantPreferredLocationEntrySchema)
    .max(20)
    .optional(),
  salaryExpectation: optionalAmount,
});

export type ApplicantProfileSchemaType = z.infer<typeof ApplicantProfileSchema>;
