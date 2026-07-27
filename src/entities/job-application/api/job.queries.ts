import db from "@/shared/lib/prisma";

import type { JobWithApplications } from "../model/types";

export async function getJob(id: number): Promise<JobWithApplications | null> {
  try {
    const job = await db.job.findUnique({
      where: { id },
      include: {
        employer: true,
        jobApplications: {
          include: {
            applicant: true,
          },
        },
      },
    });

    return job;
  } catch (error) {
    return null;
  }
}
