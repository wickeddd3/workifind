"use server";

import prisma from "@/shared/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function createEmployer(formData: {
  slug: string;
  companyName: string;
  companyEmail?: string;
  companyWebsite?: string;
  industry: string;
  location?: string;
  about?: string;
  pitch?: string;
  perks: string[];
}) {
  try {
    const { userId } = auth();

    if (!userId) {
      throw Error(
        "Error occurred, only authenticated user can create employer profile",
      );
    }

    const employer = await prisma.employer.create({
      data: {
        ...formData,
        userId,
      },
    });

    return employer;
  } catch (error) {
    return null;
  }
}
