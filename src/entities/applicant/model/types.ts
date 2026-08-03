import type {
  Applicant as PrismaApplicant,
  ApplicantCertification,
  ApplicantEducation,
  ApplicantExperience,
} from "@prisma/client";

export type { ApplicantCertification, ApplicantEducation, ApplicantExperience };

export interface Applicant extends PrismaApplicant {
  skills: { name: string }[];
  languages: { name: string }[];
  preferredLocations: { name: string }[];
}

/**
 * An applicant plus the CV records that hang off them.
 *
 * Kept separate from `Applicant` rather than folded into it: the job flows —
 * applying, saving, the job-actions menu — read a profile on every job page and
 * need none of these rows, and three extra joins on each of those is a cost
 * paid for nothing. Only the pages that render a whole profile ask for them.
 */
export interface ApplicantProfile extends Applicant {
  experiences: ApplicantExperience[];
  educations: ApplicantEducation[];
  certifications: ApplicantCertification[];
}
