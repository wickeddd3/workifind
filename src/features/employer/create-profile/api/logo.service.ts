import { upload } from "@/shared/lib/vercel-blob.server";

export async function uploadEmployerLogo(file: File): Promise<string | null> {
  try {
    const filePath = `company-logo/${Date.now()}-${Math.random().toString(36).substring(7)}`;

    // Upload file to Vercel Blob Storage
    const blobUrl = await upload(file, filePath);

    return blobUrl;
  } catch (error) {
    return null;
  }
}
