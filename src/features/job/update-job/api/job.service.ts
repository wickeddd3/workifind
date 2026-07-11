import type { Job, Prisma } from "@prisma/client";

import db from "@/shared/lib/prisma";

export async function updateJob(
  userId: string,
  id: number,
  data: Prisma.JobUpdateInput,
): Promise<Job | null> {
  try {
    return await db.job.update({
      where: { userId, id },
      data,
    });
  } catch (error) {
    return null;
  }
}
