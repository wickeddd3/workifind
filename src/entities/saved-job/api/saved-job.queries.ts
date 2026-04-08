"use server";

import prisma from "@/shared/lib/prisma";

export async function checkIfAlreadySaved(
  userId: string,
  jobId: number,
): Promise<boolean> {
  try {
    const savedJob = await prisma.savedJob.findFirst({
      where: { userId, jobId },
    });

    const isSaved = !!savedJob;

    return isSaved;
  } catch (error) {
    return false;
  }
}
