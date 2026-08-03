import { cache } from "react";

import prisma from "@/shared/lib/prisma";

import { LISTABLE_JOB } from "../model/listable";
import type { Job } from "../model/types";

export const getJob = cache(async (id: string): Promise<Job | null> => {
  try {
    const job = await prisma.job.findUnique({
      where: { id },
      include: {
        employer: true,
      },
    });

    return job;
  } catch (error) {
    return null;
  }
});

/**
 * One of the employer's own posts, by id.
 *
 * Scoped to the owner, so the pages behind `/employer/jobs/[id]` cannot be read
 * by pasting someone else's id into the URL. `getJob` above answers "show me
 * this job" for the public pages, where every listing is fair game; this one
 * answers "show me my job", which is a different question and needs the userId
 * to answer it.
 */
export const getEmployerJob = cache(
  async (userId: string, id: string): Promise<Job | null> => {
    try {
      return await prisma.job.findFirst({
        where: { id, userId },
        include: {
          employer: true,
        },
      });
    } catch (error) {
      return null;
    }
  },
);

// Deduped per request: `/jobs/[slug]` resolves the same slug in both
// `generateMetadata` and the page body, which would otherwise be two queries.
export const getJobBySlug = cache(async (slug: string): Promise<Job | null> => {
  try {
    const job = await prisma.job.findUnique({
      where: { slug },
      include: {
        employer: true,
      },
    });

    return job;
  } catch (error) {
    return null;
  }
});

/**
 * A job the public is allowed to land on. Anything else is either awaiting
 * moderation or no longer accepting applicants, so it should neither be
 * prerendered nor advertised to crawlers.
 *
 * Defined in `model/listable` so the search service shares it rather than
 * keeping a second, looser copy.
 */
const LISTABLE = LISTABLE_JOB;

/**
 * Newest listable jobs, for the home page.
 *
 * Returns an empty list rather than throwing: the home page is prerendered, and
 * a database blip should cost the section, not the whole route.
 */
export async function getLatestJobs(limit: number): Promise<Job[]> {
  try {
    return await prisma.job.findMany({
      where: LISTABLE,
      orderBy: { createdAt: "desc" },
      include: { employer: true },
      take: limit,
    });
  } catch (error) {
    return [];
  }
}

/**
 * One company's open roles, for its public profile at `/companies/[slug]`.
 *
 * Filtered through `LISTABLE` like every other public listing, so a closed or
 * unmoderated post never surfaces here — the same condition the company card's
 * open-role count is derived from, which keeps the count and this list in step.
 */
export async function getCompanyJobs(
  employerId: string,
  limit: number,
): Promise<Job[]> {
  try {
    return await prisma.job.findMany({
      where: { ...LISTABLE, employerId },
      orderBy: { createdAt: "desc" },
      include: { employer: true },
      take: limit,
    });
  } catch (error) {
    return [];
  }
}

/**
 * Newest listable job slugs, for prerendering `/jobs/[slug]` at build time.
 *
 * Returns an empty list if the database is unreachable, which lets the build
 * fall back to rendering every job on first request.
 */
export async function getRecentJobSlugs(limit: number): Promise<string[]> {
  try {
    const jobs = await prisma.job.findMany({
      where: LISTABLE,
      select: { slug: true },
      orderBy: { createdAt: "desc" },
      take: limit,
    });

    return jobs.map(({ slug }) => slug);
  } catch (error) {
    return [];
  }
}

/** Every listable job slug with its last-modified date, for the sitemap. */
export async function getAllJobSlugs(): Promise<
  { slug: string; updatedAt: Date }[]
> {
  try {
    return await prisma.job.findMany({
      where: LISTABLE,
      select: { slug: true, updatedAt: true },
    });
  } catch (error) {
    return [];
  }
}
