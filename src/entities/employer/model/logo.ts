import { z } from "zod";

import { getImageFileError, IMAGE_ACCEPT } from "@/shared/utils/image-file";

/**
 * The company logo, as the browser deals with it.
 *
 * Here rather than in either feature that sets one: the setup wizard and the
 * profile editor upload the same image under the same rules, and each used to
 * carry its own copy — including its own `logo.service.ts`, with its own idea
 * of the size cap.
 */

export const LOGO_ACCEPT = IMAGE_ACCEPT;

/** Named in the rejection message, so it says which field went wrong. */
export function getLogoFileError(file: File): string | null {
  return getImageFileError(file, "Logo");
}

/**
 * A logo on a form, as it is submitted.
 *
 * Not the file — the signed reference the upload route handed back. This used
 * to be a `File` passed straight through a Server Action, which is a 1MB body
 * limit and no way to report progress on the way up.
 *
 * Optional: an absent value means "leave the existing logo alone".
 */
export const LogoUploadSchema = z.string().min(1).max(2000).optional();

/** Where the browser posts a logo, before any record refers to it. */
export const LOGO_UPLOAD_ENDPOINT = "/api/employers/logo";

/** What the upload route hands back. */
export interface LogoUploadResult {
  /** Signed, and the only thing the save action will accept. */
  token: string;
}
