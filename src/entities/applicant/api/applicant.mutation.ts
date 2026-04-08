"use server";

import prisma from "@/shared/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import type { ApplicantProfileSchemaType } from "../model/schema";
import { baseUrl } from "@/shared/config/base-url";

export async function createApplicant(formData: ApplicantProfileSchemaType) {
  try {
    const { userId } = auth();

    if (!userId) {
      throw Error(
        "Error occurred, only authenticated user can create applicant profile",
      );
    }

    //Prepare Form Data
    const form = {
      ...formData,
      skills: formData.skills?.map((skill) => JSON.stringify(skill)) || [],
      languages:
        formData.languages?.map((language) => JSON.stringify(language)) || [],
      preferredLocations:
        formData.preferredLocations?.map((preferredLocation) =>
          JSON.stringify(preferredLocation),
        ) || [],
      preferredLocationTypes: formData.preferredLocationTypes || [],
      preferredEmploymentTypes: formData.preferredEmploymentTypes || [],
      salaryExpectation: parseInt(
        formData?.salaryExpectation?.toString() || "0",
      ),
    };

    // Create applicant profile
    const applicant = await prisma.applicant.create({
      data: {
        ...form,
        userId,
      },
    });

    // Add auth user role
    await fetch(`${baseUrl}/api/auth/role`, {
      method: "POST",
      body: JSON.stringify({ role: "APPLICANT" }),
    });

    return applicant;
  } catch (error) {
    return null;
  }
}

export async function updateApplicant(
  id: number,
  formData: ApplicantProfileSchemaType,
) {
  try {
    //Prepare Form Data
    const form = {
      ...formData,
      skills: formData.skills?.map((skill) => JSON.stringify(skill)),
      languages: formData.languages?.map((language) =>
        JSON.stringify(language),
      ),
      preferredLocations: formData.preferredLocations?.map(
        (preferredLocation) => JSON.stringify(preferredLocation),
      ),
      salaryExpectation: parseInt(
        formData?.salaryExpectation?.toString() || "0",
      ),
    };

    const applicant = await prisma.applicant.update({
      where: { id },
      data: {
        ...form,
      },
    });

    return applicant;
  } catch (error) {
    return null;
  }
}
