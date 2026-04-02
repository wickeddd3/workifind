import { parseJsonField } from "@/shared/utils/parse-json";
import { getEmployer, getEmployerBySlug } from "../api/actions";
import { Employer } from "./types";

export async function getEmployerProfile(
  userId: string,
): Promise<Employer | null> {
  const employer = await getEmployer(userId);

  if (!employer) return null;

  return {
    ...employer,
    perks: parseJsonField(employer.perks),
  };
}

export async function getEmployerProfileBySlug(
  slug: string,
): Promise<Employer | null> {
  const employer = await getEmployerBySlug(slug);

  if (!employer) return null;

  return {
    ...employer,
    perks: parseJsonField(employer.perks),
  };
}
