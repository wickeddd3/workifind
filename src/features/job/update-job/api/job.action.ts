"use server";

import { requireRole } from "@/shared/lib/clerk.server";
import { JobSchema, type JobSchemaType } from "../model/schema";
import type { Job } from "@prisma/client";
import { mapJobForm } from "../model/map-job-data";
import { updateJob } from "./job.service";

export async function updateJobAction(
  id: number,
  formData: JobSchemaType,
): Promise<{ success: boolean; data: Job | null; message: string }> {
  try {
    const { userId } = await requireRole("EMPLOYER");

    // Never trust client input: re-validate against the schema server-side.
    const parsed = JobSchema.safeParse(formData);
    if (!parsed.success) throw new Error("Invalid input");

    const sanitizedData = mapJobForm(parsed.data);

    const job = await updateJob(userId, id, sanitizedData);

    return { success: true, data: job, message: "Updated successfully" };
  } catch (error) {
    return { success: false, data: null, message: "Update failed" };
  }
}
