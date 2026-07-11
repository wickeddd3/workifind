"use server";

import { revalidatePath } from "next/cache";

import { requireRole } from "@/shared/lib/clerk.server";

import { unsaveJob } from "./saved-job.service";

export async function unsaveJobAction(
  jobId: number,
): Promise<{ success: boolean; data: boolean; message: string }> {
  try {
    const { userId } = await requireRole("APPLICANT");

    await unsaveJob(userId, jobId);

    revalidatePath(`/jobs/${jobId}`);
    revalidatePath("/applicant/jobs/saved");
    return {
      success: true,
      data: true,
      message: "Unsaved successfully",
    };
  } catch (error) {
    return { success: false, data: false, message: "Unsave failed" };
  }
}
