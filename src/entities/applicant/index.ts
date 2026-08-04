/* UI */
export { ApplicantBio } from "./ui/ApplicantBio";
export { ApplicantCertificationList } from "./ui/ApplicantCertificationList";
export { ApplicantEducationList } from "./ui/ApplicantEducationList";
export { ApplicantExperienceList } from "./ui/ApplicantExperienceList";
export { ApplicantHeader } from "./ui/ApplicantHeader";
export { ApplicantLanguages } from "./ui/ApplicantLanguages";
export { ApplicantLoadingPlaceholder } from "./ui/ApplicantLoadingPlaceholder";
export { ApplicantPreferences } from "./ui/ApplicantPreferences";
export { ApplicantResume } from "./ui/ApplicantResume";
export { ApplicantSkills } from "./ui/ApplicantSkills";
export { ProfileCompleteness } from "./ui/ProfileCompleteness";

// The form field groups — `ExperienceEntryFields`, `SkillEntryFields`,
// `PreferencesFields` and the rest — are deliberately absent. They are
// `"use client"`, and re-exporting them here put them in the client reference
// manifest of every route that reads this barrel, including the two profile
// pages that render no form at all. Their only consumers are client
// components, which import from `./client`.

// The record field groups — `ExperienceEntryFields` and friends — are
// deliberately absent. They are `"use client"`, and re-exporting them here put
// them in the client reference manifest of every route that reads this barrel,
// including the two profile pages that render no form at all. Their only
// consumers are client components, which import from `./client`.

/* Model */
export {
  getProfileCompleteness,
  type ProfileCompleteness as ProfileCompletenessResult,
} from "./model/completeness";
export * from "./model/records";
export * from "./model/resume";
export type {
  Applicant,
  ApplicantCertification,
  ApplicantEducation,
  ApplicantExperience,
  ApplicantProfile,
} from "./model/types";
export {
  type ProfileViewer,
  type ProfileVisibility,
  profileVisibility,
  resolveProfileViewer,
  toVisibleApplicantProfile,
  type VisibleApplicantProfile,
} from "./model/visibility";

/* Lib */
export {
  toCertificationCreateInputs,
  toEducationCreateInputs,
  toExperienceCreateInputs,
  toLanguageCreateInputs,
  toPreferredLocationCreateInputs,
  toSkillCreateInputs,
} from "./lib/record-inputs";

/* API */
export {
  resolveResumeUpload,
  signResumeUpload,
  type StoredResume,
  uploadApplicantResume,
} from "./api/resume.service";
export * from "./queries";
