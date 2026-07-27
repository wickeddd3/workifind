import { nanoid } from "nanoid";

import { upload } from "@/shared/lib/vercel-blob.server";

const ALLOWED_LOGO_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_LOGO_SIZE_BYTES = 2 * 1024 * 1024; // 2MB

export async function uploadEmployerLogo(file: File): Promise<string | null> {
  try {
    // Server-generated path — never derived from client-supplied names.
    const filePath = `company-logo/${nanoid()}`;

    return await upload(file, filePath, {
      allowedContentTypes: ALLOWED_LOGO_TYPES,
      maxSizeBytes: MAX_LOGO_SIZE_BYTES,
    });
  } catch (error) {
    return null;
  }
}
