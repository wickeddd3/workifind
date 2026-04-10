"use server";

import { getAuthUser } from "@/shared/lib/clerk.server";
import { deleteJob } from "./job.service";
import { revalidatePath } from "next/cache";

export async function deleteJobAction(
  jobId: number,
): Promise<{ success: boolean; data: boolean; message: string }> {
  try {
    const { userId } = await getAuthUser();
    if (!userId) throw new Error("Unauthorized");

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
