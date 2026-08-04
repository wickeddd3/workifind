import type { Prisma } from "@prisma/client";

import type { Company } from "@/entities/employer";
import { LISTABLE_JOB } from "@/entities/job";
import db from "@/shared/lib/prisma";

/**
 * The facets the directory filters on. One type for the list query and the
 * count query so the two cannot take different sets — a count that disagrees
 * with the page it labels is worse than either being wrong alone.
 */
export interface CompanyFilters {
  query: string;
  location: string;
  industry: string;
  /** "1" narrows to employers with at least one listable job. */
  hiring: string;
}

/** The orderings the results header offers. Anything else falls back to date. */
export type CompanySort = "newest" | "jobs" | "name";

/**
 * Strips the LIKE wildcards from free text before it reaches a `contains`.
 * See the note on the professionals service — Prisma gives `contains` no
 * ESCAPE clause, so removing the characters is the only option this path has.
 */
export function normalizeText(value: string) {
  return value.replace(/[\\%_]/g, "").trim();
}

/**
 * Only jobs that are actually listable count towards "hiring" and towards the
 * badge on a card. Interpolated from the same constant the job search uses, so
 * a company cannot advertise a count made up of closed roles.
 */
const listableJobs = { where: LISTABLE_JOB } satisfies Prisma.Employer$jobsArgs;

function buildWhere({
  query,
  location,
  industry,
  hiring,
}: CompanyFilters): Prisma.EmployerWhereInput {
  const text = normalizeText(query);
  const place = normalizeText(location);

  return {
    AND: [
      // Name and the pitch both: someone searching "fintech" is describing what
      // a company does, which is rarely in its name.
      text
        ? {
            OR: [
              { companyName: { contains: text, mode: "insensitive" } },
              { about: { contains: text, mode: "insensitive" } },
              { pitch: { contains: text, mode: "insensitive" } },
            ],
          }
        : {},
      place ? { location: { contains: place, mode: "insensitive" } } : {},
      industry ? { industry } : {},
      hiring === "1" ? { jobs: { some: LISTABLE_JOB } } : {},
    ],
  };
}

/**
 * Sorting by open roles cannot be an `orderBy` — it counts a filtered relation,
 * which Prisma's query builder will not order on. The rows are fetched and
 * ranked in memory instead, which is sound only because it happens after the
 * page has been narrowed: `take`/`skip` still bound the set. It means a
 * "most roles" page is ordered within itself rather than globally, which is the
 * trade this makes for not dropping to raw SQL.
 */
function orderBy(sort: CompanySort): Prisma.EmployerOrderByWithRelationInput[] {
  if (sort === "name") return [{ companyName: "asc" }, { createdAt: "desc" }];
  return [{ createdAt: "desc" }];
}

export async function searchCompanies(
  filters: CompanyFilters & {
    take: number;
    skip: number;
    sort: CompanySort;
  },
): Promise<Company[]> {
  try {
    const companies = await db.employer.findMany({
      where: buildWhere(filters),
      orderBy: orderBy(filters.sort),
      include: { _count: { select: { jobs: listableJobs } } },
      take: filters.take,
      skip: filters.skip,
    });

    const withCounts = companies.map((company) => ({
      ...company,
      jobsCount: company._count.jobs,
    }));

    return filters.sort === "jobs"
      ? withCounts.sort((a, b) => b.jobsCount - a.jobsCount)
      : withCounts;
  } catch (error) {
    return [];
  }
}

export async function searchCompaniesCount(
  filters: CompanyFilters,
): Promise<number> {
  try {
    return await db.employer.count({ where: buildWhere(filters) });
  } catch (error) {
    return 0;
  }
}
