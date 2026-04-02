import { Employer as PrismaEmployer } from "@prisma/client";

export interface Employer extends PrismaEmployer {
  perks: { name: string }[];
}
