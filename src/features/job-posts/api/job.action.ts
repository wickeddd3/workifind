"use server";

import { revalidatePath, revalidateTag } from "next/cache";

import { JOBS_SEARCH_TAG } from "@/features/search-jobs";
import { requireRole } from "@/shared/lib/clerk.server";

import { deleteJob } from "./job.service";

export async function deleteJobAction(
  jobId: string,
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
    // A deleted post must leave the results count too, which is cached by tag
    // rather than by path.
    revalidateTag(JOBS_SEARCH_TAG);

    return {
      success: true,
      data: true,
      message: "Deleted successfully",
    };
  } catch (error) {
    return { success: false, data: false, message: "Deletion failed" };
  }
}
