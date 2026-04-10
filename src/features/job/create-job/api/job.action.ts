"use server";

import { getAuthUser } from "@/shared/lib/clerk.server";
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

    const sanitizedData = mapJobForm(formData);

    const job = await createJob({
      ...sanitizedData,
      userId,
      employerId,
    });

    return { success: true, data: job, message: "Created successfully" };
  } catch (error) {
    return { success: false, data: null, message: "Creation failed" };
  }
}
