import type { Company } from "@/entities/employer";
import db from "@/shared/lib/prisma";

export async function getSuggestedCompanies(size: number): Promise<Company[]> {
  try {
    const companies = await db.employer.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        _count: {
          select: { jobs: true },
        },
      },
      take: size,
    });

    return companies.map((company) => ({
      ...company,
      jobsCount: company._count.jobs,
    }));
  } catch (error) {
    return [];
  }
}
