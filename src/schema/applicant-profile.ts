import { z } from "zod";
import { requiredNumeric, requiredString } from "@/schema/utils";
import validator from "validator";
import { WORK_EXPERIENCE_TYPES } from "@/constants/tags";

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
