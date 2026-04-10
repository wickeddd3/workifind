import db from "@/shared/lib/prisma";
import type { EmployerJob } from "@/entities/job";
import type { Job } from "@prisma/client";

export async function getJobs(
  userId: string,
  queryParams: {
    take: number;
    skip: number;
  },
): Promise<EmployerJob[]> {
  try {
    const { take, skip } = queryParams;

    return await db.job.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      include: {
        employer: true,
        jobApplications: true,
      },
      take, // limit,
      skip, // offset,
    });
  } catch (error) {
    return [];
  }
}

export async function getJobsCount(userId: string): Promise<number> {
  try {
    return await db.job.count({
      where: { userId },
    });
  } catch (error) {
    return 0;
  }
}

export async function deleteJob(
  userId: string,
  jobId: number,
): Promise<Job | null> {
  try {
    return await db.job.delete({
      where: { userId, id: jobId },
    });
  } catch (error) {
    return null;
  }
}
