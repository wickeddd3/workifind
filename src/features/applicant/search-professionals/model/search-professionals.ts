import { Applicant } from "@prisma/client";
import { searchProfessionals, searchProfessionalsCount } from "../api/actions";

export async function searchProfessionalsProfile(searchParams: {
  query: string;
  size: number;
  page: number;
}): Promise<Applicant[]> {
  try {
    const professionals = await searchProfessionals(searchParams);

    return professionals;
  } catch (error) {
    return [];
  }
}

export async function searchProfessionalsProfileCount(searchParams: {
  query: string;
}): Promise<number> {
  try {
    const professionalsCount = await searchProfessionalsCount(searchParams);

    return professionalsCount;
  } catch (error) {
    return 0;
  }
}
