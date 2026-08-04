/**
 * Browser-safe public API. Client components import from here, not `index.ts`,
 * which re-exports the server-side search content and reaches Prisma through it.
 */
export { ProfessionalFilter } from "./ui/ProfessionalFilter";
