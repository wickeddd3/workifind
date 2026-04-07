import type { Job } from "@/entities/job";
import type { Job as PrismaJob } from "@prisma/client";
import prisma from "@/shared/lib/prisma";

export async function getJobs(
  userId: string,
  searchParams: {
    size?: number;
    page?: number;
  },
): Promise<Job[]> {
  try {
    // Destructure query parameters
    const { size = 10, page = 1 } = searchParams;
    // Calculate the number of rows to skip
    const rowsToSkip = (page - 1) * size;
    // Fetch jobs from the database that match to userId
    const jobs = await prisma.job.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" }, // Sort by createdAt in descending order
      include: {
        employer: true,
        jobApplications: true,
      },
      take: size, // limit,
      skip: rowsToSkip, // offset,
    });

    return jobs;
  } catch (error) {
    return [];
  }
}

export async function getJobsCount(userId: string): Promise<number> {
  try {
    const jobsCount = await prisma.job.count({
      where: { userId },
    });

    return jobsCount;
  } catch (error) {
    return 0;
  }
}

export async function deleteJob(
  userId: string,
  jobId: number,
): Promise<PrismaJob | null> {
  try {
    const job = await prisma.job.delete({
      where: { userId, id: jobId },
    });

    return job;
  } catch (error) {
    return null;
  }
}
