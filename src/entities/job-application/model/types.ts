import type {
  Job,
  JobApplication as PrismaJobApplication,
} from "@prisma/client";

export interface JobApplication extends PrismaJobApplication {
  job: Job;
}
