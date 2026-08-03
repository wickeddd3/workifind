/* Browser-safe surface: salary helpers, schema, and types */
export * from "./client";

/* UI */
export { JobApplicationSubmitted } from "./ui/JobApplicationSubmitted";
export { JobDescription } from "./ui/JobDescription";
export { JobHeader } from "./ui/JobHeader";
export { JobHeaderCompact } from "./ui/JobHeaderCompact";
export { JobListSkeleton } from "./ui/JobListSkeleton";

/* Model — server-side policy */
export { LISTABLE_JOB } from "./model/listable";

/* Lib */
export { buildJobPostingSchema } from "./lib/structured-data";

/* API — server only */
export {
  getAllJobSlugs,
  getCompanyJobs,
  getEmployerJob,
  getJob,
  getJobBySlug,
  getLatestJobs,
  getRecentJobSlugs,
} from "./api/job.queries";
