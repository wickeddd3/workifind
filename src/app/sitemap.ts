import type { MetadataRoute } from "next";

import { getAllEmployerSlugs } from "@/entities/employer";
import { getAllJobSlugs } from "@/entities/job";
import { SITE_URL } from "@/shared/config/site";

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
  ];

  // Both queries yield an empty list if the database is unreachable at build
  // time, so the sitemap degrades to the static routes above.
  const [jobs, companies] = await Promise.all([
    getAllJobSlugs(),
    getAllEmployerSlugs(),
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
}
