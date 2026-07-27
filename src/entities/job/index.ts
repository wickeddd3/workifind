/* Browser-safe surface: salary helpers, schema, and types */
export * from "./client";

/* UI */
export { JobApplicationSubmitted } from "./ui/JobApplicationSubmitted";
export { JobDescription } from "./ui/JobDescription";
export { JobHeader } from "./ui/JobHeader";
export { JobHeaderCompact } from "./ui/JobHeaderCompact";

/* Lib */
export { buildJobPostingSchema } from "./lib/structured-data";

/* API — server only */
export {
  getAllJobSlugs,
  getJob,
  getJobBySlug,
  getRecentJobSlugs,
} from "./api/job.queries";
