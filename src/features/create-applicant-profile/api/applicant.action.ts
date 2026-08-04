"use server";

import type { Applicant } from "@prisma/client";

import { resolveAvatarUpload } from "@/entities/applicant";
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

    // The picture is already in storage; what arrives here is a signed
    // reference to it, and an unverifiable one is refused rather than ignored —
    // saving the rest and quietly dropping the avatar would report success over
    // a profile that is not what was filled in.
    const { avatarToken } = parsed.data;
    const avatarUrl = avatarToken
      ? resolveAvatarUpload(avatarToken, userId)
      : null;
    if (avatarToken && !avatarUrl) throw new Error("Invalid avatar upload");

    const applicant = await createApplicant({
      ...sanitizedData,
      avatarUrl,
      userId,
    });
    // The service turns a failed write into `null` rather than throwing, so
    // without this the caller was told the profile was created, redirected to
    // it, and found nothing there. It also has to come before the role is
    // assigned: an APPLICANT with no applicant row cannot reach setup again.
    if (!applicant) throw new Error("Create failed");

    // Clerk user role assignment
    await assignApplicantRole(userId);

    return { success: true, data: applicant, message: "Created successfully" };
  } catch (error) {
    return { success: false, data: null, message: "Creation failed" };
  }
}
