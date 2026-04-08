"use server";

import prisma from "@/shared/lib/prisma";
import type { Company } from "./../model/types";
import { redirect } from "next/navigation";

export async function formSearchCompanies(formData: FormData) {
  const values = Object.fromEntries(formData.entries());
  const q = values.q as string;
  const searchParams = new URLSearchParams({ ...(q && { q: q.trim() }) });

  redirect(`/companies/search?${searchParams.toString()}`);
}

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
