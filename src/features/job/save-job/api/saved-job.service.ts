import db from "@/shared/lib/prisma";
import type { Prisma, SavedJob } from "@prisma/client";

export async function saveJob(
  data: Prisma.SavedJobUncheckedCreateInput,
): Promise<SavedJob | null> {
  try {
    return await db.savedJob.create({ data });
  } catch (error) {
    return null;
  }
}

export async function unsaveJob(userId: string, jobId: number): Promise<void> {
  try {
    await db.savedJob.deleteMany({ where: { userId, jobId } });
  } catch (error) {
    return;
  }
}
