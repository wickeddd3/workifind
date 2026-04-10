"use server";

import type { Applicant } from "@prisma/client";
import { getSuggestedProfessionals } from "./professional.service";

export async function getSuggestedProfessionalsQuery(queryParams: {
  size: number;
}): Promise<{ success: boolean; data: Applicant[] | null; message: string }> {
  try {
    const { size } = queryParams;
    const results = await getSuggestedProfessionals(size);

    return { success: true, data: results, message: "Queried successfully" };
  } catch (error) {
    return { success: false, data: [], message: "Query failed" };
  }
}
