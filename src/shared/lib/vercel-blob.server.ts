"use server";

import { put } from "@vercel/blob";
import { logger } from "./logger";

// Safe defaults: images only, 5MB cap. Callers can narrow further.
const DEFAULT_ALLOWED_CONTENT_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
];
const DEFAULT_MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5MB

type UploadOptions = {
  allowedContentTypes?: string[];
  maxSizeBytes?: number;
};

export async function upload(
  file: File,
  filePath: string,
  options: UploadOptions = {},
): Promise<string | null> {
  try {
    const {
      allowedContentTypes = DEFAULT_ALLOWED_CONTENT_TYPES,
      maxSizeBytes = DEFAULT_MAX_SIZE_BYTES,
    } = options;

    // Reject anything that isn't a real, non-empty file.
    if (!(file instanceof File) || file.size === 0) return null;

    // Enforce a size cap before the bytes ever reach storage.
    if (file.size > maxSizeBytes) return null;

    // Only allow explicitly whitelisted MIME types.
    if (!allowedContentTypes.includes(file.type)) return null;

    // Upload file to Vercel Blob Storage. `addRandomSuffix` guarantees a
    // collision-free, non-guessable path even if callers reuse a prefix.
    const blob = await put(filePath, file, {
      access: "public",
      contentType: file.type,
      addRandomSuffix: true,
    });

    return blob.url;
  } catch (error) {
    logger.error("Blob upload failed", error, { filePath });
    return null;
  }
}
