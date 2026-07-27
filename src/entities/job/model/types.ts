import type { Employer, Job as PrismaJob } from "@prisma/client";

export interface Job extends PrismaJob {
  employer: Employer;
}

export interface EmployerJob extends PrismaJob {
  employer: Employer;
  // Count only — the employer job list never renders individual applications.
  _count: { jobApplications: number };
}
