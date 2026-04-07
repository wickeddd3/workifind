"use server";

import type { Job } from "@/entities/job";
import prisma from "@/shared/lib/prisma";

export async function getJob(
  userId: string,
  jobId: number,
): Promise<Job | null> {
  try {
    const job = await prisma.job.findUnique({
      where: { userId, id: jobId },
      include: {
        employer: true,
        jobApplications: {
          include: {
            applicant: true,
          },
        },
      },
    });

    return job;
  } catch (error) {
    return null;
  }
}
