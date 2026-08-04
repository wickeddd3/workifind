/**
 * URL assembly for the professionals directory.
 *
 * Mirrors `job-search-url.ts` deliberately. The filter bar, the results list,
 * the active-filter chips, the sort control and the pager all rebuild
 * `/professionals/search?…`, and each doing it by hand is how a facet reaches
 * the results but gets dropped by the pager.
 */

export const PROFESSIONAL_SEARCH_KEYS = [
  "q",
  "location",
  "employmentType",
  "locationType",
  "availability",
  "experienced",
  "sort",
  "professional",
  "page",
] as const;

export type ProfessionalSearchKey = (typeof PROFESSIONAL_SEARCH_KEYS)[number];

export type ProfessionalSearchParams = Partial<
  Record<ProfessionalSearchKey, string>
>;

/**
 * The keys that change *which* professionals come back, as opposed to which one
 * is previewed. The results boundary keys on these — including `professional`
 * would tear the list down and re-run its skeleton on every card click.
 */
export const PROFESSIONAL_FILTER_KEYS = PROFESSIONAL_SEARCH_KEYS.filter(
  (key) => key !== "professional",
);

export function buildProfessionalsUrl(
  current: ProfessionalSearchParams,
  changes: ProfessionalSearchParams = {},
): string {
  const next = { ...current, ...changes };
  const params = new URLSearchParams();

  for (const key of PROFESSIONAL_SEARCH_KEYS) {
    const value = next[key]?.toString().trim();
    if (value) params.set(key, value);
  }

  const queryString = params.toString();
  return queryString
    ? `/professionals/search?${queryString}`
    : "/professionals/search";
}

/**
 * Changing what is being searched has to reset the pager — staying on page 4 of
 * a result set that just shrank to one page is how a filter change appears to
 * return nothing.
 */
export function buildProfessionalsFilterUrl(
  current: ProfessionalSearchParams,
  changes: ProfessionalSearchParams = {},
): string {
  return buildProfessionalsUrl(current, { ...changes, page: undefined });
}
