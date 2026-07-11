import type { Prisma } from "@prisma/client";

import applicantsJson from "./applicants.data.json";
import employersJson from "./employers.data.json";
import jobsJson from "./jobs.data.json";

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

export type ApplicantSeed = PersonSeed & {
  profession: string;
  experienced: string;
  skills: string[];
  languages: string[];
  availability: string;
  salaryExpectation: number;
  preferredLocations: string[];
  preferredEmploymentTypes: string[];
  preferredLocationTypes: string[];
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

/* -------------------------------------------------------------------------- */
/*  Mappers: JSON record -> Prisma create input                               */
/* -------------------------------------------------------------------------- */

// Json columns store stringified `{ name }` objects, matching the app's format.
const asNamedJson = (names: string[]) =>
  names.map((name) => JSON.stringify({ name }));

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
    skills: asNamedJson(applicant.skills),
    languages: asNamedJson(applicant.languages),
    availability: applicant.availability,
    salaryExpectation: applicant.salaryExpectation,
    preferredLocations: asNamedJson(applicant.preferredLocations),
    preferredEmploymentTypes: applicant.preferredEmploymentTypes,
    preferredLocationTypes: applicant.preferredLocationTypes,
  };
}

export function buildJobData(
  userId: string,
  employerId: number,
  job: JobSeed,
  index: number,
): Prisma.JobUncheckedCreateInput {
  return {
    userId,
    employerId,
    title: job.title,
    slug: slugify(job.title, `${employerId}-${index + 1}`),
    employmentType: job.employmentType,
    locationType: job.locationType,
    location: job.location,
    description: job.description,
    minSalary: job.minSalary,
    maxSalary: job.maxSalary,
  };
}
