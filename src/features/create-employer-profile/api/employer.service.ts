import type { Employer, Prisma } from "@prisma/client";

import db from "@/shared/lib/prisma";

export async function createEmployer(
  data: Prisma.EmployerCreateInput,
): Promise<Employer | null> {
  try {
    return await db.employer.create({
      data,
    });
  } catch (error) {
    return null;
  }
}
