import { getApplicant, getApplicantById } from "../api/actions";
import { parseJsonField } from "@/shared/utils/parse-json";
import { Applicant } from "./types";

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
