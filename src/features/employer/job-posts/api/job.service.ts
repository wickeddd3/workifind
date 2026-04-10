import prisma from "@/shared/lib/prisma";
import type { EmployerJob } from "@/entities/job";

export async function getJobs(
  userId: string,
  queryParams: {
    take: number;
    skip: number;
  },
): Promise<EmployerJob[]> {
  try {
    const { take, skip } = queryParams;

    return await prisma.job.findMany({
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
    return await prisma.job.count({
      where: { userId },
    });
  } catch (error) {
    return 0;
  }
}
