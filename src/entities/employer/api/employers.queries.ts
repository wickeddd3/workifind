import prisma from "@/shared/lib/prisma";
import type { Company } from "./../model/types";

export async function getSuggestedCompanies(size: number): Promise<Company[]> {
  try {
    const companies = await prisma.employer.findMany({
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
