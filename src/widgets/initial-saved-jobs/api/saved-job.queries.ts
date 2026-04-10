"use server";

import type { SavedJob } from "@/entities/saved-job";
import { getInitialSavedJobs } from "./saved-job.service";

export async function getInitialSavedJobsQuery(
  userId: string,
  size?: number,
): Promise<{ success: boolean; data: SavedJob[] | null; message: string }> {
  try {
    // Parse size to integer
    const take = size || 8;

    const results = await getInitialSavedJobs(userId, take);

    return { success: true, data: results, message: "Queried successfully" };
  } catch (error) {
    return { success: false, data: [], message: "Query failed" };
  }
}
