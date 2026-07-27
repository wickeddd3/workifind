import type { JobApplication, Prisma } from "@prisma/client";

import db from "@/shared/lib/prisma";

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
