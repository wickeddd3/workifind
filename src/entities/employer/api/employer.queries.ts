import { cache } from "react";

import prisma from "@/shared/lib/prisma";
import { parseJsonField } from "@/shared/utils/parse-json";

import type { Company, Employer } from "../model/types";

export const getEmployer = cache(
  async (userId: string): Promise<Employer | null> => {
    try {
      const employer = await prisma.employer.findUnique({
        where: { userId },
      });

      if (!employer) return null;

      return {
        ...employer,
        perks: parseJsonField(employer.perks),
      };
    } catch (error) {
      return null;
    }
  },
);

// Deduped per request: `/companies/[slug]` resolves the same slug in both
// `generateMetadata` and the page body.
export const getEmployerBySlug = cache(
  async (slug: string): Promise<Employer | null> => {
    try {
      const employer = await prisma.employer.findUnique({
        where: { slug },
      });

      if (!employer) return null;

      return {
        ...employer,
        perks: parseJsonField(employer.perks),
      };
    } catch (error) {
      return null;
    }
  },
);

/** Newest companies with their open-job counts, for the companies carousel. */
export async function getSuggestedCompanies(limit: number): Promise<Company[]> {
  try {
    const companies = await prisma.employer.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        _count: {
          select: { jobs: true },
        },
      },
      take: limit,
    });

    return companies.map((company) => ({
      ...company,
      jobsCount: company._count.jobs,
    }));
  } catch (error) {
    return [];
  }
}

/**
 * Newest company slugs, for prerendering `/companies/[slug]` at build time.
 *
 * Returns an empty list if the database is unreachable, which lets the build
 * fall back to rendering every company on first request.
 */
export async function getRecentEmployerSlugs(limit: number): Promise<string[]> {
  try {
    const employers = await prisma.employer.findMany({
      select: { slug: true },
      orderBy: { createdAt: "desc" },
      take: limit,
    });

    return employers.map(({ slug }) => slug);
  } catch (error) {
    return [];
  }
}

/** Every company slug with its last-modified date, for the sitemap. */
export async function getAllEmployerSlugs(): Promise<
  { slug: string; updatedAt: Date }[]
> {
  try {
    return await prisma.employer.findMany({
      select: { slug: true, updatedAt: true },
    });
  } catch (error) {
    return [];
  }
}
