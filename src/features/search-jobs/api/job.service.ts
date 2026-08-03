import { Prisma } from "@prisma/client";

import { type Job, LISTABLE_JOB } from "@/entities/job";
import db from "@/shared/lib/prisma";

/**
 * The raw-SQL half of the listable filter, interpolated from the same constant
 * the query-builder path uses so the two cannot drift — which is precisely how
 * closed jobs stayed searchable while being excluded from the sitemap.
 */
const LISTABLE_SQL = Prisma.sql`j."approved" = ${LISTABLE_JOB.approved} AND j."closed" = ${LISTABLE_JOB.closed}`;

interface JobFilters {
  query: string;
  employmentType: string;
  salary: string;
  locationType: string;
  /** Free text matched against the job's stated place, e.g. "Chicago". */
  location: string;
  /** An employer's industry — the taxonomy lives on the company, not the job. */
  industry: string;
}

/**
 * Strips the LIKE wildcards from a place before it reaches either query path.
 *
 * Typing "%" would otherwise match every row: the raw path can escape it, but
 * Prisma's `contains` interpolates straight into LIKE with no way to pass an
 * ESCAPE clause, so the query-builder path could not. Removing the characters
 * rather than escaping them is what keeps the two paths agreeing, and neither
 * "%" nor "_" belongs in a place name.
 */
export function normalizeLocation(value: string) {
  return value.replace(/[\\%_]/g, "").trim();
}

function likeContains(value: string) {
  return `%${value}%`;
}

/** The orderings the results header offers. Anything else falls back to date. */
export type JobSort = "newest" | "salary";

/**
 * Sorting by pay uses the top of the band, then recency as the tie-breaker —
 * without it, the many jobs sharing a band would come back in an arbitrary
 * order that shifts between pages.
 */
function orderBy(sort: JobSort): Prisma.JobOrderByWithRelationInput[] {
  return sort === "salary"
    ? [{ maxSalary: "desc" }, { createdAt: "desc" }]
    : [{ createdAt: "desc" }];
}

/**
 * Qualified with `j`, because the raw path joins employers and both tables
 * carry a `createdAt` — unqualified, Postgres rejects the ORDER BY as
 * ambiguous.
 */
function orderBySql(sort: JobSort): Prisma.Sql {
  return sort === "salary"
    ? Prisma.sql`ORDER BY j."maxSalary" DESC, j."createdAt" DESC`
    : Prisma.sql`ORDER BY j."createdAt" DESC`;
}

/**
 * Salary bands are stored as a min/max pair where either end may be 0 to mean
 * "unspecified", so a match is any row whose stated bounds don't exclude the
 * requested figure.
 */
function salaryCondition(salary: number): Prisma.Sql {
  return Prisma.sql`(
    (j."minSalary" <= ${salary} AND j."maxSalary" >= ${salary})
    OR (j."minSalary" = 0 AND j."maxSalary" >= ${salary})
    OR (j."minSalary" <= ${salary} AND j."maxSalary" = 0)
  )`;
}

/**
 * Shared WHERE clause for the raw search path, so the result query and the
 * count query can never drift apart.
 *
 * `plainto_tsquery` rather than `to_tsquery`: it accepts arbitrary user input
 * and ANDs the terms, matching the previous behavior. `to_tsquery` raises a
 * syntax error on input like "c++" or "a & & b", which the old code swallowed
 * as an empty result set.
 */
function buildWhere({
  query,
  employmentType,
  salary,
  locationType,
  location,
  industry,
}: JobFilters): Prisma.Sql {
  // Every column here is qualified with `j`, because the industry filter joins
  // employers and `location` would otherwise be ambiguous — both tables have
  // one.
  const conditions: Prisma.Sql[] = [LISTABLE_SQL];

  if (query) {
    conditions.push(
      Prisma.sql`j."searchVector" @@ plainto_tsquery('english', ${query})`,
    );
  }
  if (employmentType) {
    conditions.push(Prisma.sql`j."employmentType" = ${employmentType}`);
  }
  if (locationType) {
    conditions.push(Prisma.sql`j."locationType" = ${locationType}`);
  }
  if (location) {
    conditions.push(Prisma.sql`j."location" ILIKE ${likeContains(location)}`);
  }
  if (industry) {
    conditions.push(Prisma.sql`e."industry" = ${industry}`);
  }

  const salaryInt = parseInt(salary || "");
  if (salaryInt) conditions.push(salaryCondition(salaryInt));

  return Prisma.join(conditions, " AND ");
}

