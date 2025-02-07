import { z } from "zod";
import { EMPLOYMENT_TYPES, LOCATION_TYPES } from "@/constants/tags";
import { requiredString } from "@/schema/utils";

const LocationSchema = z
  .object({
    locationType: requiredString.refine(
      (value) => LOCATION_TYPES.map((type) => type.value).includes(value),
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

export const JobSchema = z
  .object({
    title: requiredString.max(100),
    employmentType: requiredString.refine(
      (value) => EMPLOYMENT_TYPES.map((type) => type.value).includes(value),
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
  .and(LocationSchema)
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

export type JobSchemaType = z.infer<typeof JobSchema>;
