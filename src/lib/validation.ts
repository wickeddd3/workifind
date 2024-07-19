import { z } from "zod";
import validator from "validator";
import { employmentTypes, locationTypes } from "@/lib/job-types";
import { industryTypes } from "@/lib/company-types";

const requiredString = z.string().min(1, "Required");
const numericRequiredString = requiredString.regex(/^\d+$/, "Must be a number");

const companyLogoSchema = z
  .custom<File | undefined>()
  .refine(
    (file) => !file || (file instanceof File && file.type.startsWith("image/")),
    "Must be an image file",
  )
  .refine((file) => {
    return !file || file.size < 1024 * 1024 * 2;
  }, "File must be less than 2MB");

const applicationSchema = z
  .object({
    applicationEmail: z.string().max(100).email().optional().or(z.literal("")),
    applicationUrl: z.string().max(100).optional().or(z.literal("")),
  })
  .refine((data) => data.applicationEmail || data.applicationUrl, {
    message: "Email or url is required",
    path: ["applicationEmail"],
  });

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
    companyName: requiredString.max(100),
    companyLogo: companyLogoSchema,
    description: z.string().max(5000).optional(),
    salary: numericRequiredString.max(
      9,
      "Number can't be longer than 9 digits",
    ),
  })
  .and(applicationSchema)
  .and(locationSchema);

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
});

export type CreateEmployerProfileValues = z.infer<
  typeof createEmployerProfileSchema
>;

export const createApplicantProfileSchema = z.object({
  firstName: requiredString.max(100),
  lastName: requiredString.max(100),
  email: z.string().max(100).email(),
  phoneNumber: z.string().refine(validator.isMobilePhone).optional().or(z.literal("")),
  location: z.string().max(100).optional(),
  about: z.string().max(8000).optional(),
});

export type CreateApplicantProfileValues = z.infer<
  typeof createApplicantProfileSchema
>;
