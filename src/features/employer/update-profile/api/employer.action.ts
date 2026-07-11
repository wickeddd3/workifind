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

    // Only replace the logo when a new one was uploaded successfully.
    // Omitting the field leaves the existing companyLogoUrl untouched
    // instead of wiping it on every profile update.
    let logoUpdate: { companyLogoUrl?: string } = {};
    if (formData.companyLogo) {
      const imageUrl = await uploadEmployerLogo(formData.companyLogo);
      if (imageUrl) logoUpdate = { companyLogoUrl: imageUrl };
    }

    // The write is scoped by userId; `id` is ignored for authorization.
    const employer = await updateEmployer(userId, {
      ...sanitizedData,
      userId,
      ...logoUpdate,
    });

    // Clerk user role assignment
    await assignEmployerRole(userId);

    return { success: true, data: employer, message: "Updated successfully" };
  } catch (error) {
    return { success: false, data: null, message: "Update failed" };
  }
}