/**
 * Build the equivalent filter for the query-builder path, used when there is no
 * text search and the whole thing can stay in Prisma.
 */
function buildWhereInput({
  employmentType,
  salary,
  locationType,
  location,
  industry,
}: Omit<JobFilters, "query">): Prisma.JobWhereInput {
  const salaryInt = parseInt(salary || "");

  const salaryFilter: Prisma.JobWhereInput = salaryInt
    ? {
        OR: [
          { minSalary: { lte: salaryInt }, maxSalary: { gte: salaryInt } },
          { minSalary: 0, maxSalary: { gte: salaryInt } },
          { minSalary: { lte: salaryInt }, maxSalary: 0 },
        ],
      }
    : {};

  return {
    AND: [
      salaryFilter,
      employmentType ? { employmentType } : {},
      locationType ? { locationType } : {},
      // `contains` is a substring match so "Chicago" finds "Chicago, IL", and
      // insensitive so the casing a poster used does not matter.
      location ? { location: { contains: location, mode: "insensitive" } } : {},
      // Industry is the employer's, not the job's — there is no such column on
      // a posting, so this filters through the relation.
      industry ? { employer: { industry } } : {},
      LISTABLE_JOB,
    ],
  };
}

export async function searchJobs(
  queryParams: JobFilters & { take: number; skip: number; sort: JobSort },
): Promise<Job[]> {
  try {
    const {
      query,
      employmentType,
      salary,
      locationType,
      location,
      industry,
      take,
      skip,
      sort,
    } = queryParams;

    // No text search — stay in the query builder. This is the common case
    // (browsing and filtering), it is already served by the
    // jobs_approved_createdAt index, and it avoids the extra round trip the
    // search path needs.
    if (!query) {
      return await db.job.findMany({
        where: buildWhereInput({
          employmentType,
          salary,
          locationType,
          location,
          industry,
        }),
        orderBy: orderBy(sort),
        include: { employer: true },
        take,
        skip,
      });
    }

    // Text search has to be raw: `searchVector` is a tsvector, which Prisma's
    // query builder cannot express. Match IDs first, then hydrate through
    // Prisma so the returned shape and its types stay authoritative.
    //
    // The employers join is unconditional even though only the industry filter
    // reads it. `employerId` is a required FK, so an inner join cannot drop a
    // row, and one query shape is easier to reason about than two.
    const matches = await db.$queryRaw<{ id: string }[]>`
      SELECT j."id"
      FROM "jobs" j
      JOIN "employers" e ON e."id" = j."employerId"
      WHERE ${buildWhere(queryParams)}
      ${orderBySql(sort)}
      LIMIT ${take} OFFSET ${skip}
    `;

    if (matches.length === 0) return [];

    // The hydration query has to repeat the ordering — an `IN` lookup makes no
    // promise about row order, so sorting only in the ID query would let the
    // page come back shuffled.
    return await db.job.findMany({
      where: { id: { in: matches.map((m) => m.id) } },
      orderBy: orderBy(sort),
      include: { employer: true },
    });
  } catch (error) {
    return [];
  }
}

export async function searchJobsCount(
  queryParams: JobFilters,
): Promise<number> {
  try {
    const { query, employmentType, salary, locationType, location, industry } =
      queryParams;

    if (!query) {
      return await db.job.count({
        where: buildWhereInput({
          employmentType,
          salary,
          locationType,
          location,
          industry,
        }),
      });
    }

    // ::int keeps this out of BigInt, which JSON cannot serialize. The join
    // mirrors searchJobs — `buildWhere` qualifies its columns with `j` and
    // references `e`, so the two queries must share a shape or the count would
    // disagree with the page it labels.
    const [result] = await db.$queryRaw<{ count: number }[]>`
      SELECT COUNT(*)::int AS count
      FROM "jobs" j
      JOIN "employers" e ON e."id" = j."employerId"
      WHERE ${buildWhere(queryParams)}
    `;

    return result?.count ?? 0;
  } catch (error) {
    return 0;
  }
}
