import prisma from "@/shared/lib/prisma";
import { parseJsonField } from "@/shared/utils/parse-json";
import type { Applicant } from "../model/types";

export async function getApplicant(userId: string): Promise<Applicant | null> {
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
}

export async function getApplicantById(id: number): Promise<Applicant | null> {
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
}
