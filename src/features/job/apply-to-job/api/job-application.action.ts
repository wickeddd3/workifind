"use server";

import { getAuthUser } from "@/shared/lib/clerk.server";
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

    const jobApplication = await saveJobApplication({
      ...formData,
      userId,
      applicantId,
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
