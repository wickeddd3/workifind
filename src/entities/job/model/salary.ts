import { formatMoney, formatMoneyCompact } from "@/shared/utils/format-money";

export const hasJobSalary = (minSalary: number, maxSalary: number) => {
  if (!minSalary && !maxSalary) {
    return false;
  }
  return true;
};

/**
 * Either bound may be 0 to mean "unspecified", so a band collapses to a single
 * figure when only one end is stated or both ends match. Falling back to
 * `maxSalary` alone rendered an open-ended "from $50,000" job as "$0".
 *
 * `format` picks the density: "full" for the job detail, "compact" for list
 * cards, where a spelled-out range crowds out the title.
 */
function buildSalary(
  minSalary: number,
  maxSalary: number,
  format: (amount: number) => string,
) {
  if (minSalary === maxSalary) {
    return format(minSalary);
  }
  if (!minSalary || !maxSalary) {
    return format(maxSalary || minSalary);
  }
  // En dash, not a hyphen: this is a numeric range, not a compound word.
  return `${format(minSalary)} – ${format(maxSalary)}`;
}

export const getJobSalary = (minSalary: number, maxSalary: number) =>
  buildSalary(minSalary, maxSalary, formatMoney);

export const getJobSalaryCompact = (minSalary: number, maxSalary: number) =>
  buildSalary(minSalary, maxSalary, formatMoneyCompact);
