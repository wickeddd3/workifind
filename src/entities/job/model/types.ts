import { Employer, JobApplication, Job as PrismaJob } from "@prisma/client";

export interface Job extends PrismaJob {
  employer: Employer;
  jobApplications: JobApplication[];
}
