/**
 * Browser-safe public API.
 *
 * Client components must import from here rather than `index.ts`: that barrel
 * re-exports `queries.ts`, which reaches Prisma, and one such import drags the
 * whole client into the browser bundle. It also re-exports the entity's server
 * components, which a form has no use for.
 *
 * Types are erased at compile time and are safe from either entry point.
 */

/* Model */
export {
  getLogoFileError,
  LOGO_ACCEPT,
  LOGO_UPLOAD_ENDPOINT,
  type LogoUploadResult,
  LogoUploadSchema,
} from "./model/logo";
export type { Company, Employer } from "./model/types";
