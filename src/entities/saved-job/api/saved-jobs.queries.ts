"use server";

import prisma from "@/shared/lib/prisma";
import type { SavedJob } from "../model/types";

export async function getSavedJobs(
  userId: string,
  searchParams: {
    size?: number;
    page?: number;
  },
): Promise<SavedJob[]> {
  try {
    // Destructure query parameters
    const { size = 10, page = 1 } = searchParams;
    // Calculate the number of rows to skip
    const rowsToSkip = (page - 1) * size;
    // Fetch saved jobs from the database that match to userId
    const savedJobs = await prisma.savedJob.findMany({
      where: { userId },
      include: {
        job: {
          include: {
            employer: true,
          },
        },
      },
      take: size, // limit,
      skip: rowsToSkip, // offset,
    });

    return savedJobs;
  } catch (error) {
    return [];
  }
}

export async function getSavedJobsCount(userId: string): Promise<number> {
  try {
    const savedJobsCount = await prisma.savedJob.count({
      where: { userId },
    });

    return savedJobsCount;
  } catch (error) {
    return 0;
  }
}

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
