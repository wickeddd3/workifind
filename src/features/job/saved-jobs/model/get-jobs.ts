import { getSavedJobs, getSavedJobsCount } from "../api/actions";
import { SavedJob } from "./types";

export async function getApplicantSavedJobs(
  userId: string,
  searchParams: {
    size?: number;
    page?: number;
  },
): Promise<SavedJob[]> {
  try {
    const savedJobs = await getSavedJobs(userId, searchParams);

    return savedJobs;
  } catch (error) {
    return [];
  }
}

export async function getApplicantSavedJobsCount(
  userId: string,
): Promise<number> {
  try {
    const savedJobsCount = await getSavedJobsCount(userId);

    return savedJobsCount;
  } catch (error) {
    return 0;
  }
}
