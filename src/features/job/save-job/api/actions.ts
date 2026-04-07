"use server";

import prisma from "@/shared/lib/prisma";
import { revalidatePath } from "next/cache";

export async function authorizeAttempt(
  userId: string,
  jobId: number,
): Promise<boolean> {
  try {
    const savedJob = await prisma.savedJob.findFirst({
      where: { userId, jobId },
    });

    const isAuthorized = !!savedJob;

    return isAuthorized;
  } catch (error) {
    return false;
  }
}

export async function toggleSaveJob(
  userId: string,
  applicantId: number,
  jobId: number,
  isCurrentlySaved: boolean,
): Promise<boolean> {
  try {
    if (isCurrentlySaved) {
      await prisma.savedJob.deleteMany({ where: { userId, jobId } });
    } else {
      await prisma.savedJob.create({ data: { userId, applicantId, jobId } });
    }

    revalidatePath(`/jobs/${jobId}`);
    return true;
  } catch (error) {
    return false;
  }
}
