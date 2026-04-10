import type { Applicant as PrismaApplicant } from "@prisma/client";

export interface Applicant extends PrismaApplicant {
  skills: { name: string }[];
  languages: { name: string }[];
  preferredLocations: { name: string }[];
}
