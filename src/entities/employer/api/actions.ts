"use server";

import prisma from "@/shared/lib/prisma";
import { Employer } from "@prisma/client";

export async function getEmployer(id: string): Promise<Employer | null> {
  try {
    const userId = id;

    const employer = await prisma.employer.findUnique({
      where: { userId },
    });

    return employer;
  } catch (error) {
    return null;
  }
}

export async function getEmployerBySlug(
  slug: string,
): Promise<Employer | null> {
  try {
    const employer = await prisma.employer.findUnique({
      where: { slug },
    });

    return employer;
  } catch (error) {
    return null;
  }
}
