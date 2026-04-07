import { SavedJob } from "@/entities/job";
import { getSavedJobs } from "../api/actions";

export async function getInitialSavedJobs(userId: string): Promise<SavedJob[]> {
  try {
    const savedJobs = await getSavedJobs(userId);

    return savedJobs;
  } catch (error) {
    return [];
  }
}
