import { cache } from "react";

import prisma from "@/shared/lib/prisma";
import { parseJsonField } from "@/shared/utils/parse-json";

import type { Applicant } from "../model/types";

export const getApplicant = cache(
  async (userId: string): Promise<Applicant | null> => {
    try {
      const applicant = await prisma.applicant.findUnique({
        where: { userId },
      });

      if (!applicant) return null;

      return {
        ...applicant,
        skills: parseJsonField(applicant.skills),
        languages: parseJsonField(applicant.languages),
        preferredLocations: parseJsonField(applicant.preferredLocations),
      };
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

    return applicants.map((applicant) => ({
      ...applicant,
      skills: parseJsonField(applicant.skills),
      languages: parseJsonField(applicant.languages),
      preferredLocations: parseJsonField(applicant.preferredLocations),
    }));
  } catch (error) {
    return [];
  }
}

export const getApplicantById = cache(
  async (id: number): Promise<Applicant | null> => {
    try {
      const applicant = await prisma.applicant.findUnique({
        where: { id },
      });

      if (!applicant) return null;

      return {
        ...applicant,
        skills: parseJsonField(applicant.skills),
        languages: parseJsonField(applicant.languages),
        preferredLocations: parseJsonField(applicant.preferredLocations),
      };
    } catch (error) {
      return null;
    }
  },
);
