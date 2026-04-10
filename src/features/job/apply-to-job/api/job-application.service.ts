import db from "@/shared/lib/prisma";
import type { Prisma, JobApplication } from "@prisma/client";

export async function saveJobApplication(
  data: Prisma.JobApplicationUncheckedCreateInput,
): Promise<JobApplication | null> {
  try {
    return await db.jobApplication.create({
      data,
    });
  } catch (error) {
    return null;
  }
}
