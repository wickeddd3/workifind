import { z } from "zod";

import { getImageFileError, IMAGE_ACCEPT } from "@/shared/utils/image-file";

/**
 * The applicant's profile picture, as the browser deals with it.
 *
 * Here rather than in either feature that sets one: the setup wizard and the
 * profile editor upload the same image under the same rules, and two copies of
 * those rules is how the size cap ends up different in the two places. The
 * upload itself is in `api/avatar.service.ts`.
 */

export const AVATAR_ACCEPT = IMAGE_ACCEPT;

/** Named in the rejection message, so it says which field went wrong. */
export function getAvatarFileError(file: File): string | null {
  return getImageFileError(file, "Profile picture");
}

/**
 * An avatar on a form, as it is submitted.
 *
 * Not the file — the signed reference the upload route handed back. The bytes
 * go up as soon as the image is chosen, which is what makes a progress bar
 * possible and what keeps them out of a Server Action, whose body caps at 1MB
 * and which cannot carry a `File` at all.
 *
 * Optional: an absent value means "leave whatever is there alone", not "remove
 * it". Clearing a picture is a separate intent and there is no UI for it yet.
 */
export const AvatarUploadSchema = z.string().min(1).max(2000).optional();

/** Where the browser posts an avatar, before any record refers to it. */
export const AVATAR_UPLOAD_ENDPOINT = "/api/applicants/avatar";

/** What the upload route hands back. */
export interface AvatarUploadResult {
  /** Signed, and the only thing the save action will accept. */
  token: string;
}
