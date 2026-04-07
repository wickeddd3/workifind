"use server";

import prisma from "@/shared/lib/prisma";
import { JobApplication } from "@prisma/client";

export async function authorizeAttempt(
  userId: string,
  jobId: number,
): Promise<boolean> {
  try {
    const jobApplication = await prisma.jobApplication.findFirst({
      where: { userId, jobId },
    });

    const isAuthorized = !!jobApplication;

    return !isAuthorized;
  } catch (error) {
    return false;
  }
}

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
