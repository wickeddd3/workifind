import prisma from "@/shared/lib/prisma";
import type { Job } from "../model/types";

export async function getJob(id: number): Promise<Job | null> {
  try {
    const job = await prisma.job.findUnique({
      where: { id },
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

export async function getJobBySlug(slug: string): Promise<Job | null> {
  try {
    const job = await prisma.job.findUnique({
      where: { slug },
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
