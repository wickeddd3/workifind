import { toggleSaveJob } from "../api/actions";

export async function toggleSaveJobPost(
  userId: string,
  applicantId: number,
  jobId: number,
  isCurrentlySaved: boolean,
): Promise<boolean> {
  try {
    await toggleSaveJob(userId, applicantId, jobId, isCurrentlySaved);

    return true;
  } catch (error) {
    return false;
  }
}
