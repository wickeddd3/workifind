import type { Prisma } from "@prisma/client";

import { generateApplicants } from "./generate/applicants";
import { generateEmployers } from "./generate/employers";
import { generateJobsForEmployers } from "./generate/jobs";
import { resetRandom } from "./generate/random";
import type {
  ApplicantSeed,
  EmployerSeed,
  JobSeed,
  LanguageSeed,
  SkillSeed,
} from "./types";

export { FRESH_GRADUATE_PITCHES, PITCH_TEMPLATES } from "./content/prose";
export * from "./types";

/* -------------------------------------------------------------------------- */
/*  How much gets seeded                                                       */
/* -------------------------------------------------------------------------- */

/**
 * Counts, overridable from the environment so a smoke test does not have to
 * create four hundred and fifty Clerk users to prove the seeder still runs:
 *
 *   SEED_EMPLOYERS=5 SEED_APPLICANTS=10 SEED_JOBS=20 npm run seed
 *
 * The defaults are set by Clerk rather than by taste. Every employer and every
 * applicant is a real Clerk user, so the people counts are what a free
 * instance can carry comfortably; jobs cost nothing but a database row, which
 * is why there are far more of them. Search, filtering and pagination all have
 * enough to work on at two hundred.
 */
function fromEnv(name: string, fallback: number): number {
  const raw = process.env[name];
  const parsed = raw ? Number.parseInt(raw, 10) : NaN;

  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

export const SEED_COUNTS = {
  employers: fromEnv("SEED_EMPLOYERS", 30),
  applicants: fromEnv("SEED_APPLICANTS", 30),
  jobs: fromEnv("SEED_JOBS", 200),
};

/* -------------------------------------------------------------------------- */
/*  The seeded world                                                           */
/* -------------------------------------------------------------------------- */

/**
 * Generated at import, from a fixed random seed.
 *
 * Deterministic on purpose: company and job slugs are derived from names and
 * end up in URLs, so a re-seed that renamed everything would break every link
 * anyone had saved. Same seed, same world.
 *
 * The order matters. `resetRandom` has to run before anything draws from the
 * generator, and employers have to exist before the jobs that belong to them —
 * which is also why these are module-level constants rather than functions the
 * seeders call in whatever order they happen to run.
 */
resetRandom();

export const employers: EmployerSeed[] = generateEmployers(
  SEED_COUNTS.employers,
);

/** Aligned by index with `employers`: `jobsByEmployer[3]` is employer 3's list. */
export const jobsByEmployer: JobSeed[][] = generateJobsForEmployers(
  employers,
  SEED_COUNTS.jobs,
);

export const applicants: ApplicantSeed[] = generateApplicants(
  SEED_COUNTS.applicants,
);

/* -------------------------------------------------------------------------- */
/*  Mappers: seed record -> Prisma create input                                */
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
    // These three were absent from the seed entirely, so every seeded profile
    // rendered with an empty About, no location and no phone number — three of
    // the first things an employer looks at.
    phoneNumber: applicant.phoneNumber ?? null,
    location: applicant.location ?? null,
    about: applicant.about ?? null,
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
