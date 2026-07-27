/* Browser-safe surface: salary helpers, schema, and types */
export * from "./client";

/* UI */
export { JobApplicationSubmitted } from "./ui/JobApplicationSubmitted";
export { JobDescription } from "./ui/JobDescription";
export { JobHeader } from "./ui/JobHeader";

/* Lib */
export { buildJobPostingSchema } from "./lib/structured-data";

/* API — server only */
export { getJob, getJobBySlug } from "./api/job.queries";
