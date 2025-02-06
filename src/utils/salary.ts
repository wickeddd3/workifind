import { formatMoney } from "@/utils/format-money";
import { Job } from "@prisma/client";

export const hasJobSalary = (job: Job) => {
  const { minSalary, maxSalary } = job;
  if (!minSalary && !maxSalary) {
    return false;
  }
  return true;
};

export const getJobSalary = (job: Job) => {
  const { minSalary, maxSalary } = job;
  if (minSalary === maxSalary) {
    return formatMoney(minSalary);
  }
  if (!minSalary || !maxSalary) {
    return formatMoney(maxSalary);
  }
  return `${formatMoney(minSalary)} - ${formatMoney(maxSalary)}`;
};
