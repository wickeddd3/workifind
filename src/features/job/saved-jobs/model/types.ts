import type { SavedJob as PrismaSavedJob, Job } from "@prisma/client";

export interface SavedJob extends PrismaSavedJob {
  job: Job;
}
