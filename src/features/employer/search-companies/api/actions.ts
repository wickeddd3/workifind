"use server";

import prisma from "@/shared/lib/prisma";
import { Company } from "@/entities/employer";

export async function searchCompanies(searchParams: {
  query: string;
  size?: number;
  page?: number;
}): Promise<Company[]> {
  try {
    // Destructure query parameters
    const { query = "", size = 10, page = 1 } = searchParams;
    // Calculate the number of rows to skip
    const rowsToSkip = (page - 1) * size;
    // Parse size to integer
    const take = size ? size : 10;
    // Fetch companies from the database
    const companies = await prisma.employer.findMany({
      orderBy: { createdAt: "desc" },
      where: {
        companyName: {
          contains: query,
          mode: "insensitive",
        },
      },
      include: {
        _count: {
          select: { jobs: true },
        },
      },
      take, // limit,
      skip: rowsToSkip, // offset,
    });

    return companies.map((company) => ({
      ...company,
      jobsCount: company._count.jobs,
    }));
  } catch (error) {
    return [];
  }
}

export async function searchCompaniesCount(searchParams: {
  query: string;
}): Promise<number> {
  try {
    // Destructure query parameters
    const { query = "" } = searchParams;
    // Count the number of companies that match the search criteria
    const companiesCount = await prisma.employer.count({
      where: {
        companyName: {
          contains: query,
          mode: "insensitive",
        },
      },
    });

    return companiesCount;
  } catch (error) {
    return 0;
  }
}
