import {
  type ProfessionalFilters,
  type ProfessionalSort,
  type ProfessionalSummaryRow,
  searchProfessionals,
  searchProfessionalsCount,
} from "./professional.service";

export async function searchProfessionalsQuery(
  queryParams: ProfessionalFilters & {
    size: number;
    page: number;
    sort: ProfessionalSort;
  },
): Promise<{
  success: boolean;
  data: ProfessionalSummaryRow[] | null;
  message: string;
}> {
  try {
    const { size, page, sort, ...filters } = queryParams;

    const results = await searchProfessionals({
      ...filters,
      take: size,
      skip: (page - 1) * size,
      sort,
    });

    return { success: true, data: results, message: "Queried successfully" };
  } catch (error) {
    return { success: false, data: [], message: "Query failed" };
  }
}

export async function searchProfessionalsCountQuery(
  queryParams: ProfessionalFilters,
): Promise<{ success: boolean; data: number | null; message: string }> {
  try {
    const results = await searchProfessionalsCount(queryParams);

    return { success: true, data: results, message: "Queried successfully" };
  } catch (error) {
    return { success: false, data: 0, message: "Query failed" };
  }
}
