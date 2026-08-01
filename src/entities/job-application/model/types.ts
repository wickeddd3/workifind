import type {
  Applicant,
  Employer,
  Job,
  JobApplication as PrismaJobApplication,
} from "@prisma/client";

/**
 * An application seen from the applicant's side — which job they applied to.
 * Backs the "my applications" list.
 */
export interface JobApplicationWithJob extends PrismaJobApplication {
  // The employer is part of the shape: the list shows which company you applied
  // to, and the card that renders it needs the name and logo.
  job: Job & { employer: Employer };
}

/**
 * An application seen from the employer's side — who applied.
 * Backs the applicants list on a job the employer owns.
 */
export interface JobApplicationWithApplicant extends PrismaJobApplication {
  applicant: Applicant;
}

/** A job together with the applications it has received. */
export interface JobWithApplications extends Job {
  employer: Employer;
  jobApplications: JobApplicationWithApplicant[];
}
