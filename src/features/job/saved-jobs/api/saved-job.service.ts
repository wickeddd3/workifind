import prisma from "@/shared/lib/prisma";
import type { SavedJob } from "@/entities/saved-job";

export async function getSavedJobs(
  userId: string,
  queryParams: {
    take: number;
    skip: number;
  },
): Promise<SavedJob[]> {
  try {
    const { take, skip } = queryParams;

    return await prisma.savedJob.findMany({
      where: { userId },
      include: {
        job: {
          include: {
            employer: true,
          },
        },
      },
      take, // limit,
      skip, // offset,
    });
  } catch (error) {
    return [];
  }
}

export async function getSavedJobsCount(userId: string): Promise<number> {
  try {
    return await prisma.savedJob.count({
      where: { userId },
    });
  } catch (error) {
    return 0;
  }
}
