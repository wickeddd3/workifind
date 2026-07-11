"use server";

import { revalidatePath } from "next/cache";

import { requireRole } from "@/shared/lib/clerk.server";

import { deleteJob } from "./job.service";

export async function deleteJobAction(
  jobId: number,
): Promise<{ success: boolean; data: boolean; message: string }> {
  try {
    const { userId } = await requireRole("EMPLOYER");

    await deleteJob(userId, jobId);

    revalidatePath("/employer/jobs");

    return {
      success: true,
      data: true,
      message: "Deleted successfully",
    };
  } catch (error) {
    return { success: false, data: false, message: "Deletion failed" };
  }
}
