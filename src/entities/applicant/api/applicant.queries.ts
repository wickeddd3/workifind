import type { Prisma } from "@prisma/client";
import { cache } from "react";

import prisma from "@/shared/lib/prisma";
import { parseJsonField } from "@/shared/utils/parse-json";

import type { Applicant, ApplicantProfile } from "../model/types";

/**
 * The CV records, ordered the way a CV reads: ongoing first, then most recent.
 *
 * Ordering here rather than in the components means the profile page, the
 * public page and the editor all show the same sequence — and the editor's
 * field arrays start from it, so saving a section does not silently reshuffle
 * what the owner was looking at.
 */
const profileInclude = {
  experiences: {
    orderBy: [{ current: "desc" }, { startDate: "desc" }, { id: "asc" }],
  },
  // `nulls: "last"` where the date is optional: Postgres sorts NULLS FIRST on a
  // descending column, which would float an undated entry above a dated one and
  // make the least informative record the first thing read.
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
} satisfies Prisma.ApplicantInclude;

/** The three Json columns hold arrays of stringified `{ name }` objects. */
function withParsedLists<
  T extends {
    skills: Prisma.JsonValue;
    languages: Prisma.JsonValue;
    preferredLocations: Prisma.JsonValue;
  },
>(applicant: T) {
  return {
    ...applicant,
    skills: parseJsonField(applicant.skills),
    languages: parseJsonField(applicant.languages),
    preferredLocations: parseJsonField(applicant.preferredLocations),
  };
}

export const getApplicant = cache(
  async (userId: string): Promise<Applicant | null> => {
    try {
      const applicant = await prisma.applicant.findUnique({
        where: { userId },
      });

      if (!applicant) return null;

      return withParsedLists(applicant);
    } catch (error) {
      return null;
    }
  },
);

/**
 * An applicant with their CV records, for the pages that render a whole
 * profile.
 *
 * Separate from `getApplicant` because the job flows call that one on every job
 * page and need none of these rows — see the note on `ApplicantProfile`.
 */
export const getApplicantProfile = cache(
  async (userId: string): Promise<ApplicantProfile | null> => {
    try {
      const applicant = await prisma.applicant.findUnique({
        where: { userId },
        include: profileInclude,
      });

      if (!applicant) return null;

      return withParsedLists(applicant);
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
    const applicants = await prisma.applicant.findMany({
      orderBy: { createdAt: "desc" },
      take: limit,
    });

    return applicants.map(withParsedLists);
  } catch (error) {
    return [];
  }
}

/** Backs the public professional page, which renders the whole profile. */
export const getApplicantById = cache(
  async (id: string): Promise<ApplicantProfile | null> => {
    try {
      const applicant = await prisma.applicant.findUnique({
        where: { id },
        include: profileInclude,
      });

      if (!applicant) return null;

      return withParsedLists(applicant);
    } catch (error) {
      return null;
    }
  },
);
