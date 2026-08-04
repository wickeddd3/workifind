import { storeImage } from "@/shared/lib/image-upload.server";
import { signUpload, verifyUpload } from "@/shared/lib/upload-signature";

/** Put an avatar in blob storage. `null` when it was rejected or the write failed. */
export async function uploadApplicantAvatar(
  file: File,
): Promise<string | null> {
  return storeImage(file, "avatar");
}

/** Sign a freshly stored avatar so the browser can hand it back on Save. */
export function signAvatarUpload(url: string, userId: string): string {
  // The name is carried by the token's shape but means nothing for an image:
  // nothing ever downloads one under its original filename.
  return signUpload({ url, name: "avatar", userId });
}

/**
 * Turn the token the upload route issued back into the URL it refers to.
 *
 * This is the only way an avatar location enters a record. The form submits a
 * token, never a URL, so a client-supplied address cannot reach a column that
 * is later rendered as the `src` of an image on a public page.
 */
export function resolveAvatarUpload(
  token: string,
  userId: string,
): string | null {
  return verifyUpload(token, userId)?.url ?? null;
}
