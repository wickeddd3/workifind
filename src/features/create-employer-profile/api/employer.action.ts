"use server";

import type { Employer } from "@prisma/client";

import { resolveLogoUpload } from "@/entities/employer";
import { getAuthUser } from "@/shared/lib/clerk.server";

import { mapEmployerForm } from "../model/map-employer-data";
import {
  EmployerProfileSchema,
  type EmployerProfileSchemaType,
} from "../model/schema";
import { createEmployer } from "./employer.service";
import { assignEmployerRole } from "./role.service";

export async function createEmployerAction(
  formData: EmployerProfileSchemaType,
): Promise<{ success: boolean; data: Employer | null; message: string }> {
  try {
    // No role guard here: the EMPLOYER role is assigned below, after the
    // profile is created. Only require authentication.
    const { userId } = await getAuthUser();
    if (!userId) throw new Error("Unauthorized");

    // Never trust client input: re-validate against the schema server-side.
    const parsed = EmployerProfileSchema.safeParse(formData);
    if (!parsed.success) throw new Error("Invalid input");

    const sanitizedData = mapEmployerForm(parsed.data);

    // The logo is already in storage; what arrives here is a signed reference
    // to it, and an unverifiable one is refused rather than ignored — saving
    // the rest and quietly dropping the logo would report success over a
    // profile that is not what was filled in.
    const { logoToken } = parsed.data;
    const companyLogoUrl = logoToken
      ? resolveLogoUpload(logoToken, userId)
      : null;
    if (logoToken && !companyLogoUrl) throw new Error("Invalid logo upload");

    const employer = await createEmployer({
      ...sanitizedData,
      userId,
      companyLogoUrl,
    });
    // The service turns a failed write into `null` rather than throwing, so
    // without this the caller was told the profile was created, redirected to
    // it, and found nothing there. It also has to come before the role is
    // assigned: an EMPLOYER with no employer row cannot reach setup again.
    if (!employer) throw new Error("Create failed");

    // Clerk user role assignment
    await assignEmployerRole(userId);

    return { success: true, data: employer, message: "Created successfully" };
  } catch (error) {
    return { success: false, data: null, message: "Creation failed" };
  }
}
