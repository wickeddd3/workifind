import { storeImage } from "@/shared/lib/image-upload.server";
import { signUpload, verifyUpload } from "@/shared/lib/upload-signature";

/** Put a logo in blob storage. `null` when it was rejected or the write failed. */
export async function uploadEmployerLogo(file: File): Promise<string | null> {
  return storeImage(file, "company-logo");
}

/** Sign a freshly stored logo so the browser can hand it back on Save. */
export function signLogoUpload(url: string, userId: string): string {
  // The name is carried by the token's shape but means nothing for an image:
  // nothing ever downloads one under its original filename.
  return signUpload({ url, name: "logo", userId });
}

/**
 * Turn the token the upload route issued back into the URL it refers to.
 *
 * This is the only way a logo location enters a record. The form submits a
 * token, never a URL, so a client-supplied address cannot reach a column that
 * is later rendered as the `src` of an image on a public page.
 */
export function resolveLogoUpload(
  token: string,
  userId: string,
): string | null {
  return verifyUpload(token, userId)?.url ?? null;
}
