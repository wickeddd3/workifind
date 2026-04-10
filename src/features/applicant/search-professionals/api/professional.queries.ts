"use server";

import type { Applicant } from "@prisma/client";
import {
  searchProfessionals,
  searchProfessionalsCount,
} from "./professional.service";

export async function searchProfessionalsQuery(queryParams: {
  query: string;
  size?: number;
  page?: number;
}): Promise<{ success: boolean; data: Applicant[] | null; message: string }> {
  try {
    // Destructure query parameters
    const { query = "", size = 10, page = 1 } = queryParams;
    // Calculate the number of rows to skip
    const rowsToSkip = (page - 1) * size;
    // Parse size to integer
    const take = size ? size : 10;

    const results = await searchProfessionals(query, take, rowsToSkip);

    return { success: true, data: results, message: "Queried successfully" };
  } catch (error) {
    return { success: false, data: [], message: "Query failed" };
  }
}

export async function searchProfessionalsCountQuery(queryParams: {
  query: string;
}): Promise<{ success: boolean; data: number | null; message: string }> {
  try {
    // Destructure query parameters
    const { query = "" } = queryParams;

    const results = await searchProfessionalsCount(query);

    return { success: true, data: results, message: "Queried successfully" };
  } catch (error) {
    return { success: false, data: 0, message: "Query failed" };
  }
}
