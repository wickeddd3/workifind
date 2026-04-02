import { searchCompanies, searchCompaniesCount } from "../api/actions";
import { Company } from "@/entities/employer";

export async function searchCompaniesProfile(searchParams: {
  query: string;
  size: number;
  page: number;
}): Promise<Company[]> {
  try {
    const companies = await searchCompanies(searchParams);

    return companies;
  } catch (error) {
    return [];
  }
}

export async function searchCompaniesProfileCount(searchParams: {
  query: string;
}): Promise<number> {
  try {
    const companiesCount = await searchCompaniesCount(searchParams);

    return companiesCount;
  } catch (error) {
    return 0;
  }
}
