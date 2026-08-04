import type { Prisma } from "@prisma/client";

import db from "@/shared/lib/prisma";

/**
 * The facets the directory filters on. One type for the list query and the
 * count query so the two cannot take different sets — a count that disagrees
 * with the page it labels is worse than either being wrong alone.
 */
export interface ProfessionalFilters {
  /** Matched against profession and name, not just profession. */
  query: string;
  location: string;
  /** A preferred employment type, e.g. "Full-time". */
  employmentType: string;
  /** A preferred work arrangement, e.g. "Remote". */
  locationType: string;
  availability: string;
  /** "With experience" / "No experience", as stored. */
  experienced: string;
}

/** The orderings the results header offers. Anything else falls back to date. */
export type ProfessionalSort = "newest" | "availability" | "name";

/**
 * Strips the LIKE wildcards from free text before it reaches a `contains`.
 *
 * Typing "%" would otherwise match every row: Prisma interpolates `contains`
 * straight into LIKE with no way to pass an ESCAPE clause. Removing the
 * characters rather than escaping them is the only option that path allows, and
 * neither "%" nor "_" belongs in a place or job title.
 */
export function normalizeText(value: string) {
  return value.replace(/[\\%_]/g, "").trim();
}

/**
 * Availability is a set of labels rather than a number, so "soonest first"
 * cannot be an ORDER BY on the column — "12+ weeks" sorts before "Now"
 * alphabetically. Ordering by the notice period would need a rank column;
 * until then this sorts by the string and recency breaks the ties, which at
 * least groups equal availability together.
 */
function orderBy(
  sort: ProfessionalSort,
): Prisma.ApplicantOrderByWithRelationInput[] {
  if (sort === "name") {
    return [{ firstName: "asc" }, { lastName: "asc" }, { createdAt: "desc" }];
  }
  if (sort === "availability") {
    return [{ availability: "asc" }, { createdAt: "desc" }];
  }
  return [{ createdAt: "desc" }];
}

function buildWhere({
  query,
  location,
  employmentType,
  locationType,
  availability,
  experienced,
}: ProfessionalFilters): Prisma.ApplicantWhereInput {
  const text = normalizeText(query);

  return {
    AND: [
      // Free text spans the profession and both name parts: someone searching
      // the directory is as likely to be looking up a person they have already
      // heard of as to be browsing a discipline.
      text
        ? {
            OR: [
              { profession: { contains: text, mode: "insensitive" } },
              { firstName: { contains: text, mode: "insensitive" } },
              { lastName: { contains: text, mode: "insensitive" } },
              { about: { contains: text, mode: "insensitive" } },
            ],
          }
        : {},
      location
        ? {
            OR: [
              {
                location: {
                  contains: normalizeText(location),
                  mode: "insensitive",
                },
              },
              // A candidate open to working somewhere counts as being findable
              // there, which is the whole point of stating a preferred location.
              {
                preferredLocations: {
                  some: {
                    name: {
                      contains: normalizeText(location),
                      mode: "insensitive",
                    },
                  },
                },
              },
            ],
          }
        : {},
      // Array columns: `has` is a containment test, not equality.
      employmentType
        ? { preferredEmploymentTypes: { has: employmentType } }
        : {},
      locationType ? { preferredLocationTypes: { has: locationType } } : {},
      availability ? { availability } : {},
      experienced ? { experienced } : {},
    ],
  };
}

/**
 * What a result card renders, and nothing more.
 *
 * Selected narrowly on purpose rather than returning the row: `email`,
 * `phoneNumber` and `resumeUrl` have no place on a directory card, and a
 * `select` is the only version of that rule a later edit cannot quietly undo by
 * adding a field to the card.
 */
const summarySelect = {
  id: true,
  firstName: true,
  lastName: true,
  location: true,
  profession: true,
  experienced: true,
  availability: true,
  salaryExpectation: true,
  preferredEmploymentTypes: true,
  preferredLocationTypes: true,
  createdAt: true,
  userId: true,
  skills: { orderBy: { position: "asc" }, take: 4, select: { name: true } },
  _count: { select: { experiences: true } },
} satisfies Prisma.ApplicantSelect;

export type ProfessionalSummaryRow = Prisma.ApplicantGetPayload<{
  select: typeof summarySelect;
}>;

export async function searchProfessionals(
  filters: ProfessionalFilters & {
    take: number;
    skip: number;
    sort: ProfessionalSort;
  },
): Promise<ProfessionalSummaryRow[]> {
  try {
    return await db.applicant.findMany({
      where: buildWhere(filters),
      orderBy: orderBy(filters.sort),
      select: summarySelect,
      take: filters.take,
      skip: filters.skip,
    });
  } catch (error) {
    return [];
  }
}

export async function searchProfessionalsCount(
  filters: ProfessionalFilters,
): Promise<number> {
  try {
    return await db.applicant.count({ where: buildWhere(filters) });
  } catch (error) {
    return 0;
  }
}
