"use server";

import prisma from "@/shared/lib/prisma";
import { revalidatePath } from "next/cache";
import type { SavedJob } from "@prisma/client";

export async function toggleSaveJob(
  userId: string,
  applicantId: number,
  jobId: number,
  isCurrentlySaved: boolean,
): Promise<boolean> {
  try {
    if (isCurrentlySaved) {
      await prisma.savedJob.deleteMany({ where: { userId, jobId } });
    } else {
      await prisma.savedJob.create({ data: { userId, applicantId, jobId } });
    }

    revalidatePath(`/jobs/${jobId}`);
    return true;
  } catch (error) {
    return false;
  }
}

export async function unsaveJob(id: number): Promise<SavedJob | null> {
  try {
    const unsavedJob = await prisma.savedJob.delete({
      where: {
        id,
      },
    });

    return unsavedJob;
  } catch (error) {
    return null;
  }
}
