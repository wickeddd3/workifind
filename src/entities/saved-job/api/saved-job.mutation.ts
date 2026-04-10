"use server";

import prisma from "@/shared/lib/prisma";
import type { SavedJob } from "@prisma/client";

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
