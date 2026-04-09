"use server";

import prisma from "@/shared/lib/prisma";
import { parseJsonField } from "@/shared/utils/parse-json";
import type { Employer } from "../model/types";

export async function getEmployer(userId: string): Promise<Employer | null> {
  try {
    const employer = await prisma.employer.findUnique({
      where: { userId },
    });

    if (!employer) return null;

    return {
      ...employer,
      perks: parseJsonField(employer.perks),
    };
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

    if (!employer) return null;

    return {
      ...employer,
      perks: parseJsonField(employer.perks),
    };
  } catch (error) {
    return null;
  }
}
