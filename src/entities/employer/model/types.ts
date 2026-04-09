import type { Employer as PrismaEmployer } from "@prisma/client";

export interface Employer extends PrismaEmployer {
  perks: { name: string }[];
}

export interface Company extends PrismaEmployer {
  jobsCount: number;
}
