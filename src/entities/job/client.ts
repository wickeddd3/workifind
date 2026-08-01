/**
 * Browser-safe public API.
 *
 * Client components must import from here, not from `index.ts`: that barrel
 * also exports `api/job.queries`, which reaches Prisma and would be pulled
 * into the browser bundle. Type-only imports are erased at compile time, so
 * those are safe from either entry point.
 */

/* UI — presentational only, safe in the browser */
export { JobCard } from "./ui/JobCard";

/* Model */
export {
  getJobSalary,
  getJobSalaryCompact,
  hasJobSalary,
} from "./model/salary";
export { JobSchema, type JobSchemaType } from "./model/schema";
export type { EmployerJob, Job } from "./model/types";
