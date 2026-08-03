import type { Prisma } from "@prisma/client";

import { fromMonthInputValue } from "@/shared/utils/format-month";

import type {
  ApplicantCertificationEntry,
  ApplicantEducationEntry,
  ApplicantExperienceEntry,
  ApplicantLanguageEntry,
  ApplicantPreferredLocationEntry,
  ApplicantSkillEntry,
} from "../model/records";

/**
 * Validated form entries as the nested writes Prisma takes.
 *
 * This belongs to the entity, not to either feature: creating a profile and
 * editing one write the same rows, and the conversion from `YYYY-MM` to a
 * stored date is a property of the record rather than of the form that
 * submitted it.
 */

/** An optional text field left blank is stored as NULL, not as "". */
function orNull(value?: string) {
  return value?.trim() ? value.trim() : null;
}

export function toExperienceCreateInputs(
  entries: ApplicantExperienceEntry[] = [],
): Prisma.ApplicantExperienceCreateWithoutApplicantInput[] {
  return entries.map((entry) => ({
    title: entry.title,
    company: entry.company,
    employmentType: orNull(entry.employmentType),
    location: orNull(entry.location),
    // Non-null in the schema, and the entry schema requires it, so the
    // fallback is unreachable — it only keeps the types honest.
    startDate: fromMonthInputValue(entry.startDate) ?? new Date(),
    // An ongoing role has no end, whatever a previously entered date said.
    endDate: entry.current ? null : fromMonthInputValue(entry.endDate),
    current: entry.current,
    description: orNull(entry.description),
  }));
}

export function toEducationCreateInputs(
  entries: ApplicantEducationEntry[] = [],
): Prisma.ApplicantEducationCreateWithoutApplicantInput[] {
  return entries.map((entry) => ({
    school: entry.school,
    degree: orNull(entry.degree),
    fieldOfStudy: orNull(entry.fieldOfStudy),
    startDate: fromMonthInputValue(entry.startDate),
    endDate: entry.current ? null : fromMonthInputValue(entry.endDate),
    current: entry.current,
    description: orNull(entry.description),
  }));
}

export function toSkillCreateInputs(
  entries: ApplicantSkillEntry[] = [],
): Prisma.ApplicantSkillCreateWithoutApplicantInput[] {
  return entries.map((entry) => ({
    name: entry.name,
    level: orNull(entry.level),
    // Null, not 0, when the field was left blank — 0 would read on the profile
    // as a claim of no experience with the skill.
    years: entry.years?.trim() ? Number(entry.years) : null,
  }));
}

export function toLanguageCreateInputs(
  entries: ApplicantLanguageEntry[] = [],
): Prisma.ApplicantLanguageCreateWithoutApplicantInput[] {
  return entries.map((entry) => ({
    name: entry.name,
    proficiency: orNull(entry.proficiency),
  }));
}

export function toPreferredLocationCreateInputs(
  entries: ApplicantPreferredLocationEntry[] = [],
): Prisma.ApplicantPreferredLocationCreateWithoutApplicantInput[] {
  return entries.map((entry) => ({ name: entry.name }));
}

export function toCertificationCreateInputs(
  entries: ApplicantCertificationEntry[] = [],
): Prisma.ApplicantCertificationCreateWithoutApplicantInput[] {
  return entries.map((entry) => ({
    name: entry.name,
    issuer: orNull(entry.issuer),
    issueDate: fromMonthInputValue(entry.issueDate),
    expiryDate: fromMonthInputValue(entry.expiryDate),
    credentialId: orNull(entry.credentialId),
    credentialUrl: orNull(entry.credentialUrl),
  }));
}
