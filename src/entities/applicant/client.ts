/**
 * Browser-safe public API.
 *
 * Client components must import from here rather than `index.ts`: that barrel
 * re-exports `queries.ts`, which reaches Prisma, and one such import drags the
 * whole client into the browser bundle.
 *
 * Types are erased at compile time and are safe from either entry point.
 */

/* UI — the form field groups, which both profile forms render. */
export { CertificationEntryFields } from "./ui/CertificationEntryFields";
export { EducationEntryFields } from "./ui/EducationEntryFields";
export { ExperienceEntryFields } from "./ui/ExperienceEntryFields";
export { LanguageEntryFields } from "./ui/LanguageEntryFields";
export { PreferencesFields } from "./ui/PreferencesFields";
export { PreferredLocationEntryFields } from "./ui/PreferredLocationEntryFields";
export { SkillEntryFields } from "./ui/SkillEntryFields";

/* Model */
export {
  AVATAR_ACCEPT,
  AVATAR_UPLOAD_ENDPOINT,
  type AvatarUploadResult,
  AvatarUploadSchema,
  getAvatarFileError,
} from "./model/avatar";
export type {
  ApplicantCertificationEntry,
  ApplicantEducationEntry,
  ApplicantExperienceEntry,
  ApplicantLanguageEntry,
  ApplicantPreferredLocationEntry,
  ApplicantSkillEntry,
} from "./model/records";
export {
  ApplicantCertificationEntrySchema,
  ApplicantEducationEntrySchema,
  ApplicantExperienceEntrySchema,
  ApplicantLanguageEntrySchema,
  ApplicantPreferredLocationEntrySchema,
  ApplicantSkillEntrySchema,
  EMPTY_CERTIFICATION_ENTRY,
  EMPTY_EDUCATION_ENTRY,
  EMPTY_EXPERIENCE_ENTRY,
  EMPTY_LANGUAGE_ENTRY,
  EMPTY_PREFERRED_LOCATION_ENTRY,
  EMPTY_SKILL_ENTRY,
  toCertificationEntries,
  toEducationEntries,
  toExperienceEntries,
  toLanguageEntries,
  toPreferredLocationEntries,
  toSkillEntries,
} from "./model/records";
export {
  getResumeFileError,
  RESUME_ACCEPT,
  RESUME_MAX_SIZE_LABEL,
  RESUME_UPLOAD_ENDPOINT,
  type ResumeSummary,
  type ResumeUploadResult,
  ResumeUploadSchema,
} from "./model/resume";
export type {
  Applicant,
  ApplicantCertification,
  ApplicantEducation,
  ApplicantExperience,
  ApplicantLanguage,
  ApplicantPreferredLocation,
  ApplicantProfile,
  ApplicantSkill,
} from "./model/types";
