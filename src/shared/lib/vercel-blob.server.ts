"use server";

import { put } from "@vercel/blob";

export async function upload(
  file: File,
  filePath: string,
): Promise<string | null> {
  try {
    // Upload file to Vercel Blob Storage
    const blob = await put(filePath, file, {
      access: "public", // Set to "private" if you don't want public access
      contentType: file.type,
    });

    return blob.url;
  } catch (error) {
    return null;
  }
}
