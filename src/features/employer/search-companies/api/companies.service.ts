import db from "@/shared/lib/prisma";
import type { Company } from "@/entities/employer";

export async function searchCompanies(
  query: string,
  take?: number,
  skip?: number,
): Promise<Company[]> {
  try {
    // Fetch companies from the database
    const companies = await db.employer.findMany({
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
      skip, // offset,
    });

    return companies.map((company) => ({
      ...company,
      jobsCount: company._count.jobs,
    }));
  } catch (error) {
    return [];
  }
}

export async function searchCompaniesCount(query: string): Promise<number> {
  try {
    return await db.employer.count({
      where: {
        companyName: {
          contains: query,
          mode: "insensitive",
        },
      },
    });
  } catch (error) {
    return 0;
  }
}
