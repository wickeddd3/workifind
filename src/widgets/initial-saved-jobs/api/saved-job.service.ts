import db from "@/shared/lib/prisma";
import type { SavedJob } from "@/entities/saved-job";

export async function getInitialSavedJobs(
  userId: string,
  take: number,
): Promise<SavedJob[]> {
  try {
    return await db.savedJob.findMany({
      where: { userId },
      include: {
        job: {
          include: {
            employer: true,
          },
        },
      },
      take,
    });
  } catch (error) {
    return [];
  }
}
