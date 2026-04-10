"use server";

import { getAuthUser } from "@/shared/lib/clerk.server";
import type { JobSchemaType } from "../model/schema";
import type { Job } from "@prisma/client";
import { mapJobForm } from "../model/map-job-data";
import { updateJob } from "./job.service";

export async function updateJobAction(
  id: number,
  formData: JobSchemaType,
): Promise<{ success: boolean; data: Job | null; message: string }> {
  try {
    const { userId } = await getAuthUser();
    if (!userId) throw new Error("Unauthorized");

    const sanitizedData = mapJobForm(formData);

    const job = await updateJob(userId, id, sanitizedData);

    return { success: true, data: job, message: "Updated successfully" };
  } catch (error) {
    return { success: false, data: null, message: "Update failed" };
  }
}
