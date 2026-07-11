"use server";

import { getAuthUser } from "@/shared/lib/clerk.server";
import { getApplicant } from "@/entities/applicant";
import type { JobApplicationSchemaType } from "../model/schema";
import type { JobApplication } from "@prisma/client";
import { saveJobApplication } from "./job-application.service";

export async function saveJobApplicationAction(
  applicantId: number,
  jobId: number,
  formData: JobApplicationSchemaType,
): Promise<{ success: boolean; data: JobApplication | null; message: string }> {
  try {
    const { userId } = await getAuthUser();
    if (!userId) throw new Error("Unauthorized");

    // Ownership check: the application must be filed under the caller's own
    // applicant profile, not an arbitrary client-supplied applicantId.
    const applicant = await getApplicant(userId);
    if (!applicant || applicant.id !== applicantId) {
      throw new Error("Forbidden");
    }

    const jobApplication = await saveJobApplication({
      ...formData,
      userId,
      applicantId: applicant.id,
      jobId,
    });

    return {
      success: true,
      data: jobApplication,
      message: "Created successfully",
    };
  } catch (error) {
    return { success: false, data: null, message: "Creation failed" };
  }
}
