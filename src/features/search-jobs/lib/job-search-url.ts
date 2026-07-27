/**
 * URL assembly for the jobs search.
 *
 * The filter form, the results list, the active-filter chips and the pagination
 * all need to rebuild `/jobs?…` while preserving whatever the user already had
 * applied. They were each doing it by hand, which is how `sort` could reach the
 * results but get dropped by the pager.
 */

export const JOB_SEARCH_KEYS = [
  "q",
  "employmentType",
  "salary",
  "locationType",
  "sort",
  "job",
  "page",
] as const;

export type JobSearchKey = (typeof JOB_SEARCH_KEYS)[number];

export type JobSearchParams = Partial<Record<JobSearchKey, string>>;

/**
 * Build a jobs URL from the current params plus a set of changes. Passing
 * `undefined` or `""` for a key drops it, which is what the filter chips use to
 * remove themselves.
 */
export function buildJobsUrl(
  current: JobSearchParams,
  changes: JobSearchParams = {},
): string {
  const next = { ...current, ...changes };
  const params = new URLSearchParams();

  for (const key of JOB_SEARCH_KEYS) {
    const value = next[key]?.toString().trim();
    if (value) params.set(key, value);
  }

  const queryString = params.toString();
  return queryString ? `/jobs?${queryString}` : "/jobs";
}

/**
 * Changing what is being searched has to reset the pager — staying on page 4 of
 * a result set that just shrank to one page is how a filter change appears to
 * return nothing.
 */
export function buildJobsFilterUrl(
  current: JobSearchParams,
  changes: JobSearchParams = {},
): string {
  return buildJobsUrl(current, { ...changes, page: undefined });
}
