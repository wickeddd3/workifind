import { cache } from "react";

import prisma from "@/shared/lib/prisma";
import { parseJsonField } from "@/shared/utils/parse-json";

import type { Employer } from "../model/types";

export const getEmployer = cache(
  async (userId: string): Promise<Employer | null> => {
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
  },
);

// Deduped per request: `/companies/[slug]` resolves the same slug in both
// `generateMetadata` and the page body.
export const getEmployerBySlug = cache(
  async (slug: string): Promise<Employer | null> => {
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
  },
);
