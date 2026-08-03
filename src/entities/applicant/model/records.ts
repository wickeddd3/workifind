import validator from "validator";
import { z } from "zod";

import { LANGUAGE_PROFICIENCIES, SKILL_LEVELS } from "@/shared/constants/tags";
import { requiredString } from "@/shared/schema/utils";
import {
  MONTH_INPUT_PATTERN,
  toMonthInputValue,
} from "@/shared/utils/format-month";

import type {
  ApplicantCertification,
  ApplicantEducation,
  ApplicantExperience,
  ApplicantLanguage,
  ApplicantPreferredLocation,
  ApplicantSkill,
} from "./types";

/**
 * The shape of one CV record as a form edits it, and as either feature
 * validates it.
 *
 * These live in the entity rather than in a feature because both the
 * create-profile flow and the profile editor write the same records, and a
 * second copy of the rules is how the two ended up disagreeing about the rest
 * of the profile already.
 *
 * Dates are `YYYY-MM` strings here, not `Date`s: that is what
 * `<input type="month">` round-trips, and it keeps the schemas free of any
 * timezone question. `lib/record-inputs.ts` converts them on the way to Prisma.
 */

const requiredMonthValue = requiredString.regex(
  MONTH_INPUT_PATTERN,
  "Use a month and year",
);

/**
 * An unset month arrives from the input as an empty string, not as undefined,
 * so the check is written as a refinement rather than a union with `""` —
 * a failing union reports "Invalid input" and hides which half was meant.
 */
const optionalMonthValue = z
  .string()
  .trim()
  .refine(
    (value) => !value || MONTH_INPUT_PATTERN.test(value),
    "Use a month and year",
  )
  .optional();

/** True when `end` is unset or is not before `start`; both are `YYYY-MM`, which
 *  compares correctly as text. */
function isOrdered(start?: string, end?: string) {
  return !start || !end || end >= start;
}

export const ApplicantExperienceEntrySchema = z
  .object({
    title: requiredString.max(120),
    company: requiredString.max(120),
    employmentType: z.string().trim().max(50).optional(),
    location: z.string().trim().max(100).optional(),
    startDate: requiredMonthValue,
    endDate: optionalMonthValue,
    current: z.boolean(),
    description: z.string().trim().max(2000).optional(),
  })
  // A role is either finished or ongoing. Without this a run of entries with
  // neither an end date nor the tick reads as a gap-free history that is not
  // one.
  .refine((entry) => entry.current || Boolean(entry.endDate), {
    path: ["endDate"],
    message: "Add an end date, or tick that you still work here",
  })
  .refine((entry) => isOrdered(entry.startDate, entry.endDate), {
    path: ["endDate"],
    message: "End date can't be before the start date",
  });

export const ApplicantEducationEntrySchema = z
  .object({
    school: requiredString.max(120),
    degree: z.string().trim().max(120).optional(),
    fieldOfStudy: z.string().trim().max(120).optional(),
    // Unlike a role, a qualification is often listed by its award year alone,
    // so neither date is required.
    startDate: optionalMonthValue,
    endDate: optionalMonthValue,
    current: z.boolean(),
    description: z.string().trim().max(2000).optional(),
  })
  .refine((entry) => isOrdered(entry.startDate, entry.endDate), {
    path: ["endDate"],
    message: "End date can't be before the start date",
  });

export const ApplicantCertificationEntrySchema = z
  .object({
    name: requiredString.max(120),
    issuer: z.string().trim().max(120).optional(),
    issueDate: optionalMonthValue,
    expiryDate: optionalMonthValue,
    credentialId: z.string().trim().max(120).optional(),
    credentialUrl: z
      .string()
      .trim()
      .max(300)
      .refine((value) => !value || validator.isURL(value), "Enter a full link")
      .optional(),
  })
  .refine((entry) => isOrdered(entry.issueDate, entry.expiryDate), {
    path: ["expiryDate"],
    message: "Expiry can't be before the issue date",
  });

/* -------------------------------------------------------------------------- */
/*  The shorter lists                                                          */
/* -------------------------------------------------------------------------- */

/**
 * A value the user either picked from a fixed list or left alone.
 *
 * Written as a refinement rather than a `z.enum`, because an unset select
 * submits `""` and an enum would reject that as loudly as it rejects nonsense.
 */
function optionalChoice(options: { value: string }[], message: string) {
  const values = options.map((option) => option.value);

  return z
    .string()
    .trim()
    .refine((value) => !value || values.includes(value), message)
    .optional();
}

export const ApplicantSkillEntrySchema = z.object({
  name: requiredString.max(80),
  level: optionalChoice(SKILL_LEVELS, "Pick a level from the list"),
  // A string, not a number: an empty number input yields NaN, which reports as
  // "Expected number, received nan" on a field the user simply left blank.
  years: z
    .string()
    .trim()
    .refine(
      (value) => !value || (/^\d{1,2}$/.test(value) && Number(value) <= 60),
      "Enter a whole number of years",
    )
    .optional(),
});

