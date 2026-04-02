import { Applicant } from "@prisma/client";
import { getSuggestedProfessionals } from "../api/actions";

export async function getInitialSuggestedProfessionals(
  initialNumber?: number,
): Promise<Applicant[]> {
  try {
    const professionals = await getSuggestedProfessionals(initialNumber || 8);

    return professionals;
  } catch (error) {
    return [];
  }
}
