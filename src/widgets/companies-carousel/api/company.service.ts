import db from "@/shared/lib/prisma";
import type { Company } from "@/entities/employer";

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
