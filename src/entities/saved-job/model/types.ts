import type { Employer, Job, SavedJob as PrismaSavedJob } from "@prisma/client";

export interface SavedJob extends PrismaSavedJob {
  job: Job & { employer: Employer };
}
