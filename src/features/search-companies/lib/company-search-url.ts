/**
 * URL assembly for the companies directory.
 *
 * Mirrors `job-search-url.ts`: the filter bar, the results list, the chips, the
 * sort control and the pager all rebuild `/companies/search?…`, and each doing
 * it by hand is how a facet reaches the results but gets dropped by the pager.
 */

export const COMPANY_SEARCH_KEYS = [
  "q",
  "location",
  "industry",
  "hiring",
  "sort",
  "company",
  "page",
] as const;

export type CompanySearchKey = (typeof COMPANY_SEARCH_KEYS)[number];

export type CompanySearchParams = Partial<Record<CompanySearchKey, string>>;

/**
 * The keys that change *which* companies come back, as opposed to which one is
 * previewed. The results boundary keys on these — including `company` would
 * tear the list down and re-run its skeleton on every card click.
 */
export const COMPANY_FILTER_KEYS = COMPANY_SEARCH_KEYS.filter(
  (key) => key !== "company",
);

export function buildCompaniesUrl(
  current: CompanySearchParams,
  changes: CompanySearchParams = {},
): string {
  const next = { ...current, ...changes };
  const params = new URLSearchParams();

  for (const key of COMPANY_SEARCH_KEYS) {
    const value = next[key]?.toString().trim();
    if (value) params.set(key, value);
  }

  const queryString = params.toString();
  return queryString ? `/companies/search?${queryString}` : "/companies/search";
}

/**
 * Changing what is being searched has to reset the pager — staying on page 4 of
 * a result set that just shrank to one page is how a filter change appears to
 * return nothing.
 */
export function buildCompaniesFilterUrl(
  current: CompanySearchParams,
  changes: CompanySearchParams = {},
): string {
  return buildCompaniesUrl(current, { ...changes, page: undefined });
}
