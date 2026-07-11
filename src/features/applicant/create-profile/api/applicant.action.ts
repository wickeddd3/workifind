"use server";

import type { Applicant } from "@prisma/client";

import { getAuthUser } from "@/shared/lib/clerk.server";

import { mapApplicantForm } from "../model/map-applicant-data";
import {
  ApplicantProfileSchema,
  type ApplicantProfileSchemaType,
} from "../model/schema";
import { createApplicant } from "./applicant.service";
import { assignApplicantRole } from "./role.service";

export async function createApplicantAction(
  formData: ApplicantProfileSchemaType,
): Promise<{ success: boolean; data: Applicant | null; message: string }> {
  try {
    // No role guard here: the APPLICANT role is assigned below, after the
    // profile is created. Only require authentication.
    const { userId } = await getAuthUser();
    if (!userId) throw new Error("Unauthorized");

    // Never trust client input: re-validate against the schema server-side.
    const parsed = ApplicantProfileSchema.safeParse(formData);
    if (!parsed.success) throw new Error("Invalid input");

    const sanitizedData = mapApplicantForm(parsed.data);
    const applicant = await createApplicant({
      ...sanitizedData,
      userId,
    });

    // Clerk user role assignment
    await assignApplicantRole(userId);

    return { success: true, data: applicant, message: "Created successfully" };
  } catch (error) {
    return { success: false, data: null, message: "Creation failed" };
  }
}
