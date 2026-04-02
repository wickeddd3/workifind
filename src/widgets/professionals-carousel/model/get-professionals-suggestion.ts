import { Applicant } from "@prisma/client";
import { getProfessionalsSuggestion } from "../api/actions";

export async function getProfessionalsSuggestionInitial(
  initialNumber?: number,
): Promise<Applicant[]> {
  try {
    const professionals = await getProfessionalsSuggestion(initialNumber || 8);

    return professionals;
  } catch (error) {
    return [];
  }
}
