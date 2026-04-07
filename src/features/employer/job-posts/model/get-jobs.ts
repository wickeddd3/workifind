import type { Job } from "@/entities/job";
import { getJobs, getJobsCount } from "../api/actions";

export async function getEmployerJobs(
  userId: string,
  searchParams: {
    size?: number;
    page?: number;
  },
): Promise<Job[]> {
  try {
    const jobs = await getJobs(userId, searchParams);

    return jobs;
  } catch (error) {
    return [];
  }
}

export async function getEmployerJobsCount(userId: string): Promise<number> {
  try {
    const jobsCount = await getJobsCount(userId);

    return jobsCount;
  } catch (error) {
    return 0;
  }
}
