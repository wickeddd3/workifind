import db from "@/shared/lib/prisma";
import type { Prisma, Employer } from "@prisma/client";

export async function updateEmployer(
  id: number,
  data: Prisma.EmployerUpdateInput,
): Promise<Employer | null> {
  try {
    return await db.employer.update({
      where: { id },
      data,
    });
  } catch (error) {
    return null;
  }
}
