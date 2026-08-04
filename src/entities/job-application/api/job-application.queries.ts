import { logger } from "@/shared/lib/logger";
import prisma from "@/shared/lib/prisma";

export async function checkIfAlreadyApplied(
  userId: string,
  jobId: string,
): Promise<boolean> {
  try {
    const jobApplication = await prisma.jobApplication.findFirst({
      where: { userId, jobId },
    });

    const hasApplied = !!jobApplication;

    return hasApplied;
  } catch (error) {
    return false;
  }
}

/** What the download route needs to authorize a request and stream the file. */
export interface JobApplicationResumeRecord {
  /** The applicant who filed it. */
  userId: string;
  resumeUrl: string | null;
  resumeName: string | null;
  /** The employer who posted the job, and so may read what was sent to them. */
  job: { userId: string };
}

/**
 * The résumé attached to one application, and nothing else.
 *
 * Both userIds come back rather than the check being pushed into the `where`:
 * the two parties allowed to read this file — the applicant who sent it and the
 * employer who received it — are decided in the route, and a filter that
 * silently returns nothing is indistinguishable there from a missing record.
 */
export async function getJobApplicationResume(
  id: string,
): Promise<JobApplicationResumeRecord | null> {
  try {
    return await prisma.jobApplication.findUnique({
      where: { id },
      select: {
        userId: true,
        resumeUrl: true,
        resumeName: true,
        job: { select: { userId: true } },
      },
    });
  } catch (error) {
    logger.error("Failed to load application résumé", error, { id });
    return null;
  }
}
