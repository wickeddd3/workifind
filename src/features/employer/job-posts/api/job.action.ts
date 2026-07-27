"use server";

import { revalidatePath } from "next/cache";

import { requireRole } from "@/shared/lib/clerk.server";

import { deleteJob } from "./job.service";

export async function deleteJobAction(
  jobId: number,
): Promise<{ success: boolean; data: boolean; message: string }> {
  try {
    const { userId } = await requireRole("EMPLOYER");

    const deleted = await deleteJob(userId, jobId);

    // The public job page is prerendered, so a deleted post would keep being
    // served from cache until the revalidation window elapsed.
    if (deleted) revalidatePath(`/jobs/${deleted.slug}`);
    revalidatePath("/employer/jobs");
    revalidatePath("/jobs");
    revalidatePath("/sitemap.xml");

    return {
      success: true,
      data: true,
      message: "Deleted successfully",
    };
  } catch (error) {
    return { success: false, data: false, message: "Deletion failed" };
  }
}
