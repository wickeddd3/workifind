import { SavedJob } from "@prisma/client";
import { saveJob, unsaveJob } from "../api/actions";

export async function saveJobPost(
  userId: string,
  applicantId: number,
  jobId: number,
): Promise<SavedJob | null> {
  try {
    const savedJob = await saveJob(userId, applicantId, jobId);

    return savedJob;
  } catch (error) {
    return null;
  }
}

export async function unsaveJobPost(
  userId: string,
  jobId: number,
): Promise<boolean> {
  try {
    const savedJob = await unsaveJob(userId, jobId);

    return savedJob;
  } catch (error) {
    return false;
  }
}
