"use server";

import type { JobApplication } from "@prisma/client";

import {
  type Applicant,
  getApplicant,
  resolveResumeUpload,
  type StoredResume,
} from "@/entities/applicant";
import { requireRole } from "@/shared/lib/clerk.server";

import {
  JobApplicationSchema,
  type JobApplicationSchemaType,
} from "../model/schema";
import { saveJobApplication } from "./job-application.service";

export async function saveJobApplicationAction(
  applicantId: string,
  jobId: string,
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

    const { pitch, resumeToken } = parsed.data;

    const resume = resolveResume(resumeToken, applicant, userId);
    if (resume === null) {
      return {
        success: false,
        data: null,
        message: "That upload has expired. Please choose the file again.",
      };
    }

    const jobApplication = await saveJobApplication({
      pitch,
      resumeUrl: resume?.url ?? null,
      resumeName: resume?.name ?? null,
      userId,
      applicantId: applicant.id,
      jobId,
    });

    // The write can fail and return null, and this used to report success
    // anyway — the applicant was sent to the "your application is on its way"
    // page for an application that was never stored.
    if (!jobApplication) {
      return { success: false, data: null, message: "Creation failed" };
    }

    return {
      success: true,
      data: jobApplication,
      message: "Created successfully",
    };
  } catch (error) {
    return { success: false, data: null, message: "Creation failed" };
  }
}

/**
 * The résumé this application is sent with: the file attached here if there is
 * one, otherwise a copy of the profile's. `null` means a reference was
 * submitted that does not verify; `undefined` means there was nothing to send.
 *
 * A copy, not a reference. The employer must keep seeing the document they were
 * actually sent, so replacing the profile résumé later cannot rewrite
 * applications already filed. The blob is shared rather than duplicated —
 * nothing deletes it, so the snapshot stays readable.
 *
 * The profile branch takes the URL straight from the record, and that is safe
 * for the reason the token exists: nothing reaches that column without having
 * been signed on the way in.
 */
function resolveResume(
  token: string | undefined,
  applicant: Applicant,
  userId: string,
): StoredResume | null | undefined {
  if (token) return resolveResumeUpload(token, userId);

  if (!applicant.resumeUrl) return undefined;

  return {
    url: applicant.resumeUrl,
    name: applicant.resumeName ?? "resume",
  };
}
