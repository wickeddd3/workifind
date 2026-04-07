"use server";

import prisma from "@/shared/lib/prisma";
import type { SavedJob } from "@prisma/client";

export async function authorizeAttempt(
  userId: string,
  jobId: number,
): Promise<boolean> {
  try {
    const savedJob = await prisma.savedJob.findFirst({
      where: { userId, jobId },
    });

    const isAuthorized = !!savedJob;

    return !isAuthorized;
  } catch (error) {
    return false;
  }
}

export async function saveJob(
  userId: string,
  applicantId: number,
  jobId: number,
): Promise<SavedJob | null> {
  try {
    const savedJob = await prisma.savedJob.create({
      data: {
        userId,
        applicantId,
        jobId,
      },
    });

    return savedJob;
  } catch (error) {
    return null;
  }
}

export async function unsaveJob(
  userId: string,
  jobId: number,
): Promise<boolean> {
  try {
    const result = await prisma.savedJob.deleteMany({
      where: {
        userId,
        jobId,
      },
    });

    return result.count > 0;
  } catch (error) {
    return false;
  }
}
