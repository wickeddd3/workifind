/**
 * Browser-safe public API.
 *
 * Client components must import from here rather than `index.ts`: that barrel
 * re-exports `queries.ts`, which reaches Prisma, and one such import drags the
 * whole client into the browser bundle.
 *
 * Types are erased at compile time and are safe from either entry point.
 */

/* UI — the record field groups, which both profile forms render. */
export { CertificationEntryFields } from "./ui/CertificationEntryFields";
export { EducationEntryFields } from "./ui/EducationEntryFields";
export { ExperienceEntryFields } from "./ui/ExperienceEntryFields";

/* Model */
export type {
  ApplicantCertificationEntry,
  ApplicantEducationEntry,
  ApplicantExperienceEntry,
} from "./model/records";
export {
  ApplicantCertificationEntrySchema,
  ApplicantEducationEntrySchema,
  ApplicantExperienceEntrySchema,
  EMPTY_CERTIFICATION_ENTRY,
  EMPTY_EDUCATION_ENTRY,
  EMPTY_EXPERIENCE_ENTRY,
  toCertificationEntries,
  toEducationEntries,
  toExperienceEntries,
} from "./model/records";
export type {
  Applicant,
  ApplicantCertification,
  ApplicantEducation,
  ApplicantExperience,
  ApplicantProfile,
} from "./model/types";
