/**
 * The shape of a seeded record, before it becomes a Prisma create input.
 *
 * Split out from `index.ts` so the generators can import it without pulling in
 * the mappers — and, more to the point, without the circular import that
 * results when `index.ts` imports the generators that import `index.ts`.
 */

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
  /** Markdown — the company page renders it through `Markdown`. */
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
 *  allowed so a fixture stays readable where the extra detail adds nothing. */
export type SkillSeed =
  | string
  | { name: string; level?: string; years?: number };
export type LanguageSeed = string | { name: string; proficiency?: string };

export type ApplicantSeed = PersonSeed & {
  phoneNumber?: string;
  location?: string;
  /** Short, first person — see `content/prose.ts` for why it stays short. */
  about?: string;
  profession: string;
  experienced: string;
  skills: SkillSeed[];
  languages: LanguageSeed[];
  availability: string;
  salaryExpectation: number;
  preferredLocations: string[];
  preferredEmploymentTypes: string[];
  preferredLocationTypes: string[];
  // Deliberately uneven across the seeded people: some have no work history and
  // some have education with no dates, so the profile pages are exercised with
  // their empty and undated cases rather than a hundred identical full profiles.
  experiences: ExperienceSeed[];
  educations: EducationSeed[];
  certifications: CertificationSeed[];
};

export type JobSeed = {
  title: string;
  employmentType: string;
  locationType: string;
  location: string;
  /** Markdown — the job page renders it through `Markdown`. */
  description: string;
  minSalary: number;
  maxSalary: number;
  /** Which applicants would plausibly apply, used when pairing applications. */
  profession: string;
};
