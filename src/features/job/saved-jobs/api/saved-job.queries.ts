import type { SavedJob } from "@/entities/saved-job";
import { getSavedJobs, getSavedJobsCount } from "./saved-job.service";

export async function getSavedJobsQuery(
  userId: string,
  queryParams: {
    size?: number;
    page?: number;
  },
): Promise<{
  success: boolean;
  data: SavedJob[] | null;
  message: string;
}> {
  try {
    // Destructure query parameters
    const { size = 10, page = 1 } = queryParams;
    // Calculate the number of rows to skip
    const rowsToSkip = (page - 1) * size;
    // Fetch saved jobs from the database that match to userId
    const results = await getSavedJobs(userId, {
      take: size,
      skip: rowsToSkip,
    });

    return { success: true, data: results, message: "Queried successfully" };
  } catch (error) {
    return { success: false, data: [], message: "Query failed" };
  }
}

export async function getSavedJobsCountQuery(
  userId: string,
): Promise<{ success: boolean; data: number | null; message: string }> {
  try {
    const results = await getSavedJobsCount(userId);

    return { success: true, data: results, message: "Queried successfully" };
  } catch (error) {
    return { success: false, data: 0, message: "Query failed" };
  }
}
