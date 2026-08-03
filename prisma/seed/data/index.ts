import type { Prisma } from "@prisma/client";

import applicantsJson from "./applicants.data.json";
import employersJson from "./employers.data.json";
import jobsJson from "./jobs.data.json";
import pitchesJson from "./pitches.data.json";

/* -------------------------------------------------------------------------- */
/*  Deterministic seed records — sourced from the JSON files in this folder    */
/* -------------------------------------------------------------------------- */

export type PersonSeed = {
  firstName: string;
  lastName: string;
  email: string;
};

export type EmployerSeed = PersonSeed & {
  companyName: string;
  companyWebsite: string;
  industry: string;
  location: string;
  about: string;
  perks: string[];
};

/** `YYYY-MM`, as the app stores and edits CV dates. */
type MonthSeed = string;

export type ExperienceSeed = {
  title: string;
  company: string;
  employmentType?: string;
  location?: string;
  startDate: MonthSeed;
  endDate?: MonthSeed;
  current: boolean;
  description?: string;
};

export type EducationSeed = {
  school: string;
  degree?: string;
  fieldOfStudy?: string;
  startDate?: MonthSeed;
  endDate?: MonthSeed;
  current: boolean;
  description?: string;
};

export type CertificationSeed = {
  name: string;
  issuer?: string;
  issueDate?: MonthSeed;
  expiryDate?: MonthSeed;
  credentialId?: string;
  credentialUrl?: string;
};

/** A skill is either a bare name or one carrying its level. Both forms are
 *  allowed so the JSON stays readable where the extra detail adds nothing. */
export type SkillSeed = string | { name: string; level?: string; years?: number };
export type LanguageSeed = string | { name: string; proficiency?: string };

export type ApplicantSeed = PersonSeed & {
  profession: string;
  experienced: string;
  skills: SkillSeed[];
  languages: LanguageSeed[];
  availability: string;
  salaryExpectation: number;
  preferredLocations: string[];
  preferredEmploymentTypes: string[];
  preferredLocationTypes: string[];
  // Deliberately uneven across the seeded people: one has no work history and
  // one has education with no dates, so the profile pages are exercised with
  // their empty and undated cases rather than six identical full profiles.
  experiences: ExperienceSeed[];
  educations: EducationSeed[];
  certifications: CertificationSeed[];
};

export type JobSeed = {
  title: string;
  employmentType: string;
  locationType: string;
  location: string;
  description: string;
  minSalary: number;
  maxSalary: number;
};

export const employers = employersJson as EmployerSeed[];
export const applicants = applicantsJson as ApplicantSeed[];
export const jobs = jobsJson as JobSeed[];
/** Cover letters, cycled through as applications are created. Deliberately of
 *  differing lengths: the applicants list clamps long ones behind a toggle, so
 *  a seed of uniform paragraphs would never exercise either state. */
export const pitches = pitchesJson as string[];

/* -------------------------------------------------------------------------- */
/*  Mappers: JSON record -> Prisma create input                               */
/* -------------------------------------------------------------------------- */

// The employer `perks` Json column stores stringified `{ name }` objects,
// matching the app's format. The applicant lists that used to look like this
// are rows now — see `buildApplicantData`.
const asNamedJson = (names: string[]) =>
  names.map((name) => JSON.stringify({ name }));

// `position` is explicit for the same reason the app writes it — these rows
// are created in one statement and share a `createdAt`, so nothing else records
// the order they were listed in.
const asSkillRows = (skills: SkillSeed[]) =>
  skills.map((skill, position) =>
    typeof skill === "string"
      ? { position, name: skill, level: null, years: null }
      : {
          position,
          name: skill.name,
          level: skill.level ?? null,
          years: skill.years ?? null,
        },
  );

const asLanguageRows = (languages: LanguageSeed[]) =>
  languages.map((language, position) =>
    typeof language === "string"
      ? { position, name: language, proficiency: null }
      : {
          position,
          name: language.name,
          proficiency: language.proficiency ?? null,
        },
  );

// CV dates are stored as the first of the month in UTC — see
// `src/shared/utils/format-month.ts`. Inlined rather than imported because the
// seed runs outside the Next build and does not resolve the `@/` alias.
const asMonth = (value?: string) => {
  if (!value) return null;

  const [year, month] = value.split("-").map(Number);

  return new Date(Date.UTC(year, month - 1, 1));
};

