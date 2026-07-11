"use server";

import type { Job } from "@prisma/client";

import { getEmployer } from "@/entities/employer";
import { requireRole } from "@/shared/lib/clerk.server";

import { mapJobForm } from "../model/map-job-data";
import { JobSchema, type JobSchemaType } from "../model/schema";
import { createJob } from "./job.service";

export async function createJobAction(
  employerId: number,
  formData: JobSchemaType,
): Promise<{ success: boolean; data: Job | null; message: string }> {
  try {
    const { userId } = await requireRole("EMPLOYER");

    // Never trust client input: re-validate against the schema server-side.
    const parsed = JobSchema.safeParse(formData);
    if (!parsed.success) throw new Error("Invalid input");

    // Ownership check: derive the employer from the authenticated user and
    // reject any attempt to post under an employer the caller doesn't own.
    const employer = await getEmployer(userId);
    if (!employer || employer.id !== employerId) throw new Error("Forbidden");

    const sanitizedData = mapJobForm(parsed.data);

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
