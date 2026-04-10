import db from "@/shared/lib/prisma";
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

    return await db.savedJob.findMany({
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
    return await db.savedJob.count({
      where: { userId },
    });
  } catch (error) {
    return 0;
  }
}

export async function unsaveJob(userId: string, jobId: number): Promise<void> {
  try {
    await db.savedJob.deleteMany({ where: { userId, jobId } });
  } catch (error) {
    return;
  }
}
