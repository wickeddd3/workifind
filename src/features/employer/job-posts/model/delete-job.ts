import type { Job } from "@prisma/client";
import { deleteJob } from "../api/actions";

export async function deleteEmployerJob(
  userId: string,
  jobId: number,
): Promise<Job | null> {
  try {
    const job = await deleteJob(userId, jobId);

    return job;
  } catch (error) {
    return null;
  }
}
