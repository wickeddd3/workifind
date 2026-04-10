import db from "@/shared/lib/prisma";
import type { Prisma, Applicant } from "@prisma/client";

export async function updateApplicant(
  id: number,
  data: Prisma.ApplicantUpdateInput,
): Promise<Applicant | null> {
  try {
    return await db.applicant.update({
      where: { id },
      data,
    });
  } catch (error) {
    return null;
  }
}
