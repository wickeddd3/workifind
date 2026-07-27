"use server";

import type { Employer } from "@prisma/client";

import { requireRole } from "@/shared/lib/clerk.server";

import { mapEmployerForm } from "../model/map-employer-data";
import {
  EmployerProfileSchema,
  type EmployerProfileSchemaType,
} from "../model/schema";
import { updateEmployer } from "./employer.service";
import { uploadEmployerLogo } from "./logo.service";
import { assignEmployerRole } from "./role.service";

export async function updateEmployerAction(
  id: number,
  formData: EmployerProfileSchemaType,
): Promise<{ success: boolean; data: Employer | null; message: string }> {
  try {
    const { userId } = await requireRole("EMPLOYER");

    // Never trust client input: re-validate against the schema server-side.
    const parsed = EmployerProfileSchema.safeParse(formData);
    if (!parsed.success) throw new Error("Invalid input");

    const sanitizedData = mapEmployerForm(parsed.data);

    // Only replace the logo when a new one was uploaded successfully.
    // Omitting the field leaves the existing companyLogoUrl untouched
    // instead of wiping it on every profile update.
    let logoUpdate: { companyLogoUrl?: string } = {};
    if (parsed.data.companyLogo) {
      const imageUrl = await uploadEmployerLogo(parsed.data.companyLogo);
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
