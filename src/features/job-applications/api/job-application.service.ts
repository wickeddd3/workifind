import { type JobApplicationWithJob } from "@/entities/job-application";
import prisma from "@/shared/lib/prisma";

export async function getJobApplications(
  userId: string,
  queryParams: {
    take: number;
    skip: number;
  },
): Promise<JobApplicationWithJob[]> {
  try {
    const { take, skip } = queryParams;

    return await prisma.jobApplication.findMany({
      where: { userId },
      include: {
        // The employer comes with the job: the list names the company you
        // applied to, which it previously could not, having never loaded it.
        job: { include: { employer: true } },
      },
      // Most recent application first — this is a log of what you have done,
      // and the last thing you did is the thing you are checking on.
      orderBy: { createdAt: "desc" },
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
