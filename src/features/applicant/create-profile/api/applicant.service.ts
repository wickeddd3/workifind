import db from "@/shared/lib/prisma";
import type { Prisma, Applicant } from "@prisma/client";

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
