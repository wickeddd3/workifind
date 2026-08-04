/**
 * Data-only public API — server side, no UI.
 *
 * Consumers that need a query but none of this entity's components import from
 * here rather than `index.ts`, which also re-exports the applicant UI.
 */
export {
  type ApplicantResumeRecord,
  type ApplicantSummary,
  getApplicant,
  getApplicantById,
  getApplicantProfile,
  getApplicantResume,
  getSuggestedApplicants,
} from "./api/applicant.queries";
// The résumé download routes need the filename rule alongside the query, and
// reaching it through `index.ts` for a pure function would pull this entity's
// whole UI surface into a route that renders nothing.
export { toResumeFileName } from "./model/resume";
