"use server";

import { getAuthUser } from "@/shared/lib/clerk.server";
import { saveJob, unsaveJob } from "./saved-job.service";
import { revalidatePath } from "next/cache";

export async function toggleSaveJobAction(
  applicantId: number,
  jobId: number,
  isCurrentlySaved: boolean,
): Promise<{ success: boolean; data: boolean; message: string }> {
  try {
    const { userId } = await getAuthUser();
    if (!userId) throw new Error("Unauthorized");

    if (isCurrentlySaved) {
      await unsaveJob(userId, jobId);
      revalidatePath(`/jobs/${jobId}`);
      return {
        success: true,
        data: false,
        message: "Unsaved successfully",
      };
    } else {
      await saveJob({ userId, applicantId, jobId });
      revalidatePath(`/jobs/${jobId}`);
      return {
        success: true,
        data: true,
        message: "Saved successfully",
      };
    }
  } catch (error) {
    return { success: false, data: false, message: "Toggle failed" };
  }
}
