import type { Applicant } from "@prisma/client";

import db from "@/shared/lib/prisma";

export async function getSuggestedProfessionals(
  size: number,
): Promise<Applicant[]> {
  try {
    return await db.applicant.findMany({
      orderBy: { createdAt: "desc" },
      take: size,
    });
  } catch (error) {
    return [];
  }
}
