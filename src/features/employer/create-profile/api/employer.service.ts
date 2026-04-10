import db from "@/shared/lib/prisma";
import type { Prisma, Employer } from "@prisma/client";

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
