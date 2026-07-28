/**
 * What it means for a job to be publicly listable.
 *
 * The single source of truth. This existed in two forms before — the entity's
 * sitemap and prerender queries excluded closed jobs, while the search service
 * filtered on `approved` alone — so a closed role stayed searchable and
 * applyable while being absent from the sitemap. Anything that lists, counts,
 * or advertises a job derives its filter from here.
 */
export const LISTABLE_JOB = { approved: true, closed: false } as const;
