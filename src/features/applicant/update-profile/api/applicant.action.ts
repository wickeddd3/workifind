"use server";

import type { Applicant } from "@prisma/client";

import { requireRole } from "@/shared/lib/clerk.server";

import { mapApplicantForm } from "../model/map-applicant-data";
import {
  ApplicantProfileSchema,
  type ApplicantProfileSchemaType,
} from "../model/schema";
import { updateApplicant } from "./applicant.service";

export async function updateApplicantAction(
  id: number,
  formData: ApplicantProfileSchemaType,
): Promise<{ success: boolean; data: Applicant | null; message: string }> {
  try {
    const { userId } = await requireRole("APPLICANT");

    // Never trust client input: re-validate against the schema server-side.
    const parsed = ApplicantProfileSchema.safeParse(formData);
    if (!parsed.success) throw new Error("Invalid input");

    const sanitizedData = mapApplicantForm(parsed.data);
    // The write is scoped by userId; `id` is ignored for authorization.
    const applicant = await updateApplicant(userId, sanitizedData);

    return { success: true, data: applicant, message: "Update successfully" };
  } catch (error) {
    return { success: false, data: null, message: "Update failed" };
  }
}
