import type { SavedJob as PrismaSavedJob, Job, Employer } from "@prisma/client";

export interface SavedJob extends PrismaSavedJob {
  job: Job & { employer: Employer };
}
