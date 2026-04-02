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

export async function getEmployerById(id: number): Promise<Employer | null> {
  try {
    const employer = await prisma.employer.findUnique({
      where: { id },
    });

    return employer;
  } catch (error) {
    return null;
  }
}
