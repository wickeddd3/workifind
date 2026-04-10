"use server";

import { getAuthUser } from "@/shared/lib/clerk.server";
import type { ApplicantProfileSchemaType } from "../model/schema";
import { mapApplicantForm } from "../model/map-applicant-data";
import { updateApplicant } from "./applicant.service";
import type { Applicant } from "@prisma/client";

export async function updateApplicantAction(
  id: number,
  formData: ApplicantProfileSchemaType,
): Promise<{ success: boolean; data: Applicant | null; message: string }> {
  try {
    const { userId } = await getAuthUser();
    if (!userId) throw new Error("Unauthorized");

    const sanitizedData = mapApplicantForm(formData);
    const applicant = await updateApplicant(id, sanitizedData);

    return { success: true, data: applicant, message: "Update successfully" };
  } catch (error) {
    return { success: false, data: null, message: "Update failed" };
  }
}
