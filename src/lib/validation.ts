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
    salaryStart: z
      .number()
      .min(0, { message: "Minimum salary must be greater than or equal to 0" }),
    salaryEnd: z
      .number()
      .min(0, { message: "Maximum salary must be greater than or equal to 0" }),
  })
  .and(locationSchema)
  .refine((data) => Number(data.salaryEnd) >= Number(data.salaryStart), {
    message: "Maximum salary must be greater than or equal to minimum salary",
    path: ["salaryEnd"],
  });

export type CreateJobValues = z.infer<typeof createJobSchema>;

export const jobFilterSchema = z.object({
  q: z.string().optional(),
  employmentType: z.string().optional(),
  salary: z.string().optional(),
  locationType: z.string().optional(),
});

export type JobFilterValues = z.infer<typeof jobFilterSchema>;

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
  perks: z.array(z.string()).optional(),
});

export type CreateEmployerProfileValues = z.infer<
  typeof createEmployerProfileSchema
>;

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
  skills: z.array(z.string()).optional(),
  languages: z.array(z.string()).optional(),
  availability: requiredString.max(100),
  preferredEmploymentTypes: z.array(z.string()).optional(),
  preferredLocationTypes: z.array(z.string()).optional(),
  preferredLocations: z.array(z.string()).optional(),
  salaryExpectation: z.preprocess((val) => Number(val), requiredNumeric),
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
