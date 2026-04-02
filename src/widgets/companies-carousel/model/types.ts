import { Employer } from "@prisma/client";

export interface Company extends Employer {
  jobsCount: number;
}
