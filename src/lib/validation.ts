import { z } from "zod";
import validator from "validator";
import { employmentTypes, locationTypes } from "@/lib/job-types";
import { industryTypes } from "@/lib/company-types";

const requiredString = z.string().min(1, "Required");
const requiredBoolean = z.boolean({
  required_error: "Required",
  invalid_type_error: "Must be a boolean",
});
const requiredNumeric = z.number().positive().lte(999999999);

const companyLogoSchema = z
  .custom<File | undefined>()
  .refine(
    (file) => !file || (file instanceof File && file.type.startsWith("image/")),
    "Must be an image file",
  )
  .refine((file) => {
    return !file || file.size < 1024 * 1024 * 2;
  }, "File must be less than 2MB");

const locationSchema = z
  .object({
    locationType: requiredString.refine(
      (value) => locationTypes.includes(value),
      "Invalid location type",
    ),
    location: z.string().max(100).optional(),
  })
  .refine(
    (data) =>
      !data.locationType || data.locationType === "Remote" || data.location,
    {
      message: "Location is required for on-site jobs",
      path: ["location"],
    },
  );

export const createJobSchema = z
  .object({
    title: requiredString.max(100),
    employmentType: requiredString.refine(
      (value) => employmentTypes.includes(value),
      "Invalid job type",
    ),
    description: z.string().max(5000).optional(),
    minSalary: z
      .union([
        z.string().optional(),
        z.number().nonnegative("Minimum salary must be a non-negative number"),
      ])
      .transform((val) => (val === "" ? 0 : val)),
    maxSalary: z
      .union([
        z.string().optional(),
        z.number().nonnegative("Maximum salary must be a non-negative number"),
      ])
      .transform((val) => (val === "" ? 0 : val)),
  })
  .and(locationSchema)
  .refine(
    (data) => {
      const { minSalary, maxSalary } = data;
      if (minSalary === 0 && maxSalary === 0) {
        return true; // Skip validation if both are 0
      }
      if (Number(minSalary) <= Number(maxSalary)) {
        return true; // Skip validation if minSalary is less than or equal to maxSalary
      }
      return false;
    },
    {
      message:
        "Both minimum and maximum salary must be filled or both should be empty and maximum salary must be greater than or equal to minimum salary",
      path: ["minSalary"],
    },
  );

export type CreateJobValues = z.infer<typeof createJobSchema>;

export const jobFilterSchema = z.object({
  q: z.string().optional(),
  employmentType: z.string().optional(),
  salary: z.string().optional(),
  locationType: z.string().optional(),
});

export type JobFilterValues = z.infer<typeof jobFilterSchema>;

export const employerPerkSchema = z.object({
  name: z.string(),
});

export const createEmployerProfileSchema = z.object({
  companyName: requiredString.max(100),
  companyEmail: z.string().max(100).email().optional().or(z.literal("")),
  companyWebsite: z.string().max(100).optional().or(z.literal("")),
  companyLogo: companyLogoSchema,
  industry: requiredString.refine(
    (value) => industryTypes.includes(value),
    "Invalid industry",
  ),
  location: z.string().max(100).optional(),
  about: z.string().max(8000).optional(),
  pitch: z.string().max(8000).optional(),
  perks: z.array(employerPerkSchema).optional(),
});

export type CreateEmployerProfileValues = z.infer<
  typeof createEmployerProfileSchema
>;

export const applicantSkillSchema = z.object({
  name: z.string(),
});

export const applicantLanguageSchema = z.object({
  name: z.string(),
});

export const applicantLocationSchema = z.object({
  name: z.string(),
});

export const createApplicantProfileSchema = z.object({
  firstName: requiredString.max(100),
  lastName: requiredString.max(100),
  email: z.string().max(100).email(),
  phoneNumber: z
    .string()
    .refine(validator.isMobilePhone)
    .optional()
    .or(z.literal("")),
  location: z.string().max(100).optional(),
  about: z.string().max(8000).optional(),
  profession: requiredString.max(100),
  experienced: requiredBoolean,
  skills: z.array(applicantSkillSchema).optional(),
  languages: z.array(applicantLanguageSchema).optional(),
  availability: requiredString.max(100),
  preferredEmploymentTypes: z.array(z.string()).optional(),
  preferredLocationTypes: z.array(z.string()).optional(),
  preferredLocations: z.array(applicantLocationSchema).optional(),
  salaryExpectation: z
    .union([
      z.string().optional(),
      requiredNumeric.nonnegative(
        "Salary expectation must be a non-negative number",
      ),
    ])
    .transform((val) => (val === "" ? 0 : val)),
});

export type CreateApplicantProfileValues = z.infer<
  typeof createApplicantProfileSchema
>;

export const companyFilterSchema = z.object({
  q: z.string().optional(),
});

export type CompanyFilterValues = z.infer<typeof companyFilterSchema>;

export const professionalFilterSchema = z.object({
  q: z.string().optional(),
});

export type ProfessionalFilterValues = z.infer<typeof professionalFilterSchema>;

export const applyJobSchema = z.object({
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

export type ApplyJobValues = z.infer<typeof applyJobSchema>;
