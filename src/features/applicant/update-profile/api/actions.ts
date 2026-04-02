"use server";

import prisma from "@/shared/lib/prisma";

export async function updateApplicant(
  id: string,
  formData: Partial<{
    name: string;
    email: string;
    phone: string;
    skills: string[];
    languages: string[];
    preferredLocations: string[];
    salaryExpectation: number;
  }>,
) {
  try {
    const applicant = await prisma.applicant.update({
      where: { id: parseInt(id) },
      data: {
        ...formData,
      },
    });

    return applicant;
  } catch (error) {
    return null;
  }
}
