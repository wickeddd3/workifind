import type { EmployerJob } from "@/entities/job";
import { getJobs, getJobsCount } from "./job.service";

export async function getJobsQuery(
  userId: string,
  queryParams: {
    size?: number;
    page?: number;
  },
): Promise<{ success: boolean; data: EmployerJob[] | null; message: string }> {
  try {
    // Destructure query parameters
    const { size = 10, page = 1 } = queryParams;
    // Calculate the number of rows to skip
    const rowsToSkip = (page - 1) * size;
    // Fetch jobs from the database that match to userId
    const results = await getJobs(userId, { take: size, skip: rowsToSkip });

    return { success: true, data: results, message: "Queried successfully" };
  } catch (error) {
    return { success: false, data: [], message: "Query failed" };
  }
}

export async function getJobsCountQuery(
  userId: string,
): Promise<{ success: boolean; data: number | null; message: string }> {
  try {
    const results = await getJobsCount(userId);

    return { success: true, data: results, message: "Queried successfully" };
  } catch (error) {
    return { success: false, data: 0, message: "Query failed" };
  }
}
