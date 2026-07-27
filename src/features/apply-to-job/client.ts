/**
 * Browser-safe public API — see `index.ts` for the full surface.
 *
 * `JobApplicationForm` reaches Prisma through the applicant entity, so client
 * components take `ApplyButton` from here to keep that out of their bundle.
 */
export { ApplyButton } from "./ui/ApplyButton";
