import type {
  Applicant as PrismaApplicant,
  ApplicantCertification,
  ApplicantEducation,
  ApplicantExperience,
  ApplicantLanguage,
  ApplicantPreferredLocation,
  ApplicantSkill,
} from "@prisma/client";

export type {
  ApplicantCertification,
  ApplicantEducation,
  ApplicantExperience,
  ApplicantLanguage,
  ApplicantPreferredLocation,
  ApplicantSkill,
};

/**
 * The profile record on its own.
 *
 * It used to widen three Json columns into `{ name }[]`; those are rows now, so
 * it is the Prisma model unchanged and the alias only spares every consumer
 * from renaming the import.
 */
export type Applicant = PrismaApplicant;

/**
 * An applicant plus everything they list rather than state once.
 *
 * Kept separate from `Applicant` rather than folded into it: the job flows —
 * applying, saving, the job-actions menu — read a profile on every job page and
 * need none of these rows, and six extra joins on each of those is a cost paid
 * for nothing. Only the pages that render a whole profile ask for them.
 */
export interface ApplicantProfile extends Applicant {
  experiences: ApplicantExperience[];
  educations: ApplicantEducation[];
  certifications: ApplicantCertification[];
  skills: ApplicantSkill[];
  languages: ApplicantLanguage[];
  preferredLocations: ApplicantPreferredLocation[];
}
