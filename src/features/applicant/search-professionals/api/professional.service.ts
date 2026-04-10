import db from "@/shared/lib/prisma";
import type { Applicant } from "@prisma/client";

export async function searchProfessionals(
  query: string,
  take?: number,
  skip?: number,
): Promise<Applicant[]> {
  try {
    return await db.applicant.findMany({
      orderBy: { createdAt: "desc" },
      where: {
        profession: {
          contains: query,
          mode: "insensitive",
        },
      },
      take, // limit,
      skip, // offset,
    });
  } catch (error) {
    return [];
  }
}

export async function searchProfessionalsCount(query: string): Promise<number> {
  try {
    return await db.applicant.count({
      where: {
        profession: {
          contains: query,
          mode: "insensitive",
        },
      },
    });
  } catch (error) {
    return 0;
  }
}
