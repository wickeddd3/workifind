import { getApplicant, getApplicantById } from "../api/actions";
import { Prisma } from "@prisma/client";
import { Applicant } from "./types";

function parseJsonField(fields: Prisma.JsonValue): { name: string }[] {
  if (!Array.isArray(fields)) return [];
  return fields.map((item: Prisma.JsonValue) => {
    if (typeof item === "string") {
      return JSON.parse(item);
    }
    return item;
  });
}

export async function getApplicantProfile(
  userId: string,
): Promise<Applicant | null> {
  const applicant = await getApplicant(userId);

  if (!applicant) return null;

  return {
    ...applicant,
    skills: parseJsonField(applicant.skills),
    languages: parseJsonField(applicant.languages),
    preferredLocations: parseJsonField(applicant.preferredLocations),
  };
}

export async function getApplicantProfileById(
  id: number,
): Promise<Applicant | null> {
  const applicant = await getApplicantById(id);

  if (!applicant) return null;

  return {
    ...applicant,
    skills: parseJsonField(applicant.skills),
    languages: parseJsonField(applicant.languages),
    preferredLocations: parseJsonField(applicant.preferredLocations),
  };
}
