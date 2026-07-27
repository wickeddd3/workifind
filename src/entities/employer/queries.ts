/**
 * Data-only public API — server side, no UI.
 *
 * Consumers that need a query but none of this entity's components import from
 * here rather than `index.ts`. The full barrel re-exports `EmployerDetails`,
 * which pulls react-markdown, so routing a single query through it costs a
 * route roughly 13 kB of client bundle it never uses.
 */
export {
  getAllEmployerSlugs,
  getEmployer,
  getEmployerBySlug,
  getRecentEmployerSlugs,
  getSuggestedCompanies,
} from "./api/employer.queries";
