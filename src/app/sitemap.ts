import type { MetadataRoute } from "next";

import { SITE_URL } from "@/shared/config/site";
import prisma from "@/shared/lib/prisma";

// Rebuild the sitemap hourly so newly posted jobs are discoverable quickly.
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: now, changeFrequency: "daily", priority: 1 },
    {
      url: `${SITE_URL}/jobs`,
      lastModified: now,
      changeFrequency: "hourly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/companies`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/professionals`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.6,
    },
  ];

  try {
    const [jobs, companies] = await Promise.all([
      prisma.job.findMany({ select: { slug: true, updatedAt: true } }),
      prisma.employer.findMany({ select: { slug: true, updatedAt: true } }),
    ]);

    const jobRoutes: MetadataRoute.Sitemap = jobs.map((job) => ({
      url: `${SITE_URL}/jobs/${job.slug}`,
      lastModified: job.updatedAt,
      changeFrequency: "weekly",
      priority: 0.8,
    }));

    // Company pages are indexed; candidate profiles are intentionally excluded.
    const companyRoutes: MetadataRoute.Sitemap = companies.map((company) => ({
      url: `${SITE_URL}/companies/${company.slug}`,
      lastModified: company.updatedAt,
      changeFrequency: "weekly",
      priority: 0.7,
    }));

    return [...staticRoutes, ...jobRoutes, ...companyRoutes];
  } catch {
    // If the database is unreachable at build time, still emit static routes.
    return staticRoutes;
  }
}
