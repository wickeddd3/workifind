import { formatMoney } from "@/shared/utils/format-money";

export const hasJobSalary = (minSalary: number, maxSalary: number) => {
  if (!minSalary && !maxSalary) {
    return false;
  }
  return true;
};

export const getJobSalary = (minSalary: number, maxSalary: number) => {
  if (minSalary === maxSalary) {
    return formatMoney(minSalary);
  }
  if (!minSalary || !maxSalary) {
    return formatMoney(maxSalary);
  }
  return `${formatMoney(minSalary)} - ${formatMoney(maxSalary)}`;
};
