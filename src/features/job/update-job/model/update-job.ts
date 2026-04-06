import { getEmployerProfile } from "@/entities/employer";
import type { Job } from "@prisma/client";
import type { JobSchemaType } from "./schema";
import { toSlug } from "@/shared/utils/format-text";
import { nanoid } from "nanoid";
import { updateJob } from "../api/actions";

export async function updateJobPost(
  userId: string,
  jobId: number,
  formData: JobSchemaType,
): Promise<Job | null> {
  try {
    // Fetch auth user employer profile data
    const employer = await getEmployerProfile(userId);

    // Return null if no employerResponseData
    if (!employer) return null;

    // Create slug based on job title
    const slug = `${toSlug(formData.title)}-${nanoid(10)}`;

    // Prepare Form Data
    const form = {
      ...formData,
      slug,
      minSalary: parseInt(formData?.minSalary?.toString() || "0"),
      maxSalary: parseInt(formData?.maxSalary?.toString() || "0"),
    };

    // Update Job post
    const job = await updateJob(userId, jobId, form);

    return job;
  } catch (error) {
    return null;
  }
}
