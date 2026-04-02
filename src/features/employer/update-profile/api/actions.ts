"use server";

import prisma from "@/shared/lib/prisma";
import { upload } from "@/shared/lib/vercel-blob";

export async function updateEmployer(
  id: number,
  formData: Partial<{
    companyName: string;
    industry: string;
    perks: string[];
  }>,
) {
  try {
    const employer = await prisma.employer.update({
      where: { id },
      data: {
        ...formData,
      },
    });

    return employer;
  } catch (error) {
    return null;
  }
}

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
