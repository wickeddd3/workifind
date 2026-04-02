"use server";

import prisma from "@/shared/lib/prisma";
import { Applicant } from "@prisma/client";

export async function searchProfessionals(searchParams: {
  query: string;
  size?: number;
  page?: number;
}): Promise<Applicant[]> {
  try {
    // Destructure query parameters
    const { query = "", size = 10, page = 1 } = searchParams;
    // Calculate the number of rows to skip
    const rowsToSkip = (page - 1) * size;
    // Parse size to integer
    const take = size ? size : 10;
    // Fetch professionals from the database
    const professionals = await prisma.applicant.findMany({
      orderBy: { createdAt: "desc" },
      where: {
        profession: {
          contains: query,
          mode: "insensitive",
        },
      },
      take, // limit,
      skip: rowsToSkip, // offset,
    });

    return professionals;
  } catch (error) {
    return [];
  }
}

export async function searchProfessionalsCount(searchParams: {
  query: string;
}): Promise<number> {
  try {
    // Destructure query parameters
    const { query = "" } = searchParams;
    // Count the number of professionals that match the search criteria
    const professionalsCount = await prisma.applicant.count({
      where: {
        profession: {
          contains: query,
          mode: "insensitive",
        },
      },
    });

    return professionalsCount;
  } catch (error) {
    return 0;
  }
}
