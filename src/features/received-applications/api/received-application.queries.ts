import type { JobApplicationWithApplicant } from "@/entities/job-application";

import {
  getReceivedApplications,
  getReceivedApplicationsCount,
} from "./received-application.service";

export async function getReceivedApplicationsQuery(
  userId: string,
  jobId: number,
  queryParams: {
    size?: number;
    page?: number;
  },
): Promise<{
  success: boolean;
  data: JobApplicationWithApplicant[] | null;
  message: string;
}> {
  try {
    const { size = 10, page = 1 } = queryParams;
    // Calculate the number of rows to skip
    const rowsToSkip = (page - 1) * size;

    const results = await getReceivedApplications(userId, jobId, {
      take: size,
      skip: rowsToSkip,
    });

    return { success: true, data: results, message: "Queried successfully" };
  } catch (error) {
    return { success: false, data: [], message: "Query failed" };
  }
}

export async function getReceivedApplicationsCountQuery(
  userId: string,
  jobId: number,
): Promise<{ success: boolean; data: number | null; message: string }> {
  try {
    const results = await getReceivedApplicationsCount(userId, jobId);

    return { success: true, data: results, message: "Queried successfully" };
  } catch (error) {
    return { success: false, data: 0, message: "Query failed" };
  }
}
