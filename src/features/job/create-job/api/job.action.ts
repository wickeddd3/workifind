"use server";

import { getAuthUser } from "@/shared/lib/clerk.server";
import { getEmployer } from "@/entities/employer";
import type { JobSchemaType } from "../model/schema";
import type { Job } from "@prisma/client";
import { mapJobForm } from "../model/map-job-data";
import { createJob } from "./job.service";

export async function createJobAction(
  employerId: number,
  formData: JobSchemaType,
): Promise<{ success: boolean; data: Job | null; message: string }> {
  try {
    const { userId } = await getAuthUser();
    if (!userId) throw new Error("Unauthorized");

    // Ownership check: derive the employer from the authenticated user and
    // reject any attempt to post under an employer the caller doesn't own.
    const employer = await getEmployer(userId);
    if (!employer || employer.id !== employerId) throw new Error("Forbidden");

    const sanitizedData = mapJobForm(formData);

    const job = await createJob({
      ...sanitizedData,
      userId,
      employerId: employer.id,
    });

    return { success: true, data: job, message: "Created successfully" };
  } catch (error) {
    return { success: false, data: null, message: "Creation failed" };
  }
}
