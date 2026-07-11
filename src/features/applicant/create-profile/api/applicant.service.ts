import type { Applicant, Prisma } from "@prisma/client";

import db from "@/shared/lib/prisma";

export async function createApplicant(
  data: Prisma.ApplicantCreateInput,
): Promise<Applicant | null> {
  try {
    return await db.applicant.create({
      data,
    });
  } catch (error) {
    return null;
  }
}
