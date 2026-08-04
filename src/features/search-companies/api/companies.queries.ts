import type { Company } from "@/entities/employer";

import {
  type CompanyFilters,
  type CompanySort,
  searchCompanies,
  searchCompaniesCount,
} from "./companies.service";

// No `"use server"` here, unlike the version this replaces. These are read
// queries called from a server component, and the directive does not make them
// safer — it publishes each one as a POST endpoint the browser can invoke with
// arbitrary arguments. The action that belongs in this slice is the one in
// `companies.action.ts`, which redirects.

export async function searchCompaniesQuery(
  queryParams: CompanyFilters & {
    size: number;
    page: number;
    sort: CompanySort;
  },
): Promise<{ success: boolean; data: Company[] | null; message: string }> {
  try {
    const { size, page, sort, ...filters } = queryParams;

    const results = await searchCompanies({
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

export async function searchCompaniesCountQuery(
  queryParams: CompanyFilters,
): Promise<{ success: boolean; data: number | null; message: string }> {
  try {
    const results = await searchCompaniesCount(queryParams);

    return { success: true, data: results, message: "Queried successfully" };
  } catch (error) {
    return { success: false, data: 0, message: "Query failed" };
  }
}
