"use server";

import type { JobApplication } from "@prisma/client";

import { getApplicant } from "@/entities/applicant";
import { requireRole } from "@/shared/lib/clerk.server";

import {
  JobApplicationSchema,
  type JobApplicationSchemaType,
} from "../model/schema";
import { saveJobApplication } from "./job-application.service";

export async function saveJobApplicationAction(
  applicantId: number,
  jobId: number,
  formData: JobApplicationSchemaType,
): Promise<{ success: boolean; data: JobApplication | null; message: string }> {
  try {
    const { userId } = await requireRole("APPLICANT");

    // Never trust client input: re-validate against the schema server-side.
    const parsed = JobApplicationSchema.safeParse(formData);
    if (!parsed.success) throw new Error("Invalid input");

    // Ownership check: the application must be filed under the caller's own
    // applicant profile, not an arbitrary client-supplied applicantId.
    const applicant = await getApplicant(userId);
    if (!applicant || applicant.id !== applicantId) {
      throw new Error("Forbidden");
    }

    const jobApplication = await saveJobApplication({
      ...parsed.data,
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
