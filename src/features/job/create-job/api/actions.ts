"use server";

import prisma from "@/shared/lib/prisma";
import type { Job } from "@prisma/client";

export async function createJob(
  userId: string,
  employerId: number,
  formData: {
    slug: string;
    title: string;
    employmentType: string;
    description?: string;
    locationType: string;
    location?: string;
    minSalary: number;
    maxSalary: number;
  },
): Promise<Job | null> {
  try {
    const job = await prisma.job.create({
      data: {
        userId,
        employerId,
        ...formData,
      },
    });

    return job;
  } catch (error) {
    return null;
  }
}
