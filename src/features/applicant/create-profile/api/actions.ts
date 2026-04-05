"use server";

import prisma from "@/shared/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function createApplicant(formData: {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  location?: string;
  profession: string;
  experienced: string;
  availability: string;
  skills: string[];
  languages: string[];
  preferredLocationTypes: string[];
  preferredEmploymentTypes: string[];
  preferredLocations: string[];
  salaryExpectation: number;
}) {
  try {
    const { userId } = auth();

    if (!userId) {
      throw Error(
        "Error occurred, only authenticated user can create applicant profile",
      );
    }

    const applicant = await prisma.applicant.create({
      data: {
        ...formData,
        userId,
      },
    });

    return applicant;
  } catch (error) {
    return null;
  }
}
