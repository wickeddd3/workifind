import prisma from "@/shared/lib/prisma";
import { JobApplication } from "@/entities/job-application";

export async function getJobApplications(
  userId: string,
  queryParams: {
    take: number;
    skip: number;
  },
): Promise<JobApplication[]> {
  try {
    const { take, skip } = queryParams;

    return await prisma.jobApplication.findMany({
      where: { userId },
      include: {
        job: true,
      },
      take, // limit,
      skip, // offset,
    });
  } catch (error) {
    return [];
  }
}

export async function getJobApplicationsCount(userId: string): Promise<number> {
  try {
    return await prisma.jobApplication.count({
      where: { userId },
    });
  } catch (error) {
    return 0;
  }
}
