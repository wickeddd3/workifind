import prisma from "@/shared/lib/prisma";
import type { SavedJob } from "../model/types";

export async function getInitialSavedJobs(
  userId: string,
  size?: number,
): Promise<SavedJob[]> {
  try {
    // Parse size to integer
    const take = size || 8;
    // Fetch initial list of saved jobs from the database that match to userId
    const savedJobs = await prisma.savedJob.findMany({
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

    return savedJobs;
  } catch (error) {
    return [];
  }
}
