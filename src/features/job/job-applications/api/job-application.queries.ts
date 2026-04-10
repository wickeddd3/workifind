import type { JobApplication } from "@/entities/job-application";
import {
  getJobApplications,
  getJobApplicationsCount,
} from "./job-application.service";

export async function getJobApplicationsQuery(
  userId: string,
  queryParams: {
    size?: number;
    page?: number;
  },
): Promise<{
  success: boolean;
  data: JobApplication[] | null;
  message: string;
}> {
  try {
    // Destructure query parameters
    const { size = 10, page = 1 } = queryParams;
    // Calculate the number of rows to skip
    const rowsToSkip = (page - 1) * size;
    // Fetch jobs from the database that match to userId
    const results = await getJobApplications(userId, {
      take: size,
      skip: rowsToSkip,
    });

    return { success: true, data: results, message: "Queried successfully" };
  } catch (error) {
    return { success: false, data: [], message: "Query failed" };
  }
}

export async function getJobApplicationsCountQuery(
  userId: string,
): Promise<{ success: boolean; data: number | null; message: string }> {
  try {
    const results = await getJobApplicationsCount(userId);

    return { success: true, data: results, message: "Queried successfully" };
  } catch (error) {
    return { success: false, data: 0, message: "Query failed" };
  }
}
