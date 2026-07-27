/**
 * Data-only public API — server side, no UI.
 *
 * Consumers that need a query but none of this entity's components import from
 * here rather than `index.ts`, which also re-exports the applicant UI.
 */
export {
  getApplicant,
  getApplicantById,
  getSuggestedApplicants,
} from "./api/applicant.queries";
