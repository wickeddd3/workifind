import db from "@/shared/lib/prisma";
import type { Prisma, Applicant } from "@prisma/client";

export async function updateApplicant(
  userId: string,
  data: Prisma.ApplicantUpdateInput,
): Promise<Applicant | null> {
  try {
    // Scope the write to the authenticated user's own record (userId is
    // @unique) so a client-supplied id can never target another profile.
    return await db.applicant.update({
      where: { userId },
      data,
    });
  } catch (error) {
    return null;
  }
}
