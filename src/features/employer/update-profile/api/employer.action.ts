"use server";

import { getAuthUser } from "@/shared/lib/clerk.server";
import type { EmployerProfileSchemaType } from "../model/schema";
import type { Employer } from "@prisma/client";
import { mapEmployerForm } from "../model/map-employer-data";
import { updateEmployer } from "./employer.service";
import { assignEmployerRole } from "./role.service";
import { uploadEmployerLogo } from "./logo.service";

export async function updateEmployerAction(
  id: number,
  formData: EmployerProfileSchemaType,
): Promise<{ success: boolean; data: Employer | null; message: string }> {
  try {
    const { userId } = await getAuthUser();
    if (!userId) throw new Error("Unauthorized");

    const sanitizedData = mapEmployerForm(formData);

    // Upload company logo and generate companyLogoUrl
    let companyLogoUrl = null;
    if (formData.companyLogo) {
      const imageUrl = await uploadEmployerLogo(formData.companyLogo);
      companyLogoUrl = imageUrl; // Get the uploaded file URL
    }

    const employer = await updateEmployer(id, {
      ...sanitizedData,
      userId,
      companyLogoUrl,
    });

    // Clerk user role assignment
    await assignEmployerRole(userId);

    return { success: true, data: employer, message: "Updated successfully" };
  } catch (error) {
    return { success: false, data: null, message: "Update failed" };
  }
}
