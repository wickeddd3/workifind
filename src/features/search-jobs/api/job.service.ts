import { Prisma } from "@prisma/client";

import type { Job } from "@/entities/job";
import db from "@/shared/lib/prisma";

interface JobFilters {
  query: string;
  employmentType: string;
  salary: string;
  locationType: string;
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

function orderBySql(sort: JobSort): Prisma.Sql {
  return sort === "salary"
    ? Prisma.sql`ORDER BY "maxSalary" DESC, "createdAt" DESC`
    : Prisma.sql`ORDER BY "createdAt" DESC`;
}

/**
 * Salary bands are stored as a min/max pair where either end may be 0 to mean
 * "unspecified", so a match is any row whose stated bounds don't exclude the
 * requested figure.
 */
function salaryCondition(salary: number): Prisma.Sql {
  return Prisma.sql`(
    ("minSalary" <= ${salary} AND "maxSalary" >= ${salary})
    OR ("minSalary" = 0 AND "maxSalary" >= ${salary})
    OR ("minSalary" <= ${salary} AND "maxSalary" = 0)
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
}: JobFilters): Prisma.Sql {
  const conditions: Prisma.Sql[] = [Prisma.sql`"approved" = true`];

  if (query) {
    conditions.push(
      Prisma.sql`"searchVector" @@ plainto_tsquery('english', ${query})`,
    );
  }
  if (employmentType) {
    conditions.push(Prisma.sql`"employmentType" = ${employmentType}`);
  }
  if (locationType) {
    conditions.push(Prisma.sql`"locationType" = ${locationType}`);
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
      { approved: true },
    ],
  };
}

export async function searchJobs(
  queryParams: JobFilters & { take: number; skip: number; sort: JobSort },
): Promise<Job[]> {
  try {
    const { query, employmentType, salary, locationType, take, skip, sort } =
      queryParams;

    // No text search — stay in the query builder. This is the common case
    // (browsing and filtering), it is already served by the
    // jobs_approved_createdAt index, and it avoids the extra round trip the
    // search path needs.
    if (!query) {
      return await db.job.findMany({
        where: buildWhereInput({ employmentType, salary, locationType }),
        orderBy: orderBy(sort),
        include: { employer: true },
        take,
        skip,
      });
    }

    // Text search has to be raw: `searchVector` is a tsvector, which Prisma's
    // query builder cannot express. Match IDs first, then hydrate through
    // Prisma so the returned shape and its types stay authoritative.
    const matches = await db.$queryRaw<{ id: number }[]>`
      SELECT "id" FROM "jobs"
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
    const { query, employmentType, salary, locationType } = queryParams;

    if (!query) {
      return await db.job.count({
        where: buildWhereInput({ employmentType, salary, locationType }),
      });
    }

    // ::int keeps this out of BigInt, which JSON cannot serialize.
    const [result] = await db.$queryRaw<{ count: number }[]>`
      SELECT COUNT(*)::int AS count FROM "jobs"
      WHERE ${buildWhere(queryParams)}
    `;

    return result?.count ?? 0;
  } catch (error) {
    return 0;
  }
}
