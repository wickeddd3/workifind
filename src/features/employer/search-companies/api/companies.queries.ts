"use server";

import type { Company } from "@/entities/employer";
import { searchCompanies, searchCompaniesCount } from "./companies.service";

export async function searchCompaniesQuery(queryParams: {
  query: string;
  size?: number;
  page?: number;
}): Promise<{ success: boolean; data: Company[] | null; message: string }> {
  try {
    // Destructure query parameters
    const { query = "", size = 10, page = 1 } = queryParams;
    // Calculate the number of rows to skip
    const rowsToSkip = (page - 1) * size;
    // Parse size to integer
    const take = size ? size : 10;

    const results = await searchCompanies(query, take, rowsToSkip);

    return { success: true, data: results, message: "Queried successfully" };
  } catch (error) {
    return { success: false, data: [], message: "Query failed" };
  }
}

export async function searchCompaniesCountQuery(queryParams: {
  query: string;
}): Promise<{ success: boolean; data: number | null; message: string }> {
  try {
    // Destructure query parameters
    const { query = "" } = queryParams;

    const results = await searchCompaniesCount(query);

    return { success: true, data: results, message: "Queried successfully" };
  } catch (error) {
    return { success: false, data: 0, message: "Query failed" };
  }
}
