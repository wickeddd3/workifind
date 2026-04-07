import type { Job } from "@/entities/job";
import { getJob } from "../api/actions";

export async function getEmployerJob(
  userId: string,
  jobId: number,
): Promise<Job | null> {
  try {
    const job = await getJob(userId, jobId);

    return job;
  } catch (error) {
    return null;
  }
}
