"use server";

import prisma from "@/shared/lib/prisma";
import type { Job } from "@prisma/client";

export async function deleteJob(
  userId: string,
  jobId: number,
): Promise<Job | null> {
  try {
    const job = await prisma.job.delete({
      where: { userId, id: jobId },
    });

    return job;
  } catch (error) {
    return null;
  }
}
