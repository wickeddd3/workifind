import { parseJsonField } from "@/shared/utils/parse-json";
import { getEmployer, getEmployerById } from "../api/actions";
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

export async function getEmployerProfileById(
  id: number,
): Promise<Employer | null> {
  const employer = await getEmployerById(id);

  if (!employer) return null;

  return {
    ...employer,
    perks: parseJsonField(employer.perks),
  };
}
