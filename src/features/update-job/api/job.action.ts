"use server";

import type { Job } from "@prisma/client";
import { revalidatePath, revalidateTag } from "next/cache";

import { JOBS_SEARCH_TAG } from "@/features/search-jobs";
import { requireRole } from "@/shared/lib/clerk.server";

import { mapJobForm } from "../model/map-job-data";
import { JobSchema, type JobSchemaType } from "../model/schema";
import { updateJob } from "./job.service";

export async function updateJobAction(
  id: string,
  formData: JobSchemaType,
): Promise<{ success: boolean; data: Job | null; message: string }> {
  try {
    const { userId } = await requireRole("EMPLOYER");

    // Never trust client input: re-validate against the schema server-side.
    const parsed = JobSchema.safeParse(formData);
    if (!parsed.success) throw new Error("Invalid input");

    const sanitizedData = mapJobForm(parsed.data);

    const job = await updateJob(userId, id, sanitizedData);

    // /jobs/[slug] is prerendered, so an edit would otherwise not surface until
    // the hourly revalidation window elapsed.
    if (job) revalidatePath(`/jobs/${job.slug}`);
    revalidatePath("/jobs");
    revalidatePath("/employer/jobs");
    // An edit can close a job or move it out of a facet, changing the count the
    // results header shows. That cache is keyed by tag, not by path.
    revalidateTag(JOBS_SEARCH_TAG);

    return { success: true, data: job, message: "Updated successfully" };
  } catch (error) {
    return { success: false, data: null, message: "Update failed" };
  }
}
