import prisma from "@/shared/lib/prisma";
import type { JobApplication } from "../model/types";

export async function getJobApplications(
  userId: string,
  searchParams: {
    size?: number;
    page?: number;
  },
): Promise<JobApplication[]> {
  try {
    // Destructure query parameters
    const { size = 10, page = 1 } = searchParams;
    // Calculate the number of rows to skip
    const rowsToSkip = (page - 1) * size;
    // Fetch job applications from the database that match to userId
    const jobApplications = await prisma.jobApplication.findMany({
      where: { userId },
      include: {
        job: true,
      },
      take: size, // limit,
      skip: rowsToSkip, // offset,
    });

    return jobApplications;
  } catch (error) {
    return [];
  }
}

export async function getJobApplicationsCount(userId: string): Promise<number> {
  try {
    const jobApplicationsCount = await prisma.jobApplication.count({
      where: { userId },
    });

    return jobApplicationsCount;
  } catch (error) {
    return 0;
  }
}
