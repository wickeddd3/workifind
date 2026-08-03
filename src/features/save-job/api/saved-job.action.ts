"use server";

import { revalidatePath } from "next/cache";

import { getApplicant } from "@/entities/applicant";
import { requireRole } from "@/shared/lib/clerk.server";

import { saveJob, unsaveJob } from "./saved-job.service";

export async function toggleSaveJobAction(
  applicantId: string,
  jobId: string,
  isCurrentlySaved: boolean,
): Promise<{ success: boolean; data: boolean; message: string }> {
  try {
    const { userId } = await requireRole("APPLICANT");

    if (isCurrentlySaved) {
      // unsaveJob is already scoped by userId, so it can only remove the
      // caller's own saved rows.
      await unsaveJob(userId, jobId);
      // Not the job page: it is prerendered and no longer depends on save
      // state, which JobActions resolves per viewer on the client. The previous
      // `/jobs/${jobId}` was a no-op anyway — that route is keyed by slug.
      revalidatePath("/applicant/jobs/saved");
      return {
        success: true,
        data: false,
        message: "Unsaved successfully",
      };
    } else {
      // Ownership check: only allow saving under the caller's own applicant.
      const applicant = await getApplicant(userId);
      if (!applicant || applicant.id !== applicantId) {
        throw new Error("Forbidden");
      }

      await saveJob({ userId, applicantId: applicant.id, jobId });
      revalidatePath("/applicant/jobs/saved");
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
