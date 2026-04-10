"use server";

import prisma from "@/shared/lib/prisma";
import type { Job } from "@prisma/client";
import type { JobSchemaType } from "../model/schema";
import { toSlug } from "@/shared/utils/format-text";
import { nanoid } from "nanoid";

export async function updateJob(
  userId: string,
  jobId: number,
  formData: JobSchemaType,
): Promise<Job | null> {
  try {
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
    const job = await prisma.job.update({
      where: { userId, id: jobId },
      data: {
        ...form,
      },
    });

    return job;
  } catch (error) {
    return null;
  }
}

export async function deleteJob(
  userId: string,
  jobId: number,
): Promise<Job | null> {
  try {
    const job = await prisma.job.delete({
      where: { userId, id: jobId },
    });

    return job;
  } catch (error) {
    return null;
  }
}