export const ApplicantLanguageEntrySchema = z.object({
  name: requiredString.max(80),
  proficiency: optionalChoice(
    LANGUAGE_PROFICIENCIES,
    "Pick a proficiency from the list",
  ),
});

export const ApplicantPreferredLocationEntrySchema = z.object({
  name: requiredString.max(100),
});

export type ApplicantExperienceEntry = z.infer<
  typeof ApplicantExperienceEntrySchema
>;
export type ApplicantEducationEntry = z.infer<
  typeof ApplicantEducationEntrySchema
>;
export type ApplicantCertificationEntry = z.infer<
  typeof ApplicantCertificationEntrySchema
>;
export type ApplicantSkillEntry = z.infer<typeof ApplicantSkillEntrySchema>;
export type ApplicantLanguageEntry = z.infer<
  typeof ApplicantLanguageEntrySchema
>;
export type ApplicantPreferredLocationEntry = z.infer<
  typeof ApplicantPreferredLocationEntrySchema
>;

/* -------------------------------------------------------------------------- */
/*  Blank entries — what "Add role" starts from                                */
/* -------------------------------------------------------------------------- */

export const EMPTY_EXPERIENCE_ENTRY: ApplicantExperienceEntry = {
  title: "",
  company: "",
  employmentType: "",
  location: "",
  startDate: "",
  endDate: "",
  current: false,
  description: "",
};

export const EMPTY_EDUCATION_ENTRY: ApplicantEducationEntry = {
  school: "",
  degree: "",
  fieldOfStudy: "",
  startDate: "",
  endDate: "",
  current: false,
  description: "",
};

export const EMPTY_CERTIFICATION_ENTRY: ApplicantCertificationEntry = {
  name: "",
  issuer: "",
  issueDate: "",
  expiryDate: "",
  credentialId: "",
  credentialUrl: "",
};

export const EMPTY_SKILL_ENTRY: ApplicantSkillEntry = {
  name: "",
  level: "",
  years: "",
};

export const EMPTY_LANGUAGE_ENTRY: ApplicantLanguageEntry = {
  name: "",
  proficiency: "",
};

export const EMPTY_PREFERRED_LOCATION_ENTRY: ApplicantPreferredLocationEntry = {
  name: "",
};

/* -------------------------------------------------------------------------- */
/*  Stored rows -> form values                                                 */
/* -------------------------------------------------------------------------- */

/**
 * Every nullable column becomes an empty string, because react-hook-form treats
 * a null value as uncontrolled and React then warns the moment the user types
 * into the field.
 */

export function toExperienceEntries(
  records: ApplicantExperience[] = [],
): ApplicantExperienceEntry[] {
  return records.map((record) => ({
    title: record.title,
    company: record.company,
    employmentType: record.employmentType ?? "",
    location: record.location ?? "",
    startDate: toMonthInputValue(record.startDate),
    endDate: toMonthInputValue(record.endDate),
    current: record.current,
    description: record.description ?? "",
  }));
}

export function toEducationEntries(
  records: ApplicantEducation[] = [],
): ApplicantEducationEntry[] {
  return records.map((record) => ({
    school: record.school,
    degree: record.degree ?? "",
    fieldOfStudy: record.fieldOfStudy ?? "",
    startDate: toMonthInputValue(record.startDate),
    endDate: toMonthInputValue(record.endDate),
    current: record.current,
    description: record.description ?? "",
  }));
}

export function toCertificationEntries(
  records: ApplicantCertification[] = [],
): ApplicantCertificationEntry[] {
  return records.map((record) => ({
    name: record.name,
    issuer: record.issuer ?? "",
    issueDate: toMonthInputValue(record.issueDate),
    expiryDate: toMonthInputValue(record.expiryDate),
    credentialId: record.credentialId ?? "",
    credentialUrl: record.credentialUrl ?? "",
  }));
}

export function toSkillEntries(
  records: ApplicantSkill[] = [],
): ApplicantSkillEntry[] {
  return records.map((record) => ({
    name: record.name,
    level: record.level ?? "",
    // The form holds years as text; null becomes "" so the input stays blank
    // rather than showing a 0 nobody entered.
    years: record.years === null ? "" : String(record.years),
  }));
}

export function toLanguageEntries(
  records: ApplicantLanguage[] = [],
): ApplicantLanguageEntry[] {
  return records.map((record) => ({
    name: record.name,
    proficiency: record.proficiency ?? "",
  }));
}

export function toPreferredLocationEntries(
  records: ApplicantPreferredLocation[] = [],
): ApplicantPreferredLocationEntry[] {
  return records.map((record) => ({ name: record.name }));
}
