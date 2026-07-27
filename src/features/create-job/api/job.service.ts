import type { Job, Prisma } from "@prisma/client";

import db from "@/shared/lib/prisma";

export async function createJob(
  data: Prisma.JobUncheckedCreateInput,
): Promise<Job | null> {
  try {
    return await db.job.create({
      data,
    });
  } catch (error) {
    return null;
  }
}
