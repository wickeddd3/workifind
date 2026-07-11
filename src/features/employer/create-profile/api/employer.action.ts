"use server";

import type { Employer } from "@prisma/client";

import { getAuthUser } from "@/shared/lib/clerk.server";

import { mapEmployerForm } from "../model/map-employer-data";
import {
  EmployerProfileSchema,
  type EmployerProfileSchemaType,
} from "../model/schema";
import { createEmployer } from "./employer.service";
import { uploadEmployerLogo } from "./logo.service";
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

    // Upload company logo and generate companyLogoUrl
    let companyLogoUrl = null;
    if (parsed.data.companyLogo) {
      const imageUrl = await uploadEmployerLogo(parsed.data.companyLogo);
      companyLogoUrl = imageUrl; // Get the uploaded file URL
    }

    const employer = await createEmployer({
      ...sanitizedData,
      userId,
      companyLogoUrl,
    });

    // Clerk user role assignment
    await assignEmployerRole(userId);

    return { success: true, data: employer, message: "Created successfully" };
  } catch (error) {
    return { success: false, data: null, message: "Creation failed" };
  }
}
