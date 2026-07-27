import type { Employer, Prisma } from "@prisma/client";

import db from "@/shared/lib/prisma";

export async function updateEmployer(
  userId: string,
  data: Prisma.EmployerUpdateInput,
): Promise<Employer | null> {
  try {
    // Scope the write to the authenticated user's own record (userId is
    // @unique) so a client-supplied id can never target another profile.
    return await db.employer.update({
      where: { userId },
      data,
    });
  } catch (error) {
    return null;
  }
}
