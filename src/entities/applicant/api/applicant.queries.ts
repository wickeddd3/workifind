import type { Prisma } from "@prisma/client";
import { cache } from "react";

import prisma from "@/shared/lib/prisma";

import type { Applicant, ApplicantProfile } from "../model/types";

/**
 * Everything an applicant lists, ordered the way a profile reads.
 *
 * Ordering here rather than in the components means the profile page, the
 * public page and the editor all show the same sequence — and the editor's
 * field arrays start from it, so saving a section does not silently reshuffle
 * what the owner was looking at.
 *
 * `nulls: "last"` wherever the date is optional: Postgres sorts NULLS FIRST on
 * a descending column, which would float an undated entry above a dated one and
 * make the least informative record the first thing read.
 */
const profileInclude = {
  experiences: {
    orderBy: [{ current: "desc" }, { startDate: "desc" }, { id: "asc" }],
  },
  educations: {
    orderBy: [
      { current: "desc" },
      { startDate: { sort: "desc", nulls: "last" } },
      { id: "asc" },
    ],
  },
  // No `current` here — a certificate is earned on a date rather than held over
  // a span.
  certifications: {
    orderBy: [{ issueDate: { sort: "desc", nulls: "last" } }, { id: "asc" }],
  },
  // These three keep the order the owner arranged, held in `position`. Ranking
  // skills by level would put the self-assessment ahead of that ordering, which
  // is itself a statement about what they lead with. `createdAt` cannot stand
  // in for it: a section save writes every row in one statement, so they all
  // share a timestamp and the order falls through to a random uuid.
  skills: { orderBy: { position: "asc" } },
  languages: { orderBy: { position: "asc" } },
  preferredLocations: { orderBy: { position: "asc" } },
} satisfies Prisma.ApplicantInclude;

export const getApplicant = cache(
  async (userId: string): Promise<Applicant | null> => {
    try {
      return await prisma.applicant.findUnique({ where: { userId } });
    } catch (error) {
      return null;
    }
  },
);

/**
 * An applicant with everything they list, for the pages that render a whole
 * profile.
 *
 * Separate from `getApplicant` because the job flows call that one on every job
 * page and need none of these rows — see the note on `ApplicantProfile`.
 */
export const getApplicantProfile = cache(
  async (userId: string): Promise<ApplicantProfile | null> => {
    try {
      return await prisma.applicant.findUnique({
        where: { userId },
        include: profileInclude,
      });
    } catch (error) {
      return null;
    }
  },
);

/** Newest applicant profiles, for the professionals carousel. */
export async function getSuggestedApplicants(
  limit: number,
): Promise<Applicant[]> {
  try {
    return await prisma.applicant.findMany({
      orderBy: { createdAt: "desc" },
      take: limit,
    });
  } catch (error) {
    return [];
  }
}

/** Backs the public professional page, which renders the whole profile. */
export const getApplicantById = cache(
  async (id: string): Promise<ApplicantProfile | null> => {
    try {
      return await prisma.applicant.findUnique({
        where: { id },
        include: profileInclude,
      });
    } catch (error) {
      return null;
    }
  },
);
