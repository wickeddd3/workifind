import {
  Employer,
  JobApplication as PrismaJobApplication,
  Job as PrismaJob,
  Applicant,
} from "@prisma/client";

export interface Job extends PrismaJob {
  employer: Employer;
  jobApplications?: JobApplication[];
}

export interface JobApplication extends PrismaJobApplication {
  applicant: Applicant;
}
