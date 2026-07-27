/**
 * Browser-safe public API — see `index.ts` for the full surface.
 *
 * Server actions are safe to import from a client component: the bundler
 * replaces them with an RPC stub rather than inlining the Prisma access.
 */
export {
  getJobActionState,
  type JobActionState,
} from "./api/job-actions.action";
