import { type JobApplicationWithApplicant } from "@/entities/job-application";
import { logger } from "@/shared/lib/logger";
import prisma from "@/shared/lib/prisma";

/**
 * Applications to one of the employer's own posts.
 *
 * Every read is scoped through `job: { userId }` rather than by jobId alone:
 * the id comes from the URL, and without the owner in the filter any signed-in
 * user could read the applicants — names, emails, pitches — of any job by
 * changing the number.
 */
export async function getReceivedApplications(
  userId: string,
  jobId: number,
  queryParams: {
    take: number;
    skip: number;
  },
): Promise<JobApplicationWithApplicant[]> {
  try {
    const { take, skip } = queryParams;

    return await prisma.jobApplication.findMany({
      where: { jobId, job: { userId } },
      include: { applicant: true },
      // Newest applicant first. The order used to be whatever the database
      // returned, so an employer working through a list had no way to tell
      // which ones had arrived since they last looked.
      orderBy: { createdAt: "desc" },
      take,
      skip,
    });
  } catch (error) {
    // An empty list and a failed query render identically — "No applicants yet"
    // — so the failure has to say so somewhere.
    logger.error("Failed to load received applications", {
      error,
      userId,
      jobId,
    });
    return [];
  }
}

export async function getReceivedApplicationsCount(
  userId: string,
  jobId: number,
): Promise<number> {
  try {
    return await prisma.jobApplication.count({
      where: { jobId, job: { userId } },
    });
  } catch (error) {
    logger.error("Failed to count received applications", {
      error,
      userId,
      jobId,
    });
    return 0;
  }
}
