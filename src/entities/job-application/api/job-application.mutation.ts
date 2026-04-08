"use server";

import prisma from "@/shared/lib/prisma";
import type { JobApplication } from "@prisma/client";

export async function saveJobApplication(
  userId: string,
  applicantId: number,
  jobId: number,
  formData: {
    pitch: string;
  },
): Promise<JobApplication | null> {
  try {
    const jobApplication = await prisma.jobApplication.create({
      data: {
        ...formData,
        userId,
        applicantId,
        jobId,
      },
    });

    return jobApplication;
  } catch (error) {
    return null;
  }
}
