"use server";

import { getAuthUser } from "@/shared/lib/clerk.server";
import type { ApplicantProfileSchemaType } from "../model/schema";
import { mapApplicantForm } from "../model/map-applicant-data";
import { createApplicant } from "./applicant.service";
import type { Applicant } from "@prisma/client";

export async function createApplicantAction(
  formData: ApplicantProfileSchemaType,
): Promise<{ success: boolean; data: Applicant | null; message: string }> {
  try {
    const { userId } = await getAuthUser();
    if (!userId) throw new Error("Unauthorized");

    const sanitizedData = mapApplicantForm(formData);
    const applicant = await createApplicant({
      ...sanitizedData,
      userId,
    });

    return { success: true, data: applicant, message: "Created successfully" };
  } catch (error) {
    return { success: true, data: null, message: "Creation failed" };
  }
}
