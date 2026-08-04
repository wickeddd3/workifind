import { nanoid } from "nanoid";

import { logger } from "@/shared/lib/logger";
import { signUpload, verifyUpload } from "@/shared/lib/upload-signature";
import { upload } from "@/shared/lib/vercel-blob.server";

import {
  RESUME_MAX_SIZE_BYTES,
  RESUME_MIME_TYPES,
  toResumeFileName,
} from "../model/resume";

/** What a stored résumé is, to whoever writes it to a record. */
export interface StoredResume {
  url: string;
  name: string;
}

const ALLOWED = RESUME_MIME_TYPES as readonly string[];

/** The type an extension implies, for browsers that do not send a useful one. */
const TYPE_BY_EXTENSION: Record<string, (typeof RESUME_MIME_TYPES)[number]> = {
  ".pdf": "application/pdf",
  ".doc": "application/msword",
  ".docx":
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
};

/**
 * The content type to store the résumé under.
 *
 * The browser's own `file.type` is preferred but not trusted to be present:
 * Windows Chrome sends `.docx` as `application/octet-stream` whenever Office is
 * not registered as the handler, and taking that at face value would reject
 * real résumés at the storage layer. Falling back to the extension is safe
 * because the result is still one of three values we chose — an unrecognised
 * extension resolves to nothing and the upload is refused.
 */
function resolveContentType(file: File): string | null {
  if (ALLOWED.includes(file.type)) return file.type;

  const extension = file.name.toLowerCase().match(/\.[a-z0-9]+$/)?.[0];

  return extension ? TYPE_BY_EXTENSION[extension] ?? null : null;
}

/**
 * Put a résumé in blob storage.
 *
 * Lives in the entity, not in either feature that calls it: the profile editor
 * and the apply form upload the same file under the same rules, and a second
 * copy of those rules is how the size cap ends up different in the two places.
 *
 * The path is server-generated. The uploaded name never touches it — it is kept
 * only as the name the download arrives under, and `addRandomSuffix` means the
 * stored path is unguessable regardless.
 */
export async function uploadApplicantResume(
  file: File,
): Promise<StoredResume | null> {
  const contentType = resolveContentType(file);

  if (!contentType) {
    logger.warn("Résumé rejected: unsupported file type", {
      name: file.name,
      type: file.type,
    });
    return null;
  }

  // Re-wrapped so the blob is stored under the type resolved above rather than
  // whatever the browser guessed — the download route echoes the stored type,
  // and `application/octet-stream` is what makes a PDF download as junk.
  const typed =
    file.type === contentType
      ? file
      : new File([file], file.name, { type: contentType });

  const url = await upload(typed, `resume/${nanoid()}`, {
    allowedContentTypes: [...RESUME_MIME_TYPES],
    maxSizeBytes: RESUME_MAX_SIZE_BYTES,
  });

  if (!url) {
    // `upload` returns null for both a rejected file and a failed request, and
    // the caller shows the same "could not save" either way, so the fact that
    // it got this far and still failed has to be recorded here.
    logger.warn("Résumé upload failed", { name: file.name, type: contentType });
    return null;
  }

  return { url, name: toResumeFileName(file.name) };
}

/**
 * Turn the token the upload route issued back into the file it refers to.
 *
 * This is the only way a résumé location enters a record. The form submits a
 * token, never a URL, so there is no path by which a client-supplied address
 * reaches the column that the download routes later fetch from.
 */
export function resolveResumeUpload(
  token: string,
  userId: string,
): StoredResume | null {
  const claims = verifyUpload(token, userId);
  if (!claims) return null;

  return { url: claims.url, name: claims.name };
}

/** Sign a freshly stored résumé so the browser can hand it back on Save. */
export function signResumeUpload(stored: StoredResume, userId: string): string {
  return signUpload({ url: stored.url, name: stored.name, userId });
}
