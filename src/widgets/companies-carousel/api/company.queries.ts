"use server";

import type { Company } from "@/entities/employer";
import { getSuggestedCompanies } from "./company.service";

export async function getSuggestedCompaniesQuery(queryParams: {
  size: number;
}): Promise<{ success: boolean; data: Company[] | null; message: string }> {
  try {
    const { size } = queryParams;
    const results = await getSuggestedCompanies(size);

    return { success: true, data: results, message: "Queried successfully" };
  } catch (error) {
    return { success: false, data: [], message: "Query failed" };
  }
}
