"use server";

import { getAuthUser } from "@/shared/lib/clerk.server";
import { unsaveJob } from "./saved-job.service";
import { revalidatePath } from "next/cache";

export async function unsaveJobAction(
  jobId: number,
): Promise<{ success: boolean; data: boolean; message: string }> {
  try {
    const { userId } = await getAuthUser();
    if (!userId) throw new Error("Unauthorized");

    await unsaveJob(userId, jobId);

    revalidatePath(`/jobs/${jobId}`);
    return {
      success: true,
      data: true,
      message: "Unsaved successfully",
    };
  } catch (error) {
    return { success: false, data: false, message: "Unsave failed" };
  }
}
