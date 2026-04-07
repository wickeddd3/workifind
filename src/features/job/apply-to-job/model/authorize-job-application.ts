import { authorizeAttempt } from "../api/actions";

export async function authorizeJobApplicationAttempt(
  userId: string,
  jobId: number,
): Promise<boolean> {
  try {
    const isAuthorized = await authorizeAttempt(userId, jobId);

    return isAuthorized;
  } catch (error) {
    return false;
  }
}
