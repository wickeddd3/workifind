import db from "@/shared/lib/prisma";
import type { Prisma, Job } from "@prisma/client";

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
