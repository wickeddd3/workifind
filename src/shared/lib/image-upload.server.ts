import { nanoid } from "nanoid";

import {
  IMAGE_MAX_SIZE_BYTES,
  IMAGE_MIME_TYPES,
} from "@/shared/utils/image-file";

import { logger } from "./logger";
import { upload } from "./vercel-blob.server";

/**
 * Put a profile image in blob storage and say where it went.
 *
 * The path is server-generated and the uploaded filename never touches it.
 * Unlike a résumé, nothing ever downloads one of these under its original name
 * — it is rendered in an `<img>` — so the name is not kept at all.
 *
 * `prefix` is the folder, and it is the caller's only say in the path:
 * `addRandomSuffix` in the blob helper makes the rest unguessable.
 */
export async function storeImage(
  file: File,
  prefix: string,
): Promise<string | null> {
  const url = await upload(file, `${prefix}/${nanoid()}`, {
    allowedContentTypes: [...IMAGE_MIME_TYPES],
    maxSizeBytes: IMAGE_MAX_SIZE_BYTES,
  });

  if (!url) {
    // `upload` returns null for both a rejected file and a failed request, and
    // the caller shows the same "could not save" either way, so the fact that
    // it got past the route's own checks and still failed has to be recorded
    // here or it is recorded nowhere.
    logger.warn("Image upload failed", { prefix, type: file.type });
    return null;
  }

  return url;
}
