"use server";

import prisma from "@/shared/lib/prisma";
import { Applicant } from "@prisma/client";

export async function getApplicant(id: string): Promise<Applicant | null> {
  try {
    const userId = id;

    const applicant = await prisma.applicant.findUnique({
      where: { userId },
      include: {
        savedJobs: true,
      },
    });

    return applicant;
  } catch (error) {
    return null;
  }
}
