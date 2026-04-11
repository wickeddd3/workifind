import type {
  Employer,
  JobApplication as PrismaJobApplication,
  Job as PrismaJob,
  SavedJob as PrismaSavedJob,
  Applicant,
} from "@prisma/client";

export interface Job extends PrismaJob {
  employer: Employer;
}

export interface JobApplication extends PrismaJobApplication {
  applicant: Applicant;
}

export interface EmployerJob extends PrismaJob {
  employer: Employer;
  jobApplications: PrismaJobApplication[];
}

export interface ApplicantJob extends PrismaJob {
  employer: Employer;
  jobApplications: JobApplication[];
}

export interface SavedJob extends PrismaSavedJob {
  job: Job;
}
