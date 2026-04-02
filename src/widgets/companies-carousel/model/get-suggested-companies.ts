import { getSuggestedCompanies } from "../api/actions";
import { Company } from "./types";

export async function getInitialSuggestedCompanies(
  initialNumber?: number,
): Promise<Company[]> {
  try {
    const companies = await getSuggestedCompanies(initialNumber || 8);

    return companies;
  } catch (error) {
    return [];
  }
}
