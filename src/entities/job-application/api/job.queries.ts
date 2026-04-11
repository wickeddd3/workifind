import db from "@/shared/lib/prisma";
import type { EmployerJob } from "@/entities/job";

export async function getJob(id: number): Promise<EmployerJob | null> {
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
