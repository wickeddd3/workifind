"use server";

import prisma from "@/shared/lib/prisma";
import { Applicant } from "@prisma/client";

export async function getApplicant(id: string): Promise<Applicant | null> {
  try {
    const userId = id;

    const applicant = await prisma.applicant.findUnique({
      where: { userId },
    });

    return applicant;
  } catch (error) {
    return null;
  }
}

export async function getApplicantById(id: number): Promise<Applicant | null> {
  try {
    const applicant = await prisma.applicant.findUnique({
      where: { id },
    });

    return applicant;
  } catch (error) {
    return null;
  }
}