// Deterministic slug: kebab-cased text plus a stable ref so re-seeding always
// produces the same (unique) slugs.
const slugify = (text: string, ref: string | number) =>
  `${text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")}-${ref}`;

export function buildEmployerData(
  userId: string,
  employer: EmployerSeed,
  index: number,
): Prisma.EmployerUncheckedCreateInput {
  return {
    userId,
    slug: slugify(employer.companyName, `e${index + 1}`),
    companyName: employer.companyName,
    companyEmail: employer.email,
    companyWebsite: employer.companyWebsite,
    industry: employer.industry,
    location: employer.location,
    about: employer.about,
    perks: asNamedJson(employer.perks),
  };
}

export function buildApplicantData(
  userId: string,
  applicant: ApplicantSeed,
): Prisma.ApplicantUncheckedCreateInput {
  return {
    userId,
    firstName: applicant.firstName,
    lastName: applicant.lastName,
    email: applicant.email,
    profession: applicant.profession,
    experienced: applicant.experienced,
    availability: applicant.availability,
    salaryExpectation: applicant.salaryExpectation,
    preferredEmploymentTypes: applicant.preferredEmploymentTypes,
    preferredLocationTypes: applicant.preferredLocationTypes,
    skills: { create: asSkillRows(applicant.skills) },
    languages: { create: asLanguageRows(applicant.languages) },
    preferredLocations: {
      create: applicant.preferredLocations.map((name, position) => ({
        position,
        name,
      })),
    },
    experiences: {
      create: applicant.experiences.map((experience) => ({
        title: experience.title,
        company: experience.company,
        employmentType: experience.employmentType ?? null,
        location: experience.location ?? null,
        startDate: asMonth(experience.startDate)!,
        // An ongoing role has no end, matching what the app writes.
        endDate: experience.current ? null : asMonth(experience.endDate),
        current: experience.current,
        description: experience.description ?? null,
      })),
    },
    educations: {
      create: applicant.educations.map((education) => ({
        school: education.school,
        degree: education.degree ?? null,
        fieldOfStudy: education.fieldOfStudy ?? null,
        startDate: asMonth(education.startDate),
        endDate: education.current ? null : asMonth(education.endDate),
        current: education.current,
        description: education.description ?? null,
      })),
    },
    certifications: {
      create: applicant.certifications.map((certification) => ({
        name: certification.name,
        issuer: certification.issuer ?? null,
        issueDate: asMonth(certification.issueDate),
        expiryDate: asMonth(certification.expiryDate),
        credentialId: certification.credentialId ?? null,
        credentialUrl: certification.credentialUrl ?? null,
      })),
    },
  };
}

export function buildJobApplicationData(params: {
  /** The applicant's Clerk id — `JobApplication.userId` is the applier, not the
   *  job's owner. */
  userId: string;
  applicantId: string;
  jobId: string;
  pitch: string;
  createdAt: Date;
}): Prisma.JobApplicationUncheckedCreateInput {
  return {
    userId: params.userId,
    applicantId: params.applicantId,
    jobId: params.jobId,
    pitch: params.pitch,
    // Set explicitly so the seeded list spans days rather than arriving in one
    // indistinguishable batch — the applicants list sorts on this and shows it
    // as "Applied 3 days ago".
    createdAt: params.createdAt,
  };
}

export function buildJobData(
  userId: string,
  employerId: string,
  job: JobSeed,
  index: number,
  /** The employer's position in the seed list, e.g. `e2`. The slug is built
   *  from this rather than from `employerId`, which is now a uuid: it would
   *  make the slug unreadable, and it changes on every run, so re-seeding would
   *  no longer produce the same slugs. */
  employerRef: string,
): Prisma.JobUncheckedCreateInput {
  return {
    userId,
    employerId,
    title: job.title,
    slug: slugify(job.title, `${employerRef}-${index + 1}`),
    employmentType: job.employmentType,
    locationType: job.locationType,
    location: job.location,
    description: job.description,
    minSalary: job.minSalary,
    maxSalary: job.maxSalary,
  };
}
