"use server";

import prisma from "@/shared/lib/prisma";
import { Applicant } from "@prisma/client";

export async function getProfessionalsSuggestion(
  size: number,
): Promise<Applicant[]> {
  try {
    const professionals = await prisma.applicant.findMany({
      orderBy: { createdAt: "desc" },
      take: size,
    });

    return professionals;
  } catch (error) {
    return [];
  }
}
