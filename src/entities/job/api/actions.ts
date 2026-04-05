"use server";

import prisma from "@/shared/lib/prisma";
import { Job } from "../model/types";

export async function getJobBySlug(slug: string): Promise<Job | null> {
  try {
    const job = await prisma.job.findUnique({
      where: { slug },
      include: {
        employer: true,
        jobApplications: true,
      },
    });

    return job;
  } catch (error) {
    return null;
  }
}
