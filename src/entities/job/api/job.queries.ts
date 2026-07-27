import { cache } from "react";

import prisma from "@/shared/lib/prisma";

import type { Job } from "../model/types";

export const getJob = cache(async (id: number): Promise<Job | null> => {
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
