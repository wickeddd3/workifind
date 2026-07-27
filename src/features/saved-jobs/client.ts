/**
 * Browser-safe public API — see `index.ts` for the full surface.
 *
 * `ApplicantSavedJobs` reaches Prisma directly, so client components take the
 * server actions from here instead; the bundler replaces those with RPC stubs.
 */
export {
  getInitialSavedJobsState,
  type InitialSavedJobsState,
  unsaveJobAction,
} from "./api/saved-job.action";
